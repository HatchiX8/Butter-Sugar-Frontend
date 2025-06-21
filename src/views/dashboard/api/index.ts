import axiosInstance from '@/api/axios';
import type {
  courseAddTitlePostData,
  courseAddTitleResponse,
  courseAddCategoryPostData,
  courseAddCategoryResponse,
} from '../type';

// ----------標題&類別----------
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
// ----------------------------

// ----------課程圖片API----------
// 新增
export const apiPost_AddImg = async (courseId: string, file: File) => {
  const formData = new FormData();
  formData.append('course-small-image', file);

  const res = await axiosInstance.post<{ data: { imageUrl: string } }>(
    `/api/v1/course/${courseId}/upload/small-image`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );

  return res.data;
};
// 刪除
export const apiDelete_DeleteImg = async (courseId: string) => {
  const res = await axiosInstance.delete(`/api/v1/course/${courseId}/upload/small-image`);
  return res.data;
};
// ------------------------------

// ----------課程banner圖片API----------
// 新增
export const apiPost_AddImgBanner = async (courseId: string, file: File) => {
  const formData = new FormData();
  formData.append('banner', file);

  const res = await axiosInstance.post<{ data: { imageUrl: string } }>(
    `/api/v1/course/${courseId}/upload/course-banner-image`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );

  return res.data;
};
// 刪除
export const apiDelete_DeleteImgBanner = async (courseId: string) => {
  const res = await axiosInstance.delete(`/api/v1/course/${courseId}/upload/course-banner-image`);
  return res.data;
};
// ------------------------------------

// ----------課程描述圖片API----------
// 新增
export const apiPost_AddImgDescription = async (courseId: string, file: File) => {
  const formData = new FormData();
  formData.append('course-description-image', file);

  const res = await axiosInstance.post<{ data: { imageUrl: string } }>(
    `/api/v1/course/${courseId}/upload/description-image`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );

  return res.data;
};
// 刪除
export const apiDelete_DeleteImgDescription = async (courseId: string) => {
  const res = await axiosInstance.delete(`/api/v1/course/${courseId}/upload/description-image`);
  return res.data;
};
// ----------------------------------

// ----------預告片API----------
// 新增
export const apiPost_AddTrailer = async (courseId: string, file: File) => {
  const formData = new FormData();
  formData.append('trailer', file);

  const res = await axiosInstance.post<{ data: { video: string } }>(
    `/api/v1/course/${courseId}/upload/course-trailer`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );

  return res.data;
};
// 刪除
export const apiDelete_DeleteTrailer = async (courseId: string) => {
  const res = await axiosInstance.delete(`/api/v1/course/${courseId}/upload/course-trailer`);
  return res.data;
};
// ----------------------------------

// ----------講義API----------
// 新增
export const apiPost_AddHandouts = async (courseId: string, file: File) => {
  const formData = new FormData();
  formData.append('handouts', file);

  const res = await axiosInstance.post<{ data: { url: string } }>(
    `/api/v1/course/${courseId}/upload/course-handouts`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );

  return res.data;
};
// 刪除
export const apiDelete_DeleteHandouts = async (courseId: string) => {
  const res = await axiosInstance.delete(`/api/v1/course/${courseId}/upload/course-handouts`);
  return res.data;
};
// ----------------------------------

// export const apiFunctionName = async (postData: PostDataType) => {
//   const res = await axios.post<ResponseType>('/your/api/path', postData);
//   return res.data;
// };
