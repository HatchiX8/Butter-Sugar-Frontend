import axiosInstance from '@/api/axios';
import type { courseAddTitlePostData, courseAddTitleResponse } from '../type';

export const postAddTitle = async (postData: courseAddTitlePostData) => {
  const res = await axiosInstance.post<courseAddTitleResponse>(
    '/api/v1/course/create/title',
    postData
  );
  return res.data;
};

// export const apiFunctionName = async (postData: PostDataType) => {
//   const res = await axios.post<ResponseType>('/your/api/path', postData);
//   return res.data;
// };
