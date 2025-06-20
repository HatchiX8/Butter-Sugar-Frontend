// 定義問答數據的類型
export interface User {
  name: string;
  date: string;
  avatar?: string;
}

// 前端組件使用的回答型別
export interface Answer {
  name: string;
  date: string;
  role?: string;
  content: string;
}

// 前端組件使用的問答型別
export interface QA {
  user: User;
  question: string;
  answer: Answer | Answer[];
}

// 定義API響應的類型
export interface QuestionResponse {
  id: string;
  user_id: string;
  user_name: string;
  serial_id: number;
  question_text: string;
  created_at: string;
  answers?: Array<{
    user_id: string;
    user_name: string;
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
