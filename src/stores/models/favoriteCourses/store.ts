import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { getFavoriteCoursesList, addFavoriteCourse, removeFavoriteCourse } from '@/views/dashboard/courseAction/api';
import type { FavoriteCourseInfo } from '@/views/dashboard/courseAction/api/type';
import { useUserStore } from '@/stores/models/user/store';

// localStorage key 常數
const LOCAL_STORAGE_KEY = 'favoriteCourses';

// 獲取本地儲存的收藏課程
const getLocalFavorites = (): string[] => {
  try {
    const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return localData ? JSON.parse(localData) : [];
  } catch {
    // 讀取失敗時返回空數組
    return [];
  }
};

// 儲存收藏課程到本地
const saveLocalFavorites = (courseIds: string[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(courseIds));
  } catch {
    // 儲存失敗時的處理留空白
  }
};

// 定義收藏課程的 Store
export const useFavoriteCourseStore = defineStore('favoriteCourseStore', () => {
  // 引用用戶 Store 來確認登入狀態
  const userStore = useUserStore();
  
  // 狀態
  const favorites = ref<FavoriteCourseInfo[]>([]);
  const localFavoriteIds = ref<string[]>(getLocalFavorites());
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);

  // Getters
  // 取得所有收藏課程 ID (從 API)
  const favoriteIds = computed(() => favorites.value.map(course => course.course_id));
  
  // 檢查課程是否已收藏 (同時檢查登入狀態與本地儲存)
  const hasFavorite = (courseId: string) => {
    // 如果已登入，則檢查遠端資料
    if (userStore.isLoggedIn) {
      return favoriteIds.value.includes(courseId);
    } 
    // 未登入，檢查本地儲存
    return localFavoriteIds.value.includes(courseId);
  };

  // Actions
  // 獲取收藏課程列表
  const fetchFavorites = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await getFavoriteCoursesList();
      if (response && response.status && Array.isArray(response.data)) {
        favorites.value = response.data;
      } else {
        error.value = 'API 回傳的資料結構不符合預期';
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : '獲取收藏課程列表時發生錯誤';
    } finally {
      isLoading.value = false;
    }
  };

  // 新增課程到收藏列表 - 使用樂觀UI更新
  const addToFavorites = async (courseId: string) => {
    if (hasFavorite(courseId)) return; // 如果已經收藏，則不做任何操作

    error.value = null;
    
    // 判斷是否已登入
    if (userStore.isLoggedIn) {
      // 樂觀UI更新：假設添加會成功
      const tempFavorite: FavoriteCourseInfo = {
        id: `temp-${Date.now()}`, // 臨時ID，等API返回後更新
        course_id: courseId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      // 先將臨時項目加到收藏列表
      favorites.value = [...favorites.value, tempFavorite];
      isLoading.value = true;
      
      try {
        const response = await addFavoriteCourse(courseId);
        if (response && response.status) {
          // API 成功後更新為實際數據
          await fetchFavorites();
        } else {
          // 操作失敗，回滾UI更新
          favorites.value = favorites.value.filter(item => item.id !== tempFavorite.id);
          error.value = '添加收藏失敗';
          throw new Error('添加收藏失敗');
        }
      } catch (err) {
        // 操作失敗，回滾UI更新
        favorites.value = favorites.value.filter(item => item.id !== tempFavorite.id);
        error.value = err instanceof Error ? err.message : '添加收藏時發生錯誤';
        throw err; // 向上傳播錯誤，讓調用者知道操作失敗
      } finally {
        isLoading.value = false;
      }
    } else {
      // 未登入，僅保存到本地
      const updatedLocalFavorites = [...localFavoriteIds.value, courseId];
      localFavoriteIds.value = updatedLocalFavorites;
      saveLocalFavorites(updatedLocalFavorites);
    }
  };

  // 從收藏列表移除課程 - 使用樂觀UI更新
  const removeFromFavorites = async (courseId: string) => {
    if (!hasFavorite(courseId)) return; // 如果未收藏，則不做任何操作

    error.value = null;

    if (userStore.isLoggedIn) {
      // 在已登入狀態下，先查找要移除的收藏項目的ID
      const favoriteItem = favorites.value.find(item => item.course_id === courseId);
      
      if (!favoriteItem) {
        error.value = '找不到對應的收藏項目';
        throw new Error('找不到對應的收藏項目');
        return;
      }
      
      // 樂觀UI更新：先保存當前狀態，以便失敗時回滾
      const originalFavorites = [...favorites.value];
      
      // 先在UI上移除該項目
      favorites.value = favorites.value.filter(item => item.course_id !== courseId);
      isLoading.value = true;
      
      try {
        const response = await removeFavoriteCourse(favoriteItem.id); // 使用收藏項目ID而非課程ID
        if (response && response.status) {
          // API 成功，不需要進行額外操作
        } else {
          // 操作失敗，回滾UI更新
          favorites.value = originalFavorites;
          error.value = '取消收藏失敗';
          throw new Error('取消收藏失敗');
        }
      } catch (err) {
        // 操作失敗，回滾UI更新
        favorites.value = originalFavorites;
        error.value = err instanceof Error ? err.message : '取消收藏時發生錯誤';
        throw err; // 向上傳播錯誤，讓調用者知道操作失敗
      } finally {
        isLoading.value = false;
      }
    } else {
      // 未登入，從本地移除
      const updatedLocalFavorites = localFavoriteIds.value.filter(id => id !== courseId);
      localFavoriteIds.value = updatedLocalFavorites;
      saveLocalFavorites(updatedLocalFavorites);
    }
  };

  // 清空收藏列表
  const clearFavorites = () => {
    favorites.value = [];
    localFavoriteIds.value = [];
    saveLocalFavorites([]);
  };

  // 根據 ID 獲取收藏課程
  const getFavoriteById = (courseId: string) => favorites.value.find(course => course.course_id === courseId) || null;

  // 同步本地收藏和遠端收藏
  const syncLocalWithRemote = async () => {
    if (!userStore.isLoggedIn || localFavoriteIds.value.length === 0) return;
    
    isLoading.value = true;
    error.value = null;
    
    try {
      // 先獲取遠端收藏
      await fetchFavorites();
      
      // 創建批量處理的承諾陣列，以便並行處理
    // 使用絕對值摘要型別，避免使用 any
    const promises: Promise<{ status: boolean; message: string }>[] = [];
      
      // 遍歷本地收藏，添加到遠端
      for (const courseId of localFavoriteIds.value) {
        // 如果遠端沒有此收藏，則添加到待處理列表
        if (!favoriteIds.value.includes(courseId)) {
          promises.push(addFavoriteCourse(courseId));
        }
      }
      
      if (promises.length > 0) {
        // 顯示同步中提示
        if (window.$message) {
          window.$message.info(`正在同步${promises.length}個收藏課程...`);
        }
        
        // 並行處理所有添加請求
        const results = await Promise.allSettled(promises);
        
        // 檢查是否有失敗的請求
        const failedCount = results.filter(result => result.status === 'rejected').length;
        if (window.$message) {
          if (failedCount > 0) {
            window.$message.warning(`有${failedCount}個收藏課程同步失敗，請稍後重試`);
            error.value = `有${failedCount}個收藏課程同步失敗`;
          } else {
            window.$message.success('收藏課程同步完成');
          }
        }
        
        // 同步完成後清空本地收藏
        localFavoriteIds.value = [];
        saveLocalFavorites([]);
        
        // 重新獲取遠端收藏列表
        await fetchFavorites();
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : '同步收藏時發生錯誤';
      if (window.$message) {
        window.$message.error('同步收藏課程失敗，請稍後重試');
      }
    } finally {
      isLoading.value = false;
    }
  };
  
  // 檢查登入狀態變化，登入後同步本地收藏
  if (userStore.isLoggedIn && localFavoriteIds.value.length > 0) {
    // 使用setTimeout延遲執行，確保用戶介面已初始化
    setTimeout(() => {
      syncLocalWithRemote();
    }, 1000);
  }
  
  return {
    // 狀態
    favorites,
    localFavoriteIds,
    isLoading,
    error,

    // Getters
    favoriteIds,
    hasFavorite,

    // Actions
    fetchFavorites,
    addToFavorites,
    removeFromFavorites,
    clearFavorites,
    getFavoriteById,
    syncLocalWithRemote
  };
});
