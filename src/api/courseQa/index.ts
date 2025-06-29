import type { QuestionResponse, AnswerResponse } from './type';
import { useUserStore } from '@/stores/models/index';

const API_BASE = import.meta.env.VITE_API_URL;

/**
 * 獲取課程的問答列表
 * @param courseId 課程ID
 * @returns Promise<QuestionResponse[]> 問答列表
 */
export const fetchCourseQuestions = async (courseId: string): Promise<QuestionResponse[]> => {
  if (!courseId) {
    throw new Error('無效的課程ID');
  }

  // 獲取用戶 token
  const userStore = useUserStore();
  // Pinia 自動解包 ref，userToken 直接是 string | null
  const token = userStore.userToken;

  // 設置請求頭，包含授權信息
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  };

  // 如果有 token，添加到請求頭
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}/api/v1/course/${courseId}/questions`, {
    method: 'GET',
    headers
  });

  if (!response.ok) {
    // 如果是 401 未授權錯誤，提示用戶登入
    if (response.status === 401) {
      throw new Error('請先登入後再查看課程問答');
    }
    throw new Error(`API請求失敗: ${response.status}`);
  }

  // 解析回應數據
  const responseData = await response.json();

  // 檢查是否為嵌套的 { data: [...] } 結構
  if (responseData && typeof responseData === 'object' && 'data' in responseData) {
    // 如果 data 是陣列，直接返回
    if (Array.isArray(responseData.data)) {
      return responseData.data as QuestionResponse[];
    }
    // 如果 data 是單一物件，轉換為陣列返回
    else if (responseData.data && typeof responseData.data === 'object') {
      return [responseData.data as QuestionResponse];
    }
  }

  // 如果是直接返回陣列
  if (Array.isArray(responseData)) {
    return responseData as QuestionResponse[];
  }

  // 如果都不是，返回空陣列
  return [];
};

/**
 * 提交新問題
 * @param courseId 課程ID
 * @param content 問題內容
 * @returns Promise<QuestionResponse> 新創建的問題
 */
export const submitQuestion = async (courseId: string, content: string): Promise<QuestionResponse> => {
  if (!courseId) {
    throw new Error('無效的課程ID');
  }

  // 獲取用戶 token
  const userStore = useUserStore();
  const token = userStore.userToken;

  // 檢查用戶是否已登入
  if (!token) {
    throw new Error('請先登入後再提交問題');
  }

  // 設置請求頭，包含授權信息
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  // 準備請求體
  const requestBody = {
    question_text: content
  };

  const response = await fetch(`${API_BASE}/api/v1/course/${courseId}/questions`, {
    method: 'POST',
    headers,
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    // 如果是 401 未授權錯誤，提示用戶登入
    if (response.status === 401) {
      throw new Error('請先登入後再提交問題');
    }
    throw new Error(`提交問題失敗: ${response.status}`);
  }

  // 解析回應數據
  const responseData = await response.json();

  // 檢查是否為嵌套的 { data: ... } 結構
  if (responseData && typeof responseData === 'object' && 'data' in responseData) {
    // 確保返回的是一個物件
    if (responseData.data && typeof responseData.data === 'object' && !Array.isArray(responseData.data)) {
      return responseData.data as QuestionResponse;
    }
    // 如果是陣列，取第一個元素
    else if (Array.isArray(responseData.data) && responseData.data.length > 0) {
      return responseData.data[0] as QuestionResponse;
    }
  }

  // 直接返回數據
  return responseData as QuestionResponse;
};

/**
 * 提交問題回答
 * @param courseId 課程ID
 * @param questionId 問題ID
 * @param answerText 回答內容
 * @returns Promise<AnswerResponse> 新創建的回答
 */
export const submitAnswer = async (courseId: string, questionId: string, answerText: string): Promise<AnswerResponse> => {
  if (!courseId) {
    throw new Error('無效的課程ID');
  }

  if (!questionId) {
    throw new Error('無效的問題ID');
  }

  // 獲取用戶 token
  const userStore = useUserStore();
  const token = userStore.userToken;

  // 檢查用戶是否已登入
  if (!token) {
    throw new Error('請先登入後再提交回答');
  }

  // 設置請求頭，包含授權信息
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  // 準備請求體
  const requestBody = {
    question_id: questionId,
    answer_text: answerText
  };

  const response = await fetch(`${API_BASE}/api/v1/course/${courseId}/answers`, {
    method: 'POST',
    headers,
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    // 如果是 401 未授權錯誤，提示用戶登入
    if (response.status === 401) {
      throw new Error('請先登入後再提交回答');
    }
    throw new Error(`提交回答失敗: ${response.status}`);
  }

  // 解析回應數據
  const responseData = await response.json();

  // 檢查是否為嵌套的 { data: ... } 結構
  if (responseData && typeof responseData === 'object' && 'data' in responseData) {
    // 確保返回的是一個物件
    if (responseData.data && typeof responseData.data === 'object' && !Array.isArray(responseData.data)) {
      return responseData.data as AnswerResponse;
    }
    // 如果是陣列，取第一個元素
    else if (Array.isArray(responseData.data) && responseData.data.length > 0) {
      return responseData.data[0] as AnswerResponse;
    }
  }

  // 直接返回數據
  return responseData as AnswerResponse;
};
