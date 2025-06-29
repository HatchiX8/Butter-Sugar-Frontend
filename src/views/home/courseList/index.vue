<template>
  <div class="w-full md:max-w-[1280px] mx-auto px-4 flex flex-col items-start">
    <breadcrumbComps
      class="mt-30"
      :items="[
        { label: '首頁', to: '/' },
        { label: '探索課程', to: '/explore', disabled: true },
        { label: '所有課程' },
      ]"
    />

    <typography class="text-white mt-10" variant="h2" font-type="title" underline>所有課程</typography>

    <div class="mt-10 pr-8 flex flex-col md:flex-row items-center justify-between self-stretch">
      <selectComps 
        class="w-full md:w-50 h-12 px-3 py-4" 
        :default-value="selectedCategoryId" 
        :options="categoryStore.categoryOptions"
        :loading="categoryStore.loading"
        @change="handleCategoryChange" 
      />
      <sort-tab
        :items="sortItems"
        :active="currentSort"
        @update:active="handleSortChange"
      />
    </div>

    <courseCardList class="mb-15" :category-id="selectedCategoryId" :sort-type="currentSort" :page="currentPage" :page-size="pageSize" @update-total-items="updateTotalItems"/>
    <paginationComps
      v-model="currentPage"
      :total-pages="totalPages"
      :page-size="pageSize"
      :total-items="totalItems"
      @page-change="handlePageChange"
    />

    <typography class="text-white mt-10" variant="h2" font-type="title" underline>探索其他主題</typography>

    <courseTag/>
  </div>
</template>

<script setup lang="ts">
import breadcrumbComps from '@/components/layout/breadcrumbComps.vue';
import typography from '@/components/layout/typography.vue';
import selectComps from '@/components/layout/selectComps.vue';
import sortTab from './comps/sortTab.vue';
import courseCardList from './comps/courseCardList.vue';
import paginationComps from '@/components/layout/paginationComps.vue';
import courseTag from './comps/courseTag.vue';
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCategoryStore } from '@/stores/models/course/categoryStore';

const route = useRoute();
const router = useRouter();
const currentSort = ref('hot');
const currentPage = ref(1);
const pageSize = ref(12); // 每頁顯示 12 筆課程
const totalItems = ref(0); // 總課程數
const selectedCategoryId = ref<number | null>(null);
const categoryStore = useCategoryStore(); // 使用課程分類 store

// 從 store 獲取課程分類數據
const fetchCategories = async () => {
  await categoryStore.fetchCategories();
};

// 讀取 URL 參數並設置類別 ID 和頁碼
const updateParamsFromRoute = () => {
  // 處理類別 ID
  const categoryIdParam = route.query.category_id;
  if (categoryIdParam) {
    // 將字串轉換為數字
    const categoryId = parseInt(categoryIdParam as string, 10);
    if (!isNaN(categoryId)) {
      selectedCategoryId.value = categoryId;
    }
  } else {
    // 如果沒有參數，則設置為全部課程
    selectedCategoryId.value = null;
  }

  // 處理頁碼
  const pageParam = route.query.page;
  if (pageParam) {
    const page = parseInt(pageParam as string, 10);
    if (!isNaN(page) && page > 0) {
      currentPage.value = page;
    }
  }
};

// 在元件掛載時讀取 URL 參數並獲取課程分類
onMounted(() => {
  updateParamsFromRoute();
  fetchCategories();
});

// 監聽路由參數變化
watch(
  () => route.query,
  () => {
    updateParamsFromRoute();
  },
  { deep: true }
);

// 計算總頁數
const totalPages = computed(() => Math.ceil(totalItems.value / pageSize.value) || 1);

// 監聽總頁數和當前頁碼的變化，確保頁碼在有效範圍內
watch(
  [totalPages, currentPage],
  ([newTotalPages, newCurrentPage]) => {
    // 如果當前頁碼超出總頁數範圍，自動重定向到第一頁
    if (newCurrentPage > newTotalPages) {
      // 更新 URL 參數
      const query = { ...route.query };
      if (newTotalPages <= 1) {
        // 如果只有一頁，移除頁碼參數
        delete query.page;
      } else {
        // 否則設置為第一頁
        query.page = '1';
      }

      // 更新路由
      router.replace({
        path: route.path,
        query
      });

      // 更新當前頁碼
      currentPage.value = 1;
    }
  }
);

const sortItems = [
  { label: '最熱門', value: 'hot' },
  { label: '依時間', value: 'time' }
];

const handlePageChange = (page: number) => {
  currentPage.value = page;

  // 更新 URL 參數
  const query = { ...route.query, page: page.toString() };

  router.push({
    path: route.path,
    query
  });
};

const handleSortChange = (value: string) => {
  currentSort.value = value;
};

const handleCategoryChange = (categoryId: number | null) => {
  // 處理 category_id=1 的情況，這代表「所有課程」
  // 在 UI 上顯示為 category_id=1，但實際 API 請求時應該使用 null
  if (categoryId === 1) {
    selectedCategoryId.value = null;
  } else {
    selectedCategoryId.value = categoryId;
  }
  
  // 切換類別時重置為第一頁
  currentPage.value = 1;

  // 更新 URL 參數
  const query = { ...route.query };

  // 設置或移除類別 ID
  if (categoryId !== null) {
    if (categoryId === 1) {
      // 如果是「所有課程」，移除 category_id 參數
      delete query.category_id;
    } else {
      query.category_id = categoryId.toString();
    }
  } else {
    delete query.category_id;
  }

  // 移除頁碼參數，因為重置到第一頁
  delete query.page;

  router.push({
    path: route.path,
    query
  });
};

const updateTotalItems = (total: number) => {
  totalItems.value = total;
};
</script>
