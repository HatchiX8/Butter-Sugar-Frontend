import instance from '@/api/axios';
import type { ApiResponse, Application } from './type';

export const postApplication= async (course_name: string, description: string): Promise<ApiResponse<Application>> => {
  const res = await instance.post<ApiResponse<Application>>(`/api/v1/teacher-applications`, {
    course_name,
    description,
  });
  return res.data;
};
