import { ref } from 'vue';
import { defineStore } from 'pinia';
import { postAddTitle } from '@/views/dashboard/api/index';
import type { courseAddTitlePostData } from '@/views/dashboard/type';

export const useDashboardStore = defineStore('dashboardStore', () => {
  const loading = ref(false);
  const error = ref<string | null>(null);

  // ----------新增標題API----------
  const courseId = ref();
  const addTitle = async (postData: courseAddTitlePostData) => {
    loading.value = true;
    error.value = null;

    try {
      const res = await postAddTitle(postData);
      console.log('storeLog:檢視回傳', res);
      courseId.value = res;
      console.log('storeLog:寫入', courseId.value);
    } catch (err) {
      console.log('storeLog:新增title錯誤', err);
    } finally {
      loading.value = false;
    }
  };
  // ------------------------------

  return { addTitle };
});
