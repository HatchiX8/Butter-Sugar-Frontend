import instance from '@/api/axios'

export interface CourseRatingResponse {
  id: string;
  user_id: string;
  course_id: string;
  rating_score: string;
  review_text: string;
  created_at: string;
}

export const fetchCourseRatings = async (courseId: string): Promise<CourseRatingResponse[]> => {
  const res = await instance.get<CourseRatingResponse[]>('/api/v1/course/ratings');
  // 若API未支援courseId查詢，於前端過濾
  return res.data.filter(rating => rating.course_id === courseId);
};
