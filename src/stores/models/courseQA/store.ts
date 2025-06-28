import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';
import type { QA, Answer, QuestionResponse, ApiResponse, AnswerResponse } from '@/api/courseQa/type';
import { fetchCourseQuestions, submitQuestion as apiSubmitQuestion, submitAnswer as apiSubmitAnswer } from '@/api/courseQa/index';
import { useUserStore } from '@/stores/models/index';

export const useCourseQAStore = defineStore('courseQA', () => {
  // 狀態
  const qaList = ref<Record<string, QA[]>>({});
  const isLoading = ref<Record<string, boolean>>({});
  const hasError = ref<Record<string, boolean>>({});
  const errorMessage = ref<Record<string, string>>({});
  const isSubmittingQuestion = ref<Record<string, boolean>>({});
  const courseQuestionTracking = ref<Record<string, boolean>>({});

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

    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users/info`, {
        headers: { Authorization: `Bearer ${userStore.userToken}` },
      });
      return res.data.data;
    } catch (error) {
      console.error('獲取用戶資訊失敗：', error);
      return null;
    }
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
            name: answer.user_nickname || answer.user_name || '回答者', // 優先使用暱稱
            date: formatDate(answer.created_at),
            // 僅當 is_instructor 為 true 時才顯示授課講師標籤
            role: answer.is_instructor === true ? '授課講師' : '',
            content: answer.answer_text,
            avatar: answer.user_avatar || '', // 添加頭像
            profile_image_url: answer.profile_image_url || '' // 添加 Google 頭像 URL
          }));
        }

        // 返回格式化後的問答數據
        return {
          user: {
            name: item.user_nickname || item.user_name || '作者',  // 優先使用暱稱
            date: formatDate(item.created_at),
            avatar: item.user_avatar || '', // 添加頭像
            profile_image_url: item.profile_image_url || '' // 添加 Google 頭像 URL
          },
          question: item.question_text,
          question_id: item.id, // 確保問題 ID 被保存
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
      errorMessage.value[courseId] = '課程ID不能為空';
      return false;
    }

    errorMessage.value[courseId] = '';
    isSubmittingQuestion.value[courseId] = true;

    // 跟蹤此課程的狀態判斷
    const isQuestionTracking = courseQuestionTracking.value[courseId] || false;

    try {
      const userInfo = await getUserInfo();
      const userName = userInfo?.nickname || userInfo?.name || ''; // 優先使用 nickname
      const userAvatar = userInfo?.avatar || userInfo?.profile_image_url || ''; // 取默認頭像

      const userStore = useUserStore();
      const res = await axios.post<ApiResponse<QuestionResponse>>(
        `${import.meta.env.VITE_API_URL}/api/v1/course/${courseId}/questions`,
        { question_text: content },
        { headers: { Authorization: `Bearer ${userStore.userToken}` } }
      );

      const newQuestion = res.data.data;

      // 成功報文後，預先將問題加入陣列，等後端回覆
      if (newQuestion) {
        const formattedQuestion: QA = {
          user: {
            name: newQuestion.user_nickname || newQuestion.user_name || userName || '作者',
            date: formatDate(newQuestion.created_at),
            avatar: newQuestion.user_avatar || userAvatar || '', // 添加頭像資料
            profile_image_url: newQuestion.profile_image_url || userInfo?.profile_image_url || '' // 添加 Google 頭像 URL
          },
          question: newQuestion.question_text,
          question_id: newQuestion.id,
          answer: []
        };

        // 如果這個課程的問題尚未追蹤，則初始化
        if (!qaList.value[courseId]) {
          qaList.value[courseId] = [];
        }

        // 將新問題添加到開頭
        qaList.value[courseId].unshift(formattedQuestion);

        // 已經有追蹤狀態的課程，需要更新購計
        if (isQuestionTracking) {
          courseQuestionTracking.value[courseId] = true;
        }
      }
      return true;
    } catch (error) {
      hasError.value[courseId] = true;
      errorMessage.value[courseId] = error instanceof Error ? error.message : '提交問題失敗';
      return false;
    } finally {
      isLoading.value[courseId] = false;
      isSubmittingQuestion.value[courseId] = false;
    }
  };

  // 提交回答
  const submitAnswer = async (courseId: string, questionId: string, content: string) => {
    if (!courseId || !questionId) {
      hasError.value[courseId] = true;
      errorMessage.value[courseId] = '無效的課程 ID 或問題 ID';
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
      const userName = userInfo?.nickname || userInfo?.name || ''; // 優先使用暱稱
      const userAvatar = userInfo?.avatar || userInfo?.profile_image_url || ''; // 取得頭像

      // 調用 API 提交回答
      const newAnswer = await apiSubmitAnswer(courseId, questionId, content);

      // 找到要回答的問題索引
      const questionIndex = currentQAList.findIndex(qa => qa.question_id === newAnswer.question_id);

      if (questionIndex !== -1) {
        // 將新回答格式化並添加到現有問題的回答列表中
        const formattedAnswer: Answer = {
          name: newAnswer.user_nickname || newAnswer.user_name || userName || '回答者',  // 優先使用暱稱
          date: formatDate(newAnswer.created_at),
          role: newAnswer.user_role || '',  // 如果 API 返回的角色信息
          content: newAnswer.answer_text,
          avatar: newAnswer.user_avatar || userAvatar || '', // 添加頭像
          profile_image_url: newAnswer.profile_image_url || userInfo?.profile_image_url || '' // 添加 Google 頭像 URL
        };

        // 創建更新後的問答列表
        const updatedQAList = [...currentQAList];

        // 添加新回答到相應問題的回答陣列中
        const currentAnswers = Array.isArray(updatedQAList[questionIndex].answer)
          ? updatedQAList[questionIndex].answer as Answer[]
          : [updatedQAList[questionIndex].answer as Answer];

        updatedQAList[questionIndex].answer = [...currentAnswers, formattedAnswer];

        // 更新到狀態中，確保反應性更新
        qaList.value[courseId] = updatedQAList;
      } else {
        // 如果沒有找到相應問題，可能需要重新載入所有問題列表
        await fetchCourseQA(courseId);
      }

      return true;
    } catch (error) {
      hasError.value[courseId] = true;
      errorMessage.value[courseId] = error instanceof Error ? error.message : '提交回答失敗';
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
    submitQuestion,
    submitAnswer
  };
});
