import { defineStore } from 'pinia';
import { ref } from 'vue';
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
    courseList.value = []; // 預設為空陣列，避免使用舊資料

    try {
      const response = await getCourseList();
      // 確保 response 存在且狀態為 true
      if (response && response.status === true) {
        // 新的 API 結構直接在 data 中返回陣列
        if (Array.isArray(response.data)) {
          courseList.value = response.data;
        } else {
          // 兼容舊版 API 結構
          if (response.data && Array.isArray(response.data.courses)) {
            courseList.value = response.data.courses;
          } else {
            error.value = 'API 回傳的資料結構不符合預期';
          }
        }
      } else {
        error.value = response?.message || 'API 回傳狀態錯誤';
      }
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
