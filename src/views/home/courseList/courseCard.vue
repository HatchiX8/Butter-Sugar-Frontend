<template>
  <!-- TODO: 未完成 -->
  <n-card
    class="w-[302px] h-[302px] relative overflow-hidden bg-[#2A2117] rounded-xl"
    content-style="padding: 0;"
    hoverable
  >
    <!-- 課程圖片 -->
    <div class="relative h-[180px]">
      <div
        class="absolute inset-0"
        :style="`background-image:url('${img}'); background-size: cover; background-position: center;`"
        aria-label="課程圖片"
      ></div>
      <!-- 黑色 20% 遮罩 -->
      <div class="absolute top-0 left-0 w-full h-full bg-black/20 pointer-events-none"></div>
      <!-- 標題浮在圖片上 -->
      <div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
        <h5 class="text-white text-xl font-bold leading-tight">
          {{ title }}
        </h5>
        <div class="text-white text-xs mt-1">by {{ teacher }}</div>
      </div>
    </div>
    <!-- 卡片下半部資訊 -->
    <div class="p-4 pt-3">
      <div class="flex items-center text-[#FFD700] text-sm gap-2">
        <span>★ {{ rating }}</span>
        <span class="text-white text-xs">・{{ students }}人</span>
        <span class="text-white text-xs">・{{ hours }}小時</span>
      </div>
      <div class="flex items-end gap-2 mt-2">
        <span class="text-white text-lg font-bold">NT$ {{ price.toLocaleString() }}</span>
        <span v-if="originPrice" class="text-[#B6A089] text-sm line-through">NT$ {{ originPrice.toLocaleString() }}</span>
      </div>
    </div>
  </n-card>
</template>

<script setup lang="ts">
defineProps<{
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
