import axiosInstance from '@/api/axios';
import type {
  courseStatusPostData,
  courseStatusResponse,
  courseAddTitlePostData,
  courseAddTitleResponse,
  courseAddCategoryPostData,
  courseAddCategoryResponse,
  courseSaveFormPostData,
  handoutsResponse,
  courseDetailResponse,
  coursePricePostData,
  coursePriceResponse,
  categoryAddChapterPostData,
  categoryAddChapterResponse,
  categoryAddSubsectionsPostData,
  categoryAddSubsectionsResponse,
  categoryGetChapterResponse,
  categoryGetSubsectionResponse,
  changeChaptersSubsectionsPostData,
  changeChaptersSubsectionsResponse,
} from '../type';

// ----------更改課程狀態(上架/下架)----------
export const apiPatch_changeCourseStatus = async (
  courseId: string,
  postData: courseStatusPostData
) => {
  const res = await axiosInstance.patch<courseStatusResponse>(
    `/api/v1/course/${courseId}/status`,
    postData
  );
  return res.data;
};
// ----------------------------

// ----------取得單一課程資料----------
export const apiGet_courseDetail = async (courseId: string) => {
  const res = await axiosInstance.get<courseDetailResponse>(`/api/v1/course/${courseId}`);
  return res.data;
};
// ----------------------------

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

  const res = await axiosInstance.post<{ data: { videoUrl: string } }>(
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
export const apiPost_AddHandouts = async (courseId: string, files: File[]) => {
  const formData = new FormData();

  for (const file of files) {
    formData.append('handout', file);
  }

  const res = await axiosInstance.post<{ data: { handouts: Array<handoutsResponse> } }>(
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
// 取得課程講義
export const apiGet_handoutsDetail = async (courseId: string) => {
  const res = await axiosInstance.get<{ data: { handouts: Array<handoutsResponse> } }>(
    `/api/v1/course/${courseId}/handouts`
  );
  return res.data;
};
// ----------------------------------

// ----------表單內容----------
export const apiPost_SaveForm = async (courseId: string, postData: courseSaveFormPostData) => {
  const res = await axiosInstance.post(`/api/v1/course/${courseId}/save`, postData);
  return res.data;
};
// ---------------------------

// ----------課程價格----------
export const apiPatch_coursePrice = async (courseId: string, postData: coursePricePostData) => {
  const res = await axiosInstance.patch<coursePriceResponse>(
    `/api/v1/course/${courseId}/price`,
    postData
  );
  return res.data;
};
// ---------------------------

// export const apiFunctionName = async (postData: PostDataType) => {
//   const res = await axios.post<ResponseType>('/your/api/path', postData);
//   return res.data;
// };

// ----------以下為章節API----------
// 新增章節
export const apiPost_AddChapter = async (
  courseId: string,
  postData: categoryAddChapterPostData
) => {
  const res = await axiosInstance.post<categoryAddChapterResponse>(
    `/api/v1/course/${courseId}/section`,
    postData
  );

  return res.data;
};

// 刪除章節
export const apiDelete_RemoveChapter = async (courseId: string) => {
  const res = await axiosInstance.delete(`/api/v1/course/section/${courseId}`);
  return res.data;
};

// 取得所有章節
export const apiGet_GetChapter = async (courseId: string) => {
  const res = await axiosInstance.get<categoryGetChapterResponse>(
    `/api/v1/course/${courseId}/section`
  );
  return res.data;
};

// 修改章節小節API
export const apiPatch_ChangeChaptersSubsections = async (courseId: string, postData: changeChaptersSubsectionsPostData[]) => {
  const res = await axiosInstance.patch<changeChaptersSubsectionsResponse>(
    `/api/v1/course/${courseId}/subsection`,
    postData
  );

  return res.data;
};
// --------------------------------

// ----------以下為小節API----------
// 新增小節API
export const apiPost_AddSubsections = async (sectionId: string, postData: categoryAddSubsectionsPostData) => {
  const res = await axiosInstance.post<categoryAddSubsectionsResponse>(
    `/api/v1/course/section/${sectionId}/subsection`,
    postData
  );

  return res.data;
};
// 刪除小節API
export const apiDelete_RemoveSubsections = async (section_id: string) => {
  const res = await axiosInstance.delete(`/api/v1/course/subsection/${section_id}`);
  return res.data;
};

// 取得指定章節的小節
export const apiGet_GetSubsections = async (sectionId: string) => {
  const res = await axiosInstance.get<categoryGetSubsectionResponse>(
    `/api/v1/course/section/${sectionId}/subsection`
  );
  return res.data;
};

// 新增影片
export const apiPost_AddSubsectionsVideo = async (section_id: string, file: File) => {
  const formData = new FormData();
  formData.append('video', file);

  const res = await axiosInstance.post<{ data: { videoUrl: string } }>(
    `/api/v1/subsection/upload/${section_id}/upload-video`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );
  return res.data;
};
// 刪除影片
export const apiDelete_DeleteSubsectionsVideo = async (section_id: string) => {
  const res = await axiosInstance.delete(`/api/v1/subsection/upload/${section_id}/upload-video`);
  return res.data;
};
// --------------------------------
