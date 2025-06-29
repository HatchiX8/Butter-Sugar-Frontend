// 課程章節的類型定義
export interface Section {
  id: string;
  course_id: string; // API 回傳使用 snake_case
  order_index: number; // 章節順序
  main_section_title: string; // 章節標題
  created_at: string;
  updated_at: string;
  subsections: Subsection[]; // 子章節
}

export interface Subsection {
  id: string;
  section_id: string;
  order_index: number; // 子章節順序
  subsection_title: string; // 子章節標題
  video_file_url: string | null;
  video_duration: string | null;
  uploaded_at: string | null;
  status: string; // 如 'processing'
  is_preview_available: boolean;
  created_at: string;
  updated_at: string;
}

export interface SectionResponse {
  status: boolean;
  message: string;
  data: {
    sections: Section[];
  } | Section[] | null;
}
