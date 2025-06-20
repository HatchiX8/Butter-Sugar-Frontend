import instance from '@/api/axios';
import type { ApiResponse, InstructorDataModel  } from './types';

// 取得單一精選教師
export const getInstructor= async (teacherId: string): Promise<ApiResponse<InstructorDataModel>> => {
  const res = await instance.get<ApiResponse<InstructorDataModel>>(`/api/v1/teacher/${teacherId}`);
  return res.data;
};
