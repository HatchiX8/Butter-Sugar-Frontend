<template>
  <div id="chapter-content" class="flex flex-col gap-6 w-full">
    <typography variant="h2" font-type="title" class="text-white" underline>章節內容</typography>

    <n-spin :show="loading">
      <n-collapse v-if="sections && sections.length > 0" arrow-placement="right" v-model:expanded-names="expandedNames" :accordion="false">
        <n-collapse-item
          v-for="section in sections"
          :key="section.id"
          :title="section.main_section_title"
          :name="section.id"
        >
          <div class="text-white">
            <typography
              v-for="subsection in section.subsections"
              :key="subsection.id"
              variant="paragraph-medium"
              font-type="content"
              class="text-white mb-2 px-3 py-2"
            >
              {{ `章節${section.order_index+1}-${subsection.order_index} | ${subsection.subsection_title} ${subsection.video_duration ? `(${subsection.video_duration})` : ''}` }}
            </typography>
          </div>
        </n-collapse-item>
      </n-collapse>

      <n-empty v-else-if="!loading" description="沒有課程章節資料" class="text-white mt-4" />
    </n-spin>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import typography from '@/components/layout/typography.vue';
import { NCollapse, NCollapseItem, NSpin, NEmpty } from 'naive-ui';
import { useSectionStore } from '@/stores/models/courseChapter/sectionStore';

// 獲取當前路由和章節 store
const route = useRoute();
const sectionStore = useSectionStore();

// 從 store 中獲取狀態
// 使用 storeToRefs 保持響應性
const { sections, loading} = storeToRefs(sectionStore);

// 用於追蹤展開的章節
import { ref } from 'vue';
const expandedNames = ref<string[]>([]);

// 獲取課程章節的函數
const fetchSections = (courseId: string) => {
  sectionStore.fetchByCourse(courseId);
};

// 監聽路由變化，當課程 ID 變化時重新獲取章節
watch(() => route.params.id, (newId) => {
  if (newId && typeof newId === 'string') {
    fetchSections(newId);
  }
}, { immediate: true });

// 注意：組件掛載時獲取章節的邏輯已移至 watch 中，使用 immediate:true 選項，避免重複呼叫 API
</script>

<style>
/* Using global styles to override Naive UI styles */
.n-collapse .n-collapse-item .n-collapse-item__header .n-collapse-item__header-main {
  @apply text-white bg-neutral_500 px-3 py-4;
}

.n-collapse .n-collapse-item.n-collapse-item--right-arrow-placement .n-collapse-item__header .n-collapse-item-arrow {
  @apply ml-auto;
}

.n-collapse .n-collapse-item .n-collapse-item__header .n-base-icon {
  @apply text-white;
}

.n-collapse .n-collapse-item .n-collapse-item__content-inner {
  @apply text-white;
}

.n-collapse .n-collapse-item {
  border: none !important;
}
</style>
