import { ref } from 'vue';
import { defineStore } from 'pinia';
import {
  apiPatch_changeCourseStatus,
  apiGet_courseDetail,
  apiPost_AddCategory,
  apiPost_AddTitle,
  apiPatch_coursePrice,
} from '@/views/dashboard/api/index';
import type {
  courseStatusPostData,
  courseAddCategoryPostData,
  courseAddTitlePostData,
  coursePricePostData,
} from '@/views/dashboard/type';
import { apiErrorMessage } from '@/utils/api/apiErrorMsg';
import axios from 'axios';

export const useDashboardStore = defineStore('dashboardStore', () => {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const courseId = ref(); // 通用課程ID

  // 錯誤訊息
  const getErrorMessage = (err: unknown): string => {
    if (axios.isAxiosError(err)) {
      // 優先取後端回傳的 message
      const msg = err.response?.data?.message;
      if (typeof msg === 'string') return msg;
    }
    if (typeof err === 'string') return err;
    if (err instanceof Error) return err.message;
    return '發生未知錯誤';
  };

  interface ActionResult {
    success: boolean;
    message: string;
  }

  // ----------更改課程狀態API----------
  const changeCourseStatus = async (
    courseId: string,
    postData: courseStatusPostData
  ): Promise<ActionResult> => {
    loading.value = true;
    error.value = null;

    try {
      const res = await apiPatch_changeCourseStatus(courseId, postData);
      return { success: true, message: res.message };
    } catch (err) {
      const msg = getErrorMessage(err);
      error.value = msg;
      return { success: false, message: msg };
    } finally {
      loading.value = false;
    }
  };
  // -----------------------------------

  // ----------取得單一課程資料API----------
  const fetchCourseDetail = async (id: string) => {
    loading.value = true;
    error.value = null;

    try {
      const res = await apiGet_courseDetail(id);
      if (res.data.course) {
        courseId.value = res.data.course.id;
        return res.data.course;
      }
      else error.value = '取得單一課程資料失敗';
    } catch (err) {
      error.value = getErrorMessage(err);
    } finally {
      loading.value = false;
    }
  };
  // -----------------------------------

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

  // ----------上傳課程圖片API----------

  // ----------------------------------

  // ----------課程價格API----------
  const saveCoursePrice = async (
    courseId: string,
    postData: coursePricePostData
  ): Promise<ActionResult> => {
    loading.value = true;
    error.value = null;

    try {
      const res = await apiPatch_coursePrice(courseId, postData);
      return { success: true, message: res.message };
    } catch (err) {
      const msg = getErrorMessage(err);
      error.value = msg;
      return { success: false, message: msg };
    } finally {
      loading.value = false;
    }
  };
  // ----------------------------------

  return {
    courseId,
    changeCourseStatus,
    fetchCourseDetail,
    addTitle,
    addCategory,
    saveCoursePrice,
  };
});
