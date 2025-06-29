// 課程列表api路徑
// https://buttersugar-backend.zeabur.app/api/v1/course/list

import instance from '@/api/axios';
import type { courseListInfo, courseListResponse, CategoryResponse, Category } from './type';

export const getCourseList = async () => {
  const res = await instance.get<courseListResponse<courseListInfo>>(
    '/api/v1/course/list'
  );
  return res.data;
};

// 獲取課程分類
export const getCourseCategories = async (): Promise<Category[]> => {
  const res = await instance.get<CategoryResponse>('/api/v1/course/category');
  return res.data.data.categories;
};
