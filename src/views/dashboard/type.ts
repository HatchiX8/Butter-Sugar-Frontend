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

// ----------取得單一課程資料----------
export interface courseDetailResponse {
  status: boolean;
  message: string;
  data: {
    course: courseDetail;
  };
}
export interface courseDetail {
  id: string;
  teacher_id: string;
  category_id: string;
  course_banner_imageUrl: string;
  course_name: string;
  course_banner_description: string;
  course_description: string;
  course_description_imageUrl: string;
  course_hours: string;
  course_small_imageUrl: string;
  total_users: string;
  trailer_name: string;
  trailer_url: string;
  trailer_status: string;
  trailer_size: string;
  trailer_type: string;
  suitable_for: string;
  course_goal: string;
  origin_price: string;
  sell_price: string;
  course_status: string;
  created_at: string;
  updated_at: string;
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

// ----------取得課程講義----------
export interface handoutsResponse {
  id: string;
  course_id: string;
  name: string;
  url: string;
  size: string;
  type: string;
  created_at: string;
  updated_at: string;
}
// ------------------------------

// ----------課程價格----------
export interface coursePricePostData {
  origin_price: number;
  sell_price: number;
}
export interface coursePriceResponse {
  status: boolean;
  message: string;
  data: {
    course: {
      id: string;
      course_name: string;
      origin_price: number;
      sell_price: number;
    };
  };
}
// ------------------------------
