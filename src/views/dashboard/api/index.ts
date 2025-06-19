import axiosInstance from '@/api/axios';
import type {
  courseAddTitlePostData,
  courseAddTitleResponse,
  courseAddCategoryPostData,
  courseAddCategoryResponse,
} from '../type';

export const apiPost_AddTitle = async (postData: courseAddTitlePostData) => {
  const res = await axiosInstance.post<courseAddTitleResponse>(
    '/api/v1/course/create/title',
    postData
  );
  return res.data;
};

export const apiPost_AddCategory = async (
  courseId: string,
  postData: courseAddCategoryPostData
) => {
  const res = await axiosInstance.post<courseAddCategoryResponse>(
    `/api/v1/course/${courseId}/category`,
    postData
  );
  return res.data;
};
// export const apiFunctionName = async (postData: PostDataType) => {
//   const res = await axios.post<ResponseType>('/your/api/path', postData);
//   return res.data;
// };
