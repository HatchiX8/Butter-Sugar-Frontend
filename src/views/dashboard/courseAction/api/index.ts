// 收藏課程API路徑
// GET {{host}}/api/v1/course/favorites/list - 獲取收藏列表 
// POST {{host}}/api/v1/course/favorites - 新增收藏
// DELETE {{host}}/api/v1/course/favorites/{favoriteId} - 取消收藏

import instance from '@/api/axios';
import type { FavoriteCoursesResponse, FavoriteCourseInfo } from './type';

// 獲取收藏課程列表
export const getFavoriteCoursesList = async () => {
  const res = await instance.get<FavoriteCoursesResponse<FavoriteCourseInfo>>(
    '/api/v1/course/favorites/list'
  );
  return res.data;
};

// 新增收藏課程
export const addFavoriteCourse = async (courseId: string) => {
  const res = await instance.post('/api/v1/course/favorites', {
    course_id: courseId
  });
  return res.data;
};

// 取消收藏課程
export const removeFavoriteCourse = async (favoriteId: string) => {
  const res = await instance.delete(`/api/v1/course/favorites/${favoriteId}`);
  return res.data;
};
