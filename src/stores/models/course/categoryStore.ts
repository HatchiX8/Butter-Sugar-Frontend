import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getCourseCategories } from '@/views/home/courseList/api';
import type { Category } from '@/views/home/courseList/api/type';

// 定義課程分類的 Store
export const useCategoryStore = defineStore('categoryStore', () => {
  // 狀態
  const categories = ref<Category[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const initialized = ref<boolean>(false);

  // 將後端數據轉換為 select 需要的格式
  const categoryOptions = ref<{ label: string; value: number | null }[]>([]);

  // 獲取課程分類
  const fetchCategories = async () => {
    // 如果已經初始化且有資料，則不重複請求
    if (initialized.value && categories.value.length > 0) {
      return categories.value;
    }

    loading.value = true;
    error.value = null;

    try {
      const result = await getCourseCategories();
      categories.value = result;

      // 將後端數據轉換為 selectComps 需要的格式
      categoryOptions.value = [
        // { label: '所有課程', value: null },
        ...result.map((category: Category) => ({
          label: category.name,
          value: category.id
        }))
      ];

      initialized.value = true;
      return result;
    } catch (err) {
      error.value = err instanceof Error ? err.message : '獲取課程分類時發生錯誤';
      return [];
    } finally {
      loading.value = false;
    }
  };

  // 清空分類資料
  const clearCategories = () => {
    categories.value = [];
    categoryOptions.value = [{ label: '所有課程', value: null }];
    initialized.value = false;
  };

  // 取得所有分類選項 (適用於下拉選單)
  const getCategoryOptions = () => categoryOptions.value;

  return {
    categories,
    categoryOptions,
    loading,
    error,
    initialized,
    fetchCategories,
    clearCategories,
    getCategoryOptions
  };
});
