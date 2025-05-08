import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); //從localStorage 獲取 token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 設定 Bearer Token
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// 可加攔截器
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err)
);

export default instance;
