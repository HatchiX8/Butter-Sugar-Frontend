import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { getMyCourseList } from '@/views/home/myCourse/api';
import type { courseListInfo } from '@/views/home/myCourse/api/type';

export const useMyCourseStore = defineStore('myCourseStore', () => {
  // 狀態
  const myCourses = ref<courseListInfo[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const lastFetched = ref<number | null>(null);

  // 計算屬性：以 ID 為 key 的購買課程映射
  const myCoursesMap = computed(() => {
    const map = new Map<string, courseListInfo>();
    myCourses.value.forEach(course => {
      map.set(course.id.toString(), course);
    });
    return map;
  });

  /**
   * 檢查課程是否已購買
   * @param courseId 課程ID
   * @returns true 已購買, false 未購買
   */
  const isPurchased = (courseId: string): boolean => myCoursesMap.value.has(courseId);

  // 獲取課程資料（如果已購買）
  const getCourseById = (courseId: string | number) => myCoursesMap.value.get(courseId.toString());

  // 載入我的課程列表
  const fetchMyCourses = async () => {
    // 如果在 5 分鐘內已經獲取過資料，不再重新獲取
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000;
    if (lastFetched.value && now - lastFetched.value < fiveMinutes) {
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      const response = await getMyCourseList();
      myCourses.value = response.data.courses;
      lastFetched.value = now;
    } catch (err) {
      error.value = err instanceof Error ? err.message : '獲取我的課程時發生錯誤';
    } finally {
      loading.value = false;
    }
  };

  return {
    myCourses,
    loading,
    error,
    isPurchased,
    fetchMyCourses,
    getCourseById
  };
});
