export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data?: T | null;
};

export interface Application {
  id?: string;
  user_id?: string;
  user_name?: string; // 用戶名稱
  course_name: string;
  course_description?: string;
  description?: string; // API 返回使用 description，但我們的表單使用 course_description
  status?: string;
  created_at?: string;
}

