// 收藏課程相關API型別

// 後端回傳的型別
export interface FavoriteCoursesResponse<T> {
  status: boolean;
  message: string;
  data: T[];
}

// 收藏課程基本資料型別
export interface FavoriteCourseInfo {
  // 必須欄位
  id: string;
  course_id: string;
  
  // 可能是臨時收藏項目的欄位
  created_at?: string;
  updated_at?: string;
  
  // 課程資料欄位，臨時項目可能不具備
  teacher_name?: string;
  course_name?: string;
  course_banner_imageurl?: string;
  course_banner_description?: string;
  course_small_imageurl?: string;
  course_description?: string;
  course_description_imageurl?: string;
  course_hours?: string | null;
  origin_price?: number;
  sell_price?: number;
  total_users?: number;
  trailer_url?: string;
  suitable_for?: string;
  course_goal?: string;
  course_ratings?: {
    rating_score: string;
    avg_rating_score: {
      avg_rating_score: string;
      course_rating_users: string;
    };
  };
}

// 用於臨時收藏項目的簡化型別
export type TempFavoriteCourseInfo = Pick<FavoriteCourseInfo, 'id' | 'course_id' | 'created_at' | 'updated_at'>
