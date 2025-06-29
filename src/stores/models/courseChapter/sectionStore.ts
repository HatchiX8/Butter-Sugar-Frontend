import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getCourseSections } from '@/views/home/courseIntroduction/api';
import type { Section } from '@/views/home/courseIntroduction/api/type';

export const useSectionStore = defineStore('sectionStore', () => {
  // 狀態
  const sections = ref<Section[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const currentCourseId = ref<string | null>(null);

  // 根據課程 ID 獲取章節列表
  const fetchByCourse = async (courseId: string) => {
    // 如果正在加載相同的課程，則不重複請求
    if (loading.value && currentCourseId.value === courseId) return;

    loading.value = true;
    error.value = null;
    currentCourseId.value = courseId;
    sections.value = []; // 預設為空陣列，避免使用舊資料

    try {
      const response = await getCourseSections(courseId);

      // 確保 response 和 response.data 存在再訪問 sections
      if (response && response.data) {
        // 根據回應數據結構的多種可能情況進行处理
        let sectionData: Section[] | undefined;
        
        // 定義明確的回應數據結構類型
        interface ResponseDataWithSections {
          sections?: Section[];
          data?: {
            sections?: Section[];
          };
        }
        
        const responseData = response.data as ResponseDataWithSections;

        // 情況 1: 回應包含 data.sections 結構
        if (responseData.data && Array.isArray(responseData.data.sections)) {
          sectionData = responseData.data.sections;
        }
        // 情況 2: 回應直接在 data 屬性下包含 sections
        else if (responseData.sections && Array.isArray(responseData.sections)) {
          sectionData = responseData.sections;
        }
        // 情況 3: data 本身就是一個章節數組
        else if (Array.isArray(responseData) && responseData.length > 0 && 'main_section_title' in responseData[0]) {
          sectionData = responseData as unknown as Section[];
        }

        if (sectionData) {
          sections.value = sectionData;
        } else {
          error.value = 'API 回傳的資料結構不符合預期, 無法解析章節資料';
        }
      } else {
        error.value = 'API 回傳的資料結構不符合預期 (無資料欄位)';
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : '獲取課程章節時發生錯誤';
    } finally {
      loading.value = false;
    }
  };

  // 清空章節列表
  const clearSections = () => {
    sections.value = [];
    currentCourseId.value = null;
  };

  return {
    sections,
    loading,
    error,
    currentCourseId,
    fetchByCourse,
    clearSections
  };
});
