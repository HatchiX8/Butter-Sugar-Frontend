<template>
  <div class="w-full max-w-[1280px] mx-auto px-4 flex flex-col items-start">
    <breadcrumbComps
      :items="[
        { label: '首頁', to: '/' },
        { label: '探索課程', to: '/explore' },
        { label: '所有課程' },
      ]"
    />

    <h1 class="text-8 font-not-italic font-700 lh-9.6 tracking-0.32 mt-25 text-center text-white">
      所有課程
    </h1>
    <span class="w-18 h-0.25 bg-primaryDefault mt-19px"></span>

    <div class="mt-10 pr-8 flex flex-col md:flex-row items-center justify-between self-stretch">
      <selectComps class="w-full md:w-50 h-12 px-3 py-4" />
      <sort-tab
        :items="sortItems"
        v-model:active="currentSort"
        @change="handleSortChange"
      />
    </div>

    <courseCardList class="mb-15"/>
    <paginationComps
      v-model="currentPage"
      :total-pages="totalPages"
      @page-change="handlePageChange"
    />

    <h1 class="text-8 font-not-italic font-700 lh-9.6 tracking-0.32 mt-25 text-center text-white">
      探索其他主題
    </h1>
    <span class="w-18 h-0.25 bg-primaryDefault mt-19px"></span>

    <courseTag/>
  </div>
</template>

<script setup lang="ts">
import breadcrumbComps from '@/components/layout/breadcrumbComps.vue';
import selectComps from '@/components/layout/selectComps.vue';
import sortTab from './comps/sortTab.vue';
import courseCardList from './comps/courseCardList.vue';
import paginationComps from '@/components/layout/paginationComps.vue';
import courseTag from './courseTag.vue';
import { ref } from 'vue';

const currentSort = ref('hot');
const currentPage = ref(1);
const totalPages = ref(10);

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
</script>
