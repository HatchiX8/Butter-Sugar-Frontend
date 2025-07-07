import instance from '../axios';
import type { ApiResponse, Application } from './type';

export const postApplication = async (course_name: string, description: string): Promise<ApiResponse<Application>> => {
  try {
    console.log('發送教師申請請求，參數:', { course_name, description });
    const res = await instance.post<ApiResponse<Application>>(`/api/v1/teacher-applications`, {
      course_name,
      description,
    });
    console.log('教師申請回應:', res.data);
    return res.data;
  } catch (error) {
    console.error('教師申請請求失敗:', error);
    throw error;
  }
};

export const getTeacherApplications = async (): Promise<ApiResponse<Application[]>> => {
  try {
    console.log('獲取教師申請列表請求');
    const res = await instance.get<ApiResponse<Application[]>>(`/api/v1/teacher-applications`);
    console.log('獲取教師申請列表回應:', res.data);
    return res.data;
  } catch (error) {
    console.error('獲取教師申請列表失敗:', error);
    throw error;
  }
};
