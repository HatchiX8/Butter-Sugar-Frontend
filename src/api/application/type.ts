export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data?: T | null;
};

export interface Application {
  course_name: string;
  course_description: string;
}

