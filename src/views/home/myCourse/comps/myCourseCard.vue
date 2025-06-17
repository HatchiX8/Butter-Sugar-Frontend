<template>
  <a :href="link">
    <n-card
      class="w-[352px] sm:w-[280px] md:w-[280px] lg:w-[280px] h-[420px] relative bg-neutral_600 overflow-hidden"
      content-style="padding: 0;"
      :bordered="false"
    >
    <!-- 課程圖片 -->
    <div class="relative h-[302px]">
      <div
        class="absolute inset-0"
        :style="`background-image:url('${img}'); background-size: cover; background-position: center;`"
        aria-label="課程圖片"
      ></div>
      <!-- 黑色 20% 遮罩 -->
      <div class="absolute top-0 left-0 w-full h-full bg-black/20 pointer-events-none"></div>
      <!-- 標題浮在圖片上 -->
      <div class="absolute bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <h5 class="text-white text-xl font-bold leading-tight title-clamp">
          {{ title }}
        </h5>
        <div class="text-white text-xs mt-1">by {{ teacher }}</div>
      </div>
    </div>
    <!-- 卡片下半部資訊 -->
    <div class="p-4 pt-3">
      <div class="flex items-center text-neutral_200 text-sm gap-4">
        <span class="flex items-center gap-1"><starIcon /> {{ Number(rating).toFixed(1) }}</span>
        <span class="flex items-center gap-1"><timeIcon />{{ hours }}小時</span>
      </div>

      <!-- 進度條 -->
      <div class="mt-3">
        <div class="flex justify-between text-xs text-neutral_200 mb-1">
          <span class="font-medium">{{ progressStatus }}</span>
          <span class="font-medium">{{ learningProgress }}%</span>
        </div>
        <div class="w-full h-3 bg-neutral_500/30 rounded-full overflow-hidden shadow-inner">
          <div
            class="h-full rounded-full transition-all duration-500 ease-out"
            :style="`width: ${learningProgress}%; transition: width 0.8s ease-in-out; ${progressStyle}`"
          ></div>
        </div>
      </div>

      <!-- 最後學習日期 -->
      <div class="text-neutral_200 text-xs mt-2" v-if="lastStudyDate">
        最後學習日期：{{ lastStudyDate }}
      </div>
    </div>
    </n-card>
  </a>
</template>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}

a:hover {
  text-decoration: none;
}

.title-clamp {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2; /* 標準屬性，增加相容性 */
  overflow: hidden;
}
</style>

<script setup lang="ts">
import starIcon from '@/components/layout/starIcon.vue'
import timeIcon from '@/components/layout/timeIcon.vue'
import { computed } from 'vue'

const props = defineProps<{
  link?: string
  img: string
  title: string
  teacher: string
  rating: number | string
  hours: number | string
  learningProgress: number
  lastStudyDate?: string
}>()

// 根據學習進度顯示不同的狀態文字
const progressStatus = computed(() => {
  const progress = Number(props.learningProgress)
  if (progress === 0) return '開始課程'
  if (progress < 100) return '繼續學習'
  return '已完成'
})

// 根據學習進度顯示不同的進度條顏色（使用內聯樣式而非類名）
const progressStyle = computed(() => {
  const progress = Number(props.learningProgress)
  if (progress === 0) return 'background-color: var(--un-preset-mini-colors-neutral_400);'
  if (progress < 100) return 'background: linear-gradient(to right, var(--un-preset-mini-colors-green-200), var(--un-preset-mini-colors-green-300));'
  return 'background: linear-gradient(to right, var(--un-preset-mini-colors-green-500), var(--un-preset-mini-colors-green-600));'
})
</script>
