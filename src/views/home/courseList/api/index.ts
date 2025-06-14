// 課程列表api路徑
// https://sugerbutter-test.zeabur.app/api/v1/course/list

import axios from 'axios';
import type { courseListInfo, courseListResponse } from './type';

export const getCourseList = async () => {
  const res = await axios.get<courseListResponse<courseListInfo>>(
    import.meta.env.VITE_API_URL + '/api/v1/course/list'
  );
  return res.data;
};
