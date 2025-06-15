import axios from 'axios';
import type { ResponseType, PostDataType } from './type';

export const apiFunctionName = async (postData: PostDataType) => {
  const res = await axios.post<ResponseType>('/your/api/path', postData);
  return res.data;
};
