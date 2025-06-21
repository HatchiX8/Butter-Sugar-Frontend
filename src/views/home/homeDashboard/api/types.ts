export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data?: T | null;
};

export interface PopularCourse {
  course_id: string;
  course_rating_score: number;
  course_total_users: number;
  course_image_url: string;
  course_name: string;
  course_description: string;
}

export interface TeacherFeatured {
  course_id: string;
  course_name: string;
  created_at: string;
  teacher_id: string;
  teacher_rating_score: number;
  teacher_specialization: string;
  teacher_slogan: string;
  teacher_name: string;
  teacher_image_url: string;
}
