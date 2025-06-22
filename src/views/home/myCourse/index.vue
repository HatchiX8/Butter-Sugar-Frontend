<template>
  <div class="w-full md:max-w-[1280px] mx-auto flex flex-col items-start">
    <div class="w-full">
      <breadcrumbComps
        class="mt-30 px-4"
        :items="[
          { label: '首頁', to: '/' },
          { label: '我的課程' },
        ]"
      />

      <typography class="text-white mt-10 px-4" variant="h2" font-type="title" underline>我的課程</typography>

      <div class="mt-10 px-4 flex flex-col md:flex-row items-center md:justify-between">
        <!-- 篩選下拉選單 -->
        <n-select
          class="w-full max-w-[350px] md:w-50 h-12 py-4"
          v-model:value="currentFilter"
          :options="filterOptions"
          placeholder="所有課程"
          @update:value="handleFilterChange"
        />

        <!-- 搜尋框 -->
        <div class="w-full max-w-[350px] mb-6 md:w-80 md:my-0 relative">
          <n-input
            v-model:value="searchKeyword"
            placeholder="搜尋課程"
            class="h-12 flex items-center"
          >
            <template #suffix>
              <n-button text @click="handleSearch">
                <template #icon>
                  <n-icon>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </n-icon>
                </template>
              </n-button>
            </template>
          </n-input>
        </div>
      </div>
    </div>
    <!-- 課程列表 -->
    <div class="w-full">
      <my-course-card-list
        class="mb-15 mt-6"
        :filter-type="currentFilter"
        :search-keyword="searchKeyword"
        @update-total-items="updateTotalItems"
      />
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import breadcrumbComps from '@/components/layout/breadcrumbComps.vue';
import typography from '@/components/layout/typography.vue';
import { NSelect, NInput, NButton, NIcon } from 'naive-ui';
import MyCourseCardList from './comps/myCourseCardList.vue';

// 篩選選項
const filterOptions = [
  { label: '所有課程', value: 'all' },
  { label: '尚未開始', value: 'notStarted' },
  { label: '進行中', value: 'inProgress' },
  { label: '已完成', value: 'completed' }
];

// 狀態
const currentFilter = ref('all');
const searchKeyword = ref('');
const totalItems = ref(0);

// 處理篩選變更
const handleFilterChange = (value: string) => {
  currentFilter.value = value;
};

// 處理搜尋
const handleSearch = () => {
  // 搜尋功能已經在 myCourseCardList 中實作，這裡不需要額外處理
  // 如果需要在搜尋時重置其他狀態，可以在這裡處理
};

// 更新總課程數
const updateTotalItems = (total: number) => {
  totalItems.value = total;
};
</script>
