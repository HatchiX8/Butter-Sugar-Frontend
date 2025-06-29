// 定義問答數據的類型
export interface User {
  name: string;
  date: string;
  avatar?: string;
  profile_image_url?: string;
}

// 前端組件使用的回答型別
export interface Answer {
  name: string;
  date: string;
  role?: string;
  content: string;
  avatar?: string; // 添加頭像屬性
  profile_image_url?: string; // 添加 Google 頭像 URL
}

// 前端組件使用的問答型別
export interface QA {
  user: User;
  question: string;
  question_id?: string; // 問題 ID，用於提交回答
  answer: Answer | Answer[];
}

// 定義API響應的類型
export interface QuestionResponse {
  id: string;
  user_id: string;
  user_name: string;
  user_nickname?: string; // 用戶暱稱
  user_avatar?: string; // 用戶頭像
  profile_image_url?: string; // Google 頭像 URL
  serial_id: number;
  question_text: string;
  created_at: string;
  answers?: Array<{
    user_id: string;
    user_name: string;
    user_nickname?: string; // 用戶暱稱
    user_avatar?: string; // 用戶頭像
    profile_image_url?: string; // Google 頭像 URL
    answer_text: string;
    user_role?: string;
    created_at: string;
    is_instructor: boolean;
  }>;
}

export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data?: T | null;
}

// 定義API回答響應的類型
export interface AnswerResponse {
  id: string;
  question_id: string;
  user_id: string;
  user_name: string;
  user_nickname?: string; // 用戶暱稱
  user_avatar?: string; // 用戶頭像
  profile_image_url?: string; // Google 頭像 URL
  user_role?: string;
  answer_text: string;
  is_accepted: boolean;
  created_at: string;
}
