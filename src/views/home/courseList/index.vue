<template>
  <div class="w-full max-w-[1280px] mx-auto px-4 flex flex-col items-start">
    <breadcrumbComps
      class="mt-30"
      :items="[
        { label: '首頁', to: '/' },
        { label: '探索課程', to: '/explore' },
        { label: '所有課程' },
      ]"
    />

    <typography class="text-white mt-10" variant="h2" font-type="title" underline>所有課程</typography>

    <div class="mt-10 pr-8 flex flex-col md:flex-row items-center justify-between self-stretch">
      <selectComps class="w-full md:w-50 h-12 px-3 py-4" :default-value="selectedCategoryId" @change="handleCategoryChange" />
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
import { useRoute } from 'vue-router';

const route = useRoute();
const currentSort = ref('hot');
const currentPage = ref(1);
const pageSize = ref(12); // 每頁顯示 12 筆課程
const totalItems = ref(0); // 總課程數
const selectedCategoryId = ref<number | null>(null);

// 讀取 URL 參數並設置類別 ID
const updateCategoryFromRoute = () => {
  const categoryIdParam = route.query.category_id;
  if (categoryIdParam) {
    // 將字串轉換為數字
    const categoryId = parseInt(categoryIdParam as string, 10);
    if (!isNaN(categoryId)) {
      selectedCategoryId.value = categoryId;
      // 重置為第一頁
      currentPage.value = 1;
    }
  } else {
    // 如果沒有參數，則設置為全部課程
    selectedCategoryId.value = null;
  }
};

// 在元件掛載時讀取 URL 參數
onMounted(() => {
  updateCategoryFromRoute();
});

// 監聽路由參數變化
watch(
  () => route.query.category_id,
  () => {
    updateCategoryFromRoute();
  }
);

// 計算總頁數
const totalPages = computed(() => Math.ceil(totalItems.value / pageSize.value) || 1);

const sortItems = [
  { label: '最熱門', value: 'hot' },
  { label: '依時間', value: 'time' }
];

const handlePageChange = (page: number) => {
  currentPage.value = page;
};

const handleSortChange = (value: string) => {
  currentSort.value = value;
};

const handleCategoryChange = (categoryId: number | null) => {
  selectedCategoryId.value = categoryId;
  // 切換類別時重置為第一頁
  currentPage.value = 1;
};

const updateTotalItems = (total: number) => {
  totalItems.value = total;
};
</script>
