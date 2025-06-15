export interface courseAddTitlePostData {
  course_name: string;
}

export interface courseAddCategoryPostData {
  category_id: number;
}

export interface courseAddTitleResponse {
  status: boolean;
  message: string;
  data: {
    course: {
      id: string;
      course_name: string;
    };
  };
}

// ----------API參數型別----------
export type AddChildRequestPayload =
  | { type: 'addTitle'; payload: string }
  | { type: 'addCategory'; payload: number };
// ------------------------------
