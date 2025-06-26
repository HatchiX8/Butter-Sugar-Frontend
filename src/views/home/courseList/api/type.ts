// 請求API用的型別

// 後端回傳的型別
export interface courseListResponse<T> {
  status: boolean;
  message: string;
  data: {
    courses: T[];
  };
}
// 資料內容的型別
export interface courseListInfo {
  id: string;
  teacher_id: string;
  category_id: number;
  course_banner_imageUrl: string;
  course_name: string;
  course_banner_description: string | null;
  course_description: string | null;
  course_description_imageUrl: string | null;
  course_hours: string | null;
  course_small_imageUrl: string | null;
  total_users: string | null;
  trailer_name: string | null;
  trailer_url: string | null;
  trailer_status: string;
  trailer_size: string | null;
  trailer_type: string | null;
  suitable_for: string | null;
  course_goal: string | null;
  origin_price: string | null;
  sell_price: string | null;
  course_status: string;
  created_at: string;
  updated_at: string;
  handouts: string[];
  category_name: string;
  teacher?: string; // 講師名稱
}

// 課程分類的類型
export interface CategoryResponse {
  status: boolean;
  message: string;
  data: {
    categories: Category[];
  };
}

export interface Category {
  id: number;
  name: string;
  created_at: string;
}
