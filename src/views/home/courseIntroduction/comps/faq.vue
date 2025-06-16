<template>
  <div id="faq-section" class="flex flex-col gap-6 w-full">
    <typography variant="h2" font-type="title" class="text-white" underline>常見問題</typography>

      <n-collapse arrow-placement="right">
        <n-collapse-item title="課程是線上還是實體上課？" name="1">
          <typography variant="paragraph-medium" font-type="content" class="text-white mb-2 px-3 py-2">Butter&Sugar所有課程皆為線上影音課程，讓您可以不限時間、地點，隨時進入烘焙的美好世界。</typography>
        </n-collapse-item>
        <n-collapse-item title="沒有烘焙經驗也可以上課嗎？" name="2">
          <typography variant="paragraph-medium" font-type="content" class="text-white mb-2 px-3 py-2">是的，我們的課程設計以零基础烘焙愛好者為主，即使您是烘焙新手，也能在專業老師的引導下，逐步掌握烘焙技巧，享受烘焙帶來的樂趣。</typography>
        </n-collapse-item>
        <n-collapse-item title="課程可以重複觀看嗎？" name="3">
          <typography variant="paragraph-medium" font-type="content" class="text-white mb-2 px-3 py-2">是的，我們的課程提供無限次重複觀看，讓您可以在任何時間、任何地點，隨時回顧課程內容，深化學習效果。</typography>
        </n-collapse-item>
      </n-collapse>
  </div>
</template>

<script setup lang="ts">
import typography from '@/components/layout/typography.vue';
import {NCollapse,NCollapseItem} from 'naive-ui';
</script>

<style>
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
