import instance from '@/api/axios';
import type { ApiResponse, InstructorDataModel, TeacherProfile, TeacherCourse  } from './types';

// 取得單一精選教師
export const getInstructor= async (teacherId: string): Promise<ApiResponse<InstructorDataModel>> => {
  const res = await instance.get<ApiResponse<InstructorDataModel>>(`/api/v1/teacher/${teacherId}`);
  return res.data;
};

// 取得教師資料
export const getTeacherProfile= async (): Promise<ApiResponse<TeacherProfile>> => {
  const res = await instance.get<ApiResponse<TeacherProfile>>(`/api/v1/teacher/profile`);
  return res.data;
};

// 更新教師資料
export const updateTeacherProfile= async (formData: FormData): Promise<ApiResponse<TeacherProfile>> => {
  const res = await instance.patch<ApiResponse<TeacherProfile>>(`/api/v1/teacher/profile`, formData);
  return res.data;
};

// 取得教師課程列表
export const getTeacherCourses= async (pageNum: number): Promise<ApiResponse<TeacherCourse[]>> => {
  const res = await instance.get<ApiResponse<TeacherCourse[]>>(`/api/v1/teacher/teacherCourse`, {
    params: { page: pageNum }
  });
  return res.data;
};
