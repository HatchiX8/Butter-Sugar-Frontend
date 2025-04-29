import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

// 可加攔截器
instance.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err)
);

export default instance;
