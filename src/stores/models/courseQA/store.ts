import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { QA, Answer, QuestionResponse } from '@/api/courseQa/type';
import { fetchCourseQuestions, submitQuestion as apiSubmitQuestion } from '@/api/courseQa/index';

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

  // 從API獲取課程問答數據
  const fetchCourseQA = async (courseId: string) => {
    if (!courseId) {
      hasError.value[courseId] = true;
      errorMessage.value[courseId] = '無效的課程ID';
      return;
    }

    isLoading.value[courseId] = true;
    hasError.value[courseId] = false;
    errorMessage.value[courseId] = '';

    try {
      // fetchCourseQuestions 已經處理了回應數據的解析
      const data = await fetchCourseQuestions(courseId);

      // 將API返回的數據轉換為組件所需的格式
      qaList.value[courseId] = data.map((item: QuestionResponse) => {
        // 處理回答陣列
        let formattedAnswers: Answer[] = [];
        if (item.answers && item.answers.length > 0) {
          formattedAnswers = item.answers.map((answer) => ({
            name: answer.user_name || '回答者',
            date: formatDate(answer.created_at),
            role: answer.is_instructor || answer.user_role === 'teacher' ? '授課講師' : '',
            content: answer.answer_text
          }));
        }

        // 返回格式化後的問答數據
        return {
          user: {
            name: item.user_name || '提問者',
            date: formatDate(item.created_at)
          },
          question: item.question_text,
          answer: formattedAnswers
        } as QA;
      });
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
    await apiSubmitQuestion(courseId, content);

    // 提交成功後重新獲取數據
    await fetchCourseQA(courseId);
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
