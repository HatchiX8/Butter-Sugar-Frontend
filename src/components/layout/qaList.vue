<template>
  <div class="qa-list-container">
    <!-- 問答列表 -->
    <div class="gap-6">
      <div 
        v-for="(qa, index) in displayedQaList" 
        :key="index" 
        class="gap-4 border-1 border-solid border-white/20 p-6 bg-neutral_400 mb-6"
      >
        <!-- 問題 -->
        <div class="flex items-center" :class="qa.answer ? 'mb-4' : ''">
          <div class="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center me-2">
            <img
              v-if="qa.user.avatar"
              :src="qa.user.avatar"
              class="w-full h-full"
              style="object-fit: cover; object-position: center;"
              alt="用戶頭像"
            />
            <div v-else class="i-ion:person-circle-outline text-primary-light w-full h-full"></div>
          </div>

          <div class="flex flex-col">
            <div class="flex items-center gap-2 mb-2">
              <typography variant="h6" font-type="title" class="text-white">{{ qa.user.name }}</typography>
              <typography variant="paragraph-regular" font-type="content" class="text-neutral-200">{{ qa.user.date }}</typography>
            </div>
            <typography variant="paragraph-regular" font-type="content" class="text-neutral-100">{{ qa.question }}</typography>
          </div>
        </div>

        <!-- 有回答的情況（單人或多人） -->
        <template v-if="qa.answer">
          <!-- 單人回答狀態 -->
          <div class="flex flex-col bg-neutral_500 p-3" v-if="!Array.isArray(qa.answer)">
            <div class="flex items-center gap-2 mb-2">
              <typography variant="h6" font-type="title" class="text-white">{{ qa.answer.name }}</typography>
              <typography variant="paragraph-regular" font-type="content" class="text-neutral-200">{{ qa.answer.date }}</typography>
              <n-button round ghost size="small" v-if="qa.answer.role">
                <typography variant="paragraph-medium" font-type="content" class="text-primaryDefault">{{ qa.answer.role }}</typography>
              </n-button>
            </div>
            <typography variant="paragraph-regular" font-type="content" class="text-neutral-100">{{ qa.answer.content }}</typography>
          </div>

          <!-- 多人來回問答狀態 -->
          <div v-else>
            <div 
              v-for="(reply, replyIndex) in qa.answer as any[]" 
              :key="replyIndex" 
              class="flex flex-col bg-neutral_500 p-3 mb-2 last:mb-0"
            >
              <div class="flex items-center gap-2 mb-2">
                <typography variant="h6" font-type="title" class="text-white">{{ reply.name }}</typography>
                <typography variant="paragraph-regular" font-type="content" class="text-neutral-200">{{ reply.date }}</typography>
                <n-button round ghost size="small" v-if="reply.role">
                  <typography variant="paragraph-medium" font-type="content" class="text-primaryDefault">{{ reply.role }}</typography>
                </n-button>
              </div>
              <typography variant="paragraph-regular" font-type="content" class="text-neutral-100">{{ reply.content }}</typography>
            </div>
          </div>
        </template>
      </div>

      <!-- 分頁控制區 -->
      <div class="flex justify-between items-center">
        <!-- 顯示所有問答按鈕 - 只在留言數量大於預設每頁顯示數量時才顯示 -->
        <template v-if="qaList.length > defaultPageSize">
          <n-button size="large" class="px-4 py-6" v-if="!showAllQa" @click="toggleShowAllQa">
            <div class="flex items-center gap-1">
              <div class="i-ion:chevron-down-outline text-xl"></div>
              <typography variant="paragraph-medium" font-type="content">顯示所有問答</typography>
            </div>
          </n-button>
          <n-button size="large" class="px-4 py-6" v-else @click="toggleShowAllQa">
            <div class="flex items-center gap-1">
              <div class="i-ion:chevron-up-outline text-xl"></div>
              <typography variant="paragraph-medium" font-type="content">收合問答</typography>
            </div>
          </n-button>
        </template>
        <div v-else></div> <!-- 當留言數量小於等於預設每頁顯示數量時，保持左側空白以維持佈局 -->

        <!-- 分頁 - 只在顯示所有問答且總頁數大於1時才顯示 -->
        <n-pagination
          v-if="showAllQa && totalPages > 1"
          class="custom-pagination"
          v-model:page="currentPage"
          :page-count="totalPages"
          :page-size="expandedPageSize"
          :item-count="qaList.length"
        />
        <div v-else></div> <!-- 當總頁數不超過1頁時，保持右側空白以維持佈局 -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from 'vue';
import { NButton, NPagination } from 'naive-ui';
import typography from '@/components/layout/typography.vue';

// 定義問答類型
interface User {
  name: string;
  date: string;
  avatar?: string;
}

interface Answer {
  name: string;
  date: string;
  role?: string;
  content: string;
}

interface QA {
  user: User;
  question: string;
  answer?: Answer | Answer[];
}

// 定義 props
const props = defineProps<{
  qaList: QA[];
  defaultPageSize?: number;
  expandedPageSize?: number;
  initialShowAll?: boolean;
}>();

// 定義事件
const emit = defineEmits(['update:showAll']);

// 分頁相關狀態
const showAllQa = ref(props.initialShowAll || false); // 控制顯示全部問答還是預設數量
const currentPage = ref(1); // 目前頁碼
const defaultPageSize = props.defaultPageSize || 5; // 預設每頁顯示 5 筆
const expandedPageSize = props.expandedPageSize || 10; // 展開後每頁顯示 10 筆
// 注意：我們不再需要 pageSize 變數，因為分頁元件直接使用 expandedPageSize

// 計算屬性
// 總頁數 - 始終以 expandedPageSize 為基準計算，確保收合和展開時頁數一致
const totalPages = computed(() => Math.ceil(props.qaList.length / expandedPageSize));

// 當前頁面顯示的問答列表
const displayedQaList = computed(() => {
  // 計算展開狀態下當前頁面的起始索引
  const expandedStart = (currentPage.value - 1) * expandedPageSize;
  
  // 當前頁面的結束索引
  const expandedEnd = Math.min(expandedStart + expandedPageSize, props.qaList.length);
  
  // 當前頁面的問答列表
  const currentPageItems = props.qaList.slice(expandedStart, expandedEnd);
  
  // 根據顯示模式決定返回的內容
  if (showAllQa.value) {
    // 展開狀態：顯示全部當前頁面的內容
    return currentPageItems;
  } else {
    // 收合狀態：只顯示當前頁面的前 defaultPageSize 個項目
    return currentPageItems.slice(0, defaultPageSize);
  }
});

// 切換顯示所有問答/收合問答
const toggleShowAllQa = () => {
  showAllQa.value = !showAllQa.value;
  // 不再重置頁碼，保持當前頁面
  emit('update:showAll', showAllQa.value);
};
</script>

<style scoped>
:deep(.custom-pagination) {
  @apply bg-neutral_600;
}

:deep(.custom-pagination .n-pagination-item) {
  @apply w-10 h-10 mx-1 rounded-lg text-sm font-medium text-white border border-white bg-neutral_500 transition-all duration-200;
}

:deep(.custom-pagination .n-pagination-item:not(.n-pagination-item--disabled):hover),
:deep(.custom-pagination .n-pagination-item.n-pagination-item--hover) {
  @apply border-primaryDefault text-primaryDefault bg-neutral_500;
}

:deep(.custom-pagination .n-pagination-item.n-pagination-item--active) {
  @apply bg-primaryDefault text-white border-primaryDefault;
}

:deep(.custom-pagination .n-pagination-item.n-pagination-item--button:first-child),
:deep(.custom-pagination .n-pagination-item.n-pagination-item--button:last-child) {
  @apply bg-neutral_600 text-white border-none;
}

:deep(.custom-pagination .n-pagination-item.n-pagination-item--button.n-pagination-item--disabled) {
  @apply bg-neutral_600 text-neutral_300;
}
</style>
