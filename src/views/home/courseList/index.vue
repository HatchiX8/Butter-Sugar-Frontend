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
      <selectComps class="w-full md:w-50 h-12 px-3 py-4" @change="handleCategoryChange" />
      <sort-tab
        :items="sortItems"
        v-model:active="currentSort"
        @change="handleSortChange"
      />
    </div>

    <courseCardList class="mb-15" :category-id="selectedCategoryId" :sort-type="currentSort"/>
    <paginationComps
      v-model="currentPage"
      :total-pages="totalPages"
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
import { ref } from 'vue';

const currentSort = ref('hot');
const currentPage = ref(1);
const totalPages = ref(10);
const selectedCategoryId = ref<number | null>(null);

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
};
</script>
