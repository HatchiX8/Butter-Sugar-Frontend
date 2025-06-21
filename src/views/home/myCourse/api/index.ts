// 我的課程列表api路徑
// https://buttersugar-backend.zeabur.app/api/v1/course/my-courses

import instance from '@/api/axios';
import type { courseListInfo, courseListResponse } from './type';

export const getMyCourseList = async () => {
  const res = await instance.get<courseListResponse<courseListInfo>>(
    '/api/v1/course/my-courses'
  );

  // 防呆處理：確保 res.data 和 res.data.data 存在
  if (!res.data || !res.data.data) {
    // API 回傳資料結構異常
    return {
      status: false,
      message: 'API 回傳資料結構異常',
      data: {
        courses: []
      }
    };
  }

  // 防呆處理：確保 courses 是陣列
  const courses = Array.isArray(res.data.data.courses) 
    ? res.data.data.courses 
    : Array.isArray(res.data.data) 
      ? res.data.data 
      : [];

  // 模擬學習進度和評分數據（實際應該從後端獲取）
  const coursesWithProgress = courses.map(course => ({
    ...course,
    learning_progress: Math.floor(Math.random() * 100), // 隨機生成0-100的進度
    rating: 3 + Math.random() * 2, // 隨機生成3-5的評分
    last_accessed_at: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 隨機生成最近30天內的日期
    teacher: '講師' // 添加講師名稱，實際應該根據 teacher_id 從後端獲取
  }));

  return {
    ...res.data,
    data: {
      courses: coursesWithProgress
    }
  };
};
