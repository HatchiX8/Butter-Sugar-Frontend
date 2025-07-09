<template>
  <div class="video-menu h-auto w-full overflow-y-auto rounded-lg border border-white/20 p-6">
    <n-spin :show="loading">
      <n-empty
        v-if="!loading && sections.length === 0"
        description="目前此課程尚無章節內容"
        class="py-10"
      />

      <n-menu
        v-else
        :options="menuOptions"
        accordion
        v-model:expanded-keys="expandedKeys"
        @update:value="handleMenuClick"
        :indent="12"
        class="h-full bg-transparent"
      />
    </n-spin>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, h } from 'vue';
import { NSpin, NEmpty, NMenu } from 'naive-ui';
import type { MenuOption } from 'naive-ui';

const props = defineProps<{
  sections: {
    id: string;
    main_section_title: string;
    order_index: number;
    subsections: {
      id: string;
      section_id: string;
      subsection_title: string;
      order_index: number;
    }[];
  }[];
  loading: boolean;
}>();

const emit = defineEmits(['select-subsection']);

// 定義章節選單相關變數
const menuOptions = ref<MenuOption[]>([]);
const expandedKeys = ref<string[]>([]);

// 將 sections 轉換為 menu options 格式
const generateMenuOptions = () => {
  if (!props.sections || props.sections.length === 0) {
    menuOptions.value = [];
    return;
  }

  menuOptions.value = props.sections.map((section) => ({
    type: 'submenu',
    key: section.id,
    label: () => h(
      'div',
      { class: 'flex items-center text-white' },
      section.main_section_title
    ),
    children: section.subsections.map((subsection) => ({
      type: 'item',
      key: subsection.id,
      label: () => h(
        'div',
        { class: 'flex items-center gap-2 text-white' },
        [
          h('span', { class: 'font-mono' }, `${section.order_index + 1}-${subsection.order_index}`),
          h('span', {}, subsection.subsection_title)
        ]
      )
    }))
  })) as MenuOption[];

  // 如果有章節，預設展開第一個章節
  if (props.sections.length > 0) {
    expandedKeys.value = [props.sections[0].id];
  }
};

// 處理選單點擊事件
const handleMenuClick = (key: string) => {
  // 尋找點擊的是哪個子章節
  for (const section of props.sections) {
    const subsection = section.subsections.find(sub => sub.id === key);
    if (subsection) {
      emit('select-subsection', section.id, subsection.id);
      return;
    }
  }
};

// 監聽 sections 變化，重新生成選單
watch(() => props.sections, generateMenuOptions, { immediate: true, deep: true });
</script>

<style scoped>
.video-menu :deep(.n-menu-item-content--selected)::before {
  background-color: transparent !important;
}
.video-menu :deep(.n-base-icon.n-menu-item-content__arrow svg) {
  fill: yellow !important;
}
</style>
