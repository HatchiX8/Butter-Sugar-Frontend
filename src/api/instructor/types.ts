export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data?: T | null;
};

export interface InstructorDataModel {
  teacher: Teacher;
  course: Course[];
}

export interface Teacher {
  teacher_id: string;
  user_id: string;
  name: string;
  profile_image_url: string;
  rating_score: string;
  rating_users: string;
  slogan: string;
  description: string;
  specialization: string;
};

export interface Course {
  id: string;
  course_name: string;
  course_hours: number | null;
  course_small_imageUrl: string;
  total_users: number;
  origin_price: number;
  sell_price: number;
  course_ratings: CourseRating;
};

export interface CourseRating {
  avg_rating_score: string;
  course_rating_users: string;
}

export interface TeacherProfile {
  name: string;
  nickname: string;
  phone: string;
  birthday: string | null | number; // 兼容 n-date-picker 的值（timestamp）和 null
  address: string;
  profile_image_url: string;
  bank_name: string;
  bank_account: string;
  slogan: string;
  description: string;
  specialization: string;
}

export interface TeacherCourse {
  course_id: string;
  course_status: string;
  teacher_id: string;
  teacher_name: string;
  course_name: string;
}
