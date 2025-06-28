// ----------更改課程狀態----------
export interface courseStatusPostData {
  course_status: string;
};
export interface courseStatusResponse {
  status: boolean;
  message: string;
  data: {
    course: {
      id: string;
      course_name: string;
    };
  };
}
// ------------------------------

export interface courseAddTitlePostData {
  course_name: string;
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

export interface courseAddCategoryPostData {
  category_id: number;
}

export interface courseAddCategoryResponse {
  status: boolean;
  message: string;
  data: {
    course: {
      id: string;
      course_name: string;
      category_id: number;
    };
  };
}

export interface courseSaveFormPostData {
  suitable_for: string;
  course_goal: string;
  course_description: string;
  course_banner_description: string;
}
// ----------API參數型別----------
interface AddTitlePayload {
  type: 'addTitle';
  payload: string;
}

interface AddCategoryPayload {
  type: 'addCategory';
  payload: {
    categoryId: number;
  };
}

export type AddChildRequestPayload = AddTitlePayload | AddCategoryPayload;

// ------------------------------

export interface handoutsResponse {
  id: string;
}
