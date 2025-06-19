import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { getCourseList } from '@/views/home/courseList/api';
import type { courseListInfo } from '@/views/home/courseList/api/type';

export const useCourseStore = defineStore('courseStore', () => {
  // 狀態
  const courseList = ref<courseListInfo[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  // 獲取課程列表
  const fetchCourses = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await getCourseList();
      courseList.value = response.data.courses;
    } catch (err) {
      error.value = err instanceof Error ? err.message : '查詢課程列表時發生錯誤';
    } finally {
      loading.value = false;
    }
  };

  // 清空課程列表
  const clearCourses = () => {
    courseList.value = [];
  };

  // 根據 ID 獲取課程
  const getCourseById = (id: string) => courseList.value.find(course => String(course.id).toLowerCase() === id) || null;

  return {
    courseList,
    loading,
    error,
    fetchCourses,
    clearCourses,
    getCourseById
  };
});
