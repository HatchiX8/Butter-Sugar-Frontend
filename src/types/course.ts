// 課程相關型別定義

// 教師介面
export interface Teacher {
  nickname: string;
  name?: string;
}

// 課程資料介面 (API 回傳格式)
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
  teacher?: Teacher | string; // 教師資訊可能是物件或字串
}

// 前端組件使用的課程資料格式
export interface CourseData {
  link: string;
  id: number;
  uuid: string; // 課程唯一識別碼，用於收藏功能
  img: string;
  title: string;
  teacher: string;
  teacher_id: string; // 教師 ID，用於獲取教師詳細資料
  description: string;
  rating: number;
  students: number;
  hours: number;
  price: number;
  originPrice: number;
  is_bookmark: boolean;
  created_at: string;
  course_description: string | null;
  suitable_for: string | null;
  course_goal: string | null;
  course_description_imageUrl: string | null;
  course_small_imageUrl: string | null;
}
