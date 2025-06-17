// 我的課程列表api路徑
// https://sugerbutter-test.zeabur.app/api/v1/course/list

import axios from 'axios';
import type { courseListInfo, courseListResponse } from './type';

export const getMyCourseList = async () => {
  const res = await axios.get<courseListResponse<courseListInfo>>(
    import.meta.env.VITE_API_URL + '/api/v1/course/list'
  );

  // 模擬學習進度和評分數據（實際應該從後端獲取）
  const coursesWithProgress = res.data.data.courses.map(course => ({
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
