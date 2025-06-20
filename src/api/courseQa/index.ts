import type { QuestionResponse } from './type';
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
  if (responseData && typeof responseData === 'object' && 'data' in responseData && Array.isArray(responseData.data)) {
    return responseData.data as QuestionResponse[];
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
 * @returns Promise<void>
 */
export const submitQuestion = async (courseId: string, content: string): Promise<void> => {
  // 實際實現時應該會調用API
  // 目前只是模擬成功
  alert(`已提交問題：${content}`);
};
