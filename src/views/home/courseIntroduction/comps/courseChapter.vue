<template>
  <div class="flex flex-col gap-6 w-full">
    <typography variant="h2" font-type="title" class="text-white" underline>章節內容</typography>

    <div class="chapter-content">
      <n-collapse arrow-placement="right">
        <n-collapse-item title="章節一：課前準備與講義下載" name="1" class="px-3 py-4">
          <router-link to="/">
            <typography variant="paragraph-medium" font-type="content" class="text-white mb-2 px-3 py-2">1-1 | 歐式麵包風格概論：從長棍到拖鞋麵包 (5:12)</typography>
          </router-link>
        </n-collapse-item>
        <n-collapse-item title="章節二：理解歐式麵包與高水量麵糰的基礎理論" name="2" class="px-3 py-4">
          <div class="text-white">
            <router-link to="/">
              <typography variant="paragraph-medium" font-type="content" class="text-white mb-2 px-3 py-2">1-1 | 歐式麵包風格概論：從長棍到拖鞋麵包 (5:12)</typography>
            </router-link>
            <router-link to="/">
              <typography variant="paragraph-medium" font-type="content" class="text-white mb-2 px-3 py-2">1-2 | 何謂高水量麵糰？水量比例與操作差異解析 (12:37)</typography>
            </router-link>
            <router-link to="/">
              <typography variant="paragraph-medium" font-type="content" class="text-white mb-2 px-3 py-2">1-3 | 麵粉與酵母的選擇對最終麵包的影響 (3:23)</typography>
            </router-link>
            <router-link to="/">
              <typography variant="paragraph-medium" font-type="content" class="text-white mb-2 px-3 py-2">1-4 | 基本麵筋結構與延展性理論 (8:11)</typography>
            </router-link>
            <router-link to="/">
              <typography variant="paragraph-medium" font-type="content" class="text-white mb-2 px-3 py-2">1-5 | 如何閱讀麵糰狀態（觀察黏性、溫度、氣泡）(2:53)</typography>
            </router-link>
          </div>
        </n-collapse-item>
        <n-collapse-item title="章節三：發酵過程全解析（時間 × 酵母 × 環境）" name="3" class="px-3 py-4">
          <router-link to="/">
            <typography variant="paragraph-medium" font-type="content" class="text-white mb-2 px-3 py-2">1-1 | 歐式麵包風格概論：從長棍到拖鞋麵包 (5:12)</typography>
          </router-link>
        </n-collapse-item>
        <n-collapse-item title="章節四：經典高水量歐式麵包實作教學" name="4" class="px-3 py-4">
          <router-link to="/">
            <typography variant="paragraph-medium" font-type="content" class="text-white mb-2 px-3 py-2">1-1 | 歐式麵包風格概論：從長棍到拖鞋麵包 (5:12)</typography>
          </router-link>
        </n-collapse-item>
        <n-collapse-item title="章節五：進階實作與個人風格開發" name="5" class="px-3 py-4">
          <router-link to="/">
            <typography variant="paragraph-medium" font-type="content" class="text-white mb-2 px-3 py-2">1-1 | 歐式麵包風格概論：從長棍到拖鞋麵包 (5:12)</typography>
          </router-link>
        </n-collapse-item>
      </n-collapse>
    </div>
  </div>
</template>

<script setup lang="ts">
import typography from '@/components/layout/typography.vue';
import {NCollapse,NCollapseItem} from 'naive-ui';
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
</style>
