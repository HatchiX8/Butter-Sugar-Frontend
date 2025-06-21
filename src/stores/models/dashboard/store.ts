import { ref } from 'vue';
import { defineStore } from 'pinia';
import { apiPost_AddCategory, apiPost_AddTitle } from '@/views/dashboard/api/index';
import type { courseAddCategoryPostData, courseAddTitlePostData } from '@/views/dashboard/type';
import { apiErrorMessage } from '@/utils/api/apiErrorMsg';

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
      return courseId.value;
    } catch (err) {
      const message = apiErrorMessage(err);
      error.value = message;
      console.log('storeLog:新增title發生錯誤，可使用此錯誤訊息處理UI', error.value);
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
