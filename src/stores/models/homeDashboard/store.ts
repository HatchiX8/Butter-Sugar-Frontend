import { defineStore } from 'pinia';
import { ref} from 'vue';
import { getPopularCourses, getTeacherFeatured } from '@/views/home/homeDashboard/api/index';
import type { ApiResponse, PopularCourse, TeacherFeatured } from '@/views/home/homeDashboard/api/types';
import axios from 'axios';

export const useHomeDashboardStore = defineStore('homeDashboardStore', () => {
  const popularCourses  = ref<PopularCourse[]>([]);
  const highlightedTeachers  = ref<TeacherFeatured[]>([]);
  const error = ref<string | null>(null);

  // 錯誤訊息
  const getErrorMessage = (err: unknown): string => {
    if (axios.isAxiosError(err)) {
      // 優先取後端回傳的 message
      const msg = err.response?.data?.message
      if (typeof msg === 'string') return msg;
    }
    if (typeof err === 'string') return err;
    if (err instanceof Error) return err.message;
    return '發生未知錯誤';
  };

  // 取得熱門課程，只取前 3 筆資料
  const fetchPopularCourse = async () => {
    error.value = null;

    try {
      const res: ApiResponse<PopularCourse[]> = await getPopularCourses();
      popularCourses.value = (res.data ?? []).slice(0, 3);
    } catch (err) {
      error.value = getErrorMessage(err);
    }
  };

  // 取得精選講師，只取前 4 筆資料
  const fetchTeacherFeatured = async () => {
    error.value = null;

    try {
      const res: ApiResponse<TeacherFeatured[]> = await getTeacherFeatured();
      highlightedTeachers.value = (res.data ?? []).slice(0, 4);
    } catch (err) {
      error.value = getErrorMessage(err);
    }
  };

  return {
    // state
    error,
    popularCourses,
    highlightedTeachers,

    // actions
    fetchPopularCourse,
    fetchTeacherFeatured,
  };
});
