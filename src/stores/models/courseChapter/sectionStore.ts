import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getCourseSections } from '@/views/home/courseIntroduction/api';
import type { Section, SectionResponse } from '@/views/home/courseIntroduction/api/type';

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

    console.log('開始獲取課程章節，課程 ID:', courseId);
    loading.value = true;
    error.value = null;
    currentCourseId.value = courseId;
    sections.value = []; // 預設為空陣列，避免使用舊資料

    try {
      console.log('調用 API:', `/api/v1/section/course/${courseId}`);
      const response = await getCourseSections(courseId);
      console.log('API 回應:', response);

      // 確保 response 和 response.data 存在再訪問 sections
      if (response && response.data) {
        console.log('回應資料:', JSON.stringify(response.data, null, 2));
        
        // 直接在 console 中顯示完整回應結構
        console.log('回應屬性名稱:', Object.keys(response.data));
        
        // 根據回應數據結構的多種可能情況進行处理
        let sectionData: Section[] | undefined;
        const responseData = response.data as any; // 使用 any 暫時躲過型別檢查以處理不確定的 API 結構
        
        // 情況 1: 回應包含 data.sections 結構
        if (responseData.data && Array.isArray(responseData.data.sections)) {
          console.log('從 response.data.data.sections 取得章節資料');
          sectionData = responseData.data.sections;
        }
        // 情況 2: 回應直接在 data 屬性下包含 sections
        else if (responseData.sections && Array.isArray(responseData.sections)) {
          console.log('從 response.data.sections 取得章節資料');
          sectionData = responseData.sections;
        }
        // 情況 3: data 本身就是一個章節數組
        else if (Array.isArray(responseData) && responseData.length > 0 && responseData[0].main_section_title) {
          console.log('從 response.data 直接取得章節資料');
          sectionData = responseData;
        }
        
        if (sectionData) {
          console.log('章節資料陣列:', JSON.stringify(sectionData, null, 2));
          console.log('章節數量:', sectionData.length);
          sections.value = sectionData;
          console.log('設置後的章節數量:', sections.value.length);
          console.log('第一個章節的內容:', sections.value[0] ? JSON.stringify(sections.value[0], null, 2) : '無章節');
        } else {
          console.warn('無法從 API 回應中取得章節資料:', JSON.stringify(response.data, null, 2));
          error.value = 'API 回傳的資料結構不符合預期, 無法解析章節資料';
        }
      } else {
        console.warn('API 回應缺少資料欄位:', response);
        error.value = 'API 回傳的資料結構不符合預期 (無資料欄位)';
      }
    } catch (err) {
      console.error('獲取課程章節發生錯誤:', err);
      error.value = err instanceof Error ? err.message : '獲取課程章節時發生錯誤';
    } finally {
      console.log('章節載入完成，當前章節數:', sections.value.length);
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
