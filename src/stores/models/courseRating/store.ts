import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import instance from '@/api/axios';

// 評價資料介面
export interface CourseRatingResponse {
  id: string;
  user_id: string;
  user_name?: string; // 添加用戶名稱欄位
  course_id: string;
  rating_score: string;
  review_text: string;
  created_at: string;
}

// 轉換後的評價資料介面，符合 ReviewList 元件需求
export interface Review {
  user: {
    name: string;
    date: string;
  };
  rating: number;
  content: string;
}

export const useCourseRatingStore = defineStore('courseRatingStore', () => {
  // 狀態
  const ratings = ref<CourseRatingResponse[]>([]);
  const currentCourseId = ref<string>('');
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  // 格式化日期
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  // 計算屬性：當前課程的評價列表
  const currentCourseRatings = computed(() =>
    ratings.value.filter(rating => rating.course_id === currentCourseId.value)
  );

  // 計算屬性：轉換為 ReviewList 元件格式的評價列表
  const reviewList = computed<Review[]>(() =>
    currentCourseRatings.value.map(item => ({
      user: {
        name: item.user_name || '匿名用戶', // 使用 user_name 如果存在，否則使用'匿名用戶'
        date: formatDate(item.created_at)
      },
      rating: Number(item.rating_score),
      content: item.review_text
    }))
  );

  // 計算屬性：平均評分
  const averageRating = computed(() => {
    const ratings = currentCourseRatings.value;
    if (ratings.length === 0) return 0;

    const sum = ratings.reduce((acc, curr) => acc + Number(curr.rating_score), 0);
    return Number((sum / ratings.length).toFixed(1));
  });

  // 計算屬性：評價總數
  const totalRatings = computed(() => currentCourseRatings.value.length);

  // 動作：獲取指定課程的評價
  const fetchRatingsByCourseId = async (courseId: string) => {
    loading.value = true;
    error.value = null;
    currentCourseId.value = courseId;

    try {
      // 先檢查是否已有該課程的評價資料
      if (ratings.value.some(rating => rating.course_id === courseId)) {
        // 已有資料，不需重新請求
        loading.value = false;
        return;
      }

      // 請求 API 獲取評價資料
      // API 返回格式為 { status, message, data: CourseRatingResponse[] }
      const res = await instance.get('/api/v1/course/ratings');

      // 將新獲取的評價資料合併到現有資料中
      if (res && res.data && res.data.data) {
        const apiRatings = res.data.data as CourseRatingResponse[];
        const newRatings = apiRatings.filter(rating => !ratings.value.some(r => r.id === rating.id));
        ratings.value = [...ratings.value, ...newRatings];
        console.log('Ratings loaded:', ratings.value.length);
      }
    } catch (err) {
      console.error('Error fetching ratings:', err);
      error.value = err instanceof Error ? err.message : '無法取得課程評價資料';
    } finally {
      loading.value = false;
    }
  };

  // 動作：清空評價資料
  const clearRatings = () => {
    ratings.value = [];
    currentCourseId.value = '';
  };

  return {
    ratings,
    currentCourseId,
    loading,
    error,
    currentCourseRatings,  // 導出這個計算屬性以便調試
    reviewList,
    averageRating,
    totalRatings,
    fetchRatingsByCourseId,
    clearRatings
  };
});
