import { ref } from 'vue';
import { defineStore } from 'pinia';
import { apiPost_AddCategory, apiPost_AddTitle } from '@/views/dashboard/api/index';
import type { courseAddCategoryPostData, courseAddTitlePostData } from '@/views/dashboard/type';

export const useDashboardStore = defineStore('dashboardStore', () => {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const courseId = ref(); // 通用課程ID

  // ----------新增標題API----------
  const addTitle = async (postData: courseAddTitlePostData) => {
    loading.value = true;
    error.value = null;

    try {
      const res = await apiPost_AddTitle(postData);
      console.log('storeLog:檢視回傳', res);
      courseId.value = res.data.course.id;
      console.log('storeLog:寫入', courseId.value);
    } catch (err) {
      console.log('storeLog:新增title錯誤', err);
    } finally {
      loading.value = false;
    }
  };
  // ------------------------------

  // ----------新增CategoryAPI----------
  const addCategory = async (postData: courseAddCategoryPostData) => {
    loading.value = true;
    error.value = null;

    try {
      const res = await apiPost_AddCategory(courseId.value, postData);
      console.log('寫入課程類別完成', res);
    } catch (err) {
      console.log('storeLog:新增title錯誤', err);
    } finally {
      loading.value = false;
    }
  };
  // -----------------------------------

  return { addTitle, addCategory };
});
