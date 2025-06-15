<template>
  <a :href="link">
    <n-card
      class="w-[352px] sm:w-[280px] md:w-[280px] lg:w-[280px] h-[382px] relative bg-neutral_600 overflow-hidden"
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
        <span class="flex items-center gap-1"><groupIcon />{{ students }}人</span>
        <span class="flex items-center gap-1"><timeIcon />{{ hours }}小時</span>
      </div>
      <div class="flex items-end gap-2 mt-2">
        <span class="text-white text-base font-bold">NT$ {{ price.toLocaleString() }}</span>
        <span v-if="originPrice" class="text-neutral_200 text-sm line-through">NT$ {{ originPrice.toLocaleString() }}</span>
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
  overflow: hidden;
}
</style>

<script setup lang="ts">
import starIcon from '@/components/layout/starIcon.vue'
import groupIcon from '@/components/layout/groupIcon.vue'
import timeIcon from '@/components/layout/timeIcon.vue'

defineProps<{
  link?: string
  img: string
  title: string
  teacher: string
  rating: number | string
  students: number | string
  hours: number | string
  price: number
  originPrice?: number
}>()
</script>
