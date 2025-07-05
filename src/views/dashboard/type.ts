// ----------更改課程狀態----------
export interface courseStatusPostData {
  course_status: string;
}
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

// ----------新增標題API參數型別----------
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
// ------------------------------

// ----------章節API型別----------
// 新增章節
export interface categoryAddChapterPostData {
  main_section_title: string;
}

export interface categoryAddChapterResponse {
  status: boolean;
  message: string;
  data: {
    id: string;
    main_section_title: string;
  };
}

export interface categoryGetChapterResponse {
  status: boolean;
  message: string;
  data: ChapterResponseSection[];
}

interface ChapterResponseSection {
  id: string;
  main_section_title: string;
  order_index: number;
  subsections: ChapterResponseSubsections[];
}

interface ChapterResponseSubsections {
  id: string;
  section_id: string;
  order_index: number;
  subsection_title: string;
  is_preview_available: boolean;
  video_file_url?: string;
  video_duration?: number;
}

// 取得指定章節的小節
export interface categoryGetSubsectionResponse {
  status: boolean;
  message: string;
  data: ChapterResponseSubsections[];
}

// 修改章節小節
export interface changeChaptersSubsectionsPostData {
  id: string;
  main_section_title: string;
  order_index: number;
  subsections: Subsection[];
}
interface Subsection {
  id: string;
  section_id: string;
  order_index: number;
  subsection_title: string;
  is_preview_available: boolean;
}
export interface changeChaptersSubsectionsResponse {
  status: boolean;
  message: string;
  data: ChaptersSubsectionsResponse[];
}
interface ChaptersSubsectionsResponse {
  id: string;
  main_section_title: string;
  order_index: number;
  subsections: Subsection[];
}
// ------------------------------

// ----------小節API型別----------
// 新增小節
export interface categoryAddSubsectionsPostData {
  subsection_title: string;
  is_preview_available: boolean;
}

export interface categoryAddSubsectionsResponse {
  status: boolean;
  message: string;
  data: ChapterResponseSubsections;
}
// ------------------------------
