import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';
import type { QA, Answer, QuestionResponse } from '@/api/courseQa/type';
import { fetchCourseQuestions, submitQuestion as apiSubmitQuestion } from '@/api/courseQa/index';
import { useUserStore } from '@/stores/models/index';

export const useCourseQAStore = defineStore('courseQA', () => {
  // 狀態
  const qaList = ref<Record<string, QA[]>>({});
  const isLoading = ref<Record<string, boolean>>({});
  const hasError = ref<Record<string, boolean>>({});
  const errorMessage = ref<Record<string, string>>({});

  // 獲取指定課程的問答列表
  const getCourseQA = computed(() => (courseId: string) => qaList.value[courseId] || []);

  // 獲取指定課程的加載狀態
  const getLoadingState = computed(() => (courseId: string) => isLoading.value[courseId] || false);

  // 獲取指定課程的錯誤狀態
  const getErrorState = computed(() => (courseId: string) => ({
    hasError: hasError.value[courseId] || false,
    errorMessage: errorMessage.value[courseId] || ''
  }));

  // 格式化日期
  const formatDate = (dateString: string): string => {
    if (!dateString) return '';

    try {
      const date = new Date(dateString);
      return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
    } catch {
      return dateString;
    }
  };

  // 獲取當前使用者資訊
  const getUserInfo = async () => {
    const userStore = useUserStore();
    if (!userStore.userToken) return null;

    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users/info`, {
      headers: { Authorization: `Bearer ${userStore.userToken}` },
    });
    return res.data.data;
  };

  // 從 API 獲取課程問答數據
  const fetchCourseQA = async (courseId: string) => {
    if (!courseId) {
      hasError.value[courseId] = true;
      errorMessage.value[courseId] = '無效的課程 ID';
      return;
    }

    isLoading.value[courseId] = true;
    hasError.value[courseId] = false;
    errorMessage.value[courseId] = '';

    try {
      // 備份當前課程的問答列表，避免覆蓋
      const currentQAList = [...(qaList.value[courseId] || [])];

      // fetchCourseQuestions 已經處理了回應數據的解析
      const data = await fetchCourseQuestions(courseId);

      // 如果沒有新數據且已有現有數據，則保留現有數據
      if (data.length === 0 && currentQAList.length > 0) {
        return;
      }

      // 將 API 返回的數據轉換為組件所需的格式
      const formattedData = data.map((item: QuestionResponse) => {
        // 處理回答陣列
        let formattedAnswers: Answer[] = [];
        if (item.answers && item.answers.length > 0) {
          formattedAnswers = item.answers.map((answer) => ({
            name: answer.user_name || '回答者',
            date: formatDate(answer.created_at),
            // 僅當 is_instructor 為 true 時才顯示授課講師標籤
            role: answer.is_instructor === true ? '授課講師' : '',
            content: answer.answer_text
          }));
        }

        // 返回格式化後的問答數據
        return {
          user: {
            name: item.user_name || '作者',  // 改為「作者」而非「提問者」
            date: formatDate(item.created_at)
          },
          question: item.question_text,
          answer: formattedAnswers
        } as QA;
      });

      // 更新到狀態中，使用新的數組引用確保反應性更新
      qaList.value[courseId] = formattedData;
    } catch (error) {
      hasError.value[courseId] = true;
      errorMessage.value[courseId] = error instanceof Error ? error.message : '獲取數據失敗';
      qaList.value[courseId] = [];
    } finally {
      isLoading.value[courseId] = false;
    }
  };

  // 提交新問題
  const submitQuestion = async (courseId: string, content: string) => {
    if (!courseId) {
      hasError.value[courseId] = true;
      errorMessage.value[courseId] = '無效的課程id';
      return false;
    }

    try {
      // 設置提交中狀態
      isLoading.value[courseId] = true;
      hasError.value[courseId] = false;
      errorMessage.value[courseId] = '';

      // 備份當前問答列表，確保不會丟失現有數據
      const currentQAList = [...(qaList.value[courseId] || [])];

      // 獲取當前使用者資訊
      const userInfo = await getUserInfo();
      const userName = userInfo?.name || userInfo?.nickname || '';

      // 調用 API 提交問題
      const newQuestion = await apiSubmitQuestion(courseId, content);

      // 將新問題格式化並添加到現有列表中
      if (newQuestion) {
        // 格式化新問題，優先使用 API 返回的使用者名稱，如果沒有則使用從使用者資訊中獲取的名稱
        const formattedQuestion: QA = {
          user: {
            name: newQuestion.user_name || userName || '作者',  // 優先使用 API 返回的名稱，其次使用使用者資訊中的名稱，最後使用「作者」
            date: formatDate(newQuestion.created_at)
          },
          question: newQuestion.question_text,
          answer: [] // 新提交的問題預設沒有回答
        };

        // 使用新的數組引用，確保反應性更新
        qaList.value[courseId] = [formattedQuestion, ...currentQAList];
      }

      return true;
    } catch (error) {
      hasError.value[courseId] = true;
      errorMessage.value[courseId] = error instanceof Error ? error.message : '提交問題失敗';
      return false;
    } finally {
      isLoading.value[courseId] = false;
    }
  };

  return {
    qaList,
    isLoading,
    hasError,
    errorMessage,
    getCourseQA,
    getLoadingState,
    getErrorState,
    fetchCourseQA,
    submitQuestion
  };
});
