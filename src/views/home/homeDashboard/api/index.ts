import instance from '@/api/axios';
import type { ApiResponse, PopularCourse, TeacherFeatured  } from './types';

// 取得熱門課程
export const getPopularCourses = async (): Promise<ApiResponse<PopularCourse[]>> => {
  const res = await instance.get<ApiResponse<PopularCourse[]>>('/api/v1/course/popular');
  return res.data;
};

// 取得精選講師
export const getTeacherFeatured = async (): Promise<ApiResponse<TeacherFeatured[]>> => {
  const res = await instance.get<ApiResponse<TeacherFeatured[]>>('/api/v1/teacher/featured');
  return res.data;
};
