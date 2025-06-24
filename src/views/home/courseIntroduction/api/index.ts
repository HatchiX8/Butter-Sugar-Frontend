import axios from '@/api/axios';
import type { SectionResponse } from './type';
import type { AxiosResponse } from 'axios';

// 獲取課程章節
export const getCourseSections = async (courseId: string): Promise<AxiosResponse<SectionResponse>> => {
  console.log('發送 API 請求獲取課程章節:', courseId);
  
  try {
    // API 路徑確認為 /api/v1/section/course/{courseId}
    return axios.get(`/api/v1/section/course/${courseId}`);
  } catch (error) {
    console.error('請求課程章節時發生錯誤:', error);
    throw error;
  }
};
