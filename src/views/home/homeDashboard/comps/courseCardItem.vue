<template>
  <div class="w-full max-w-sm mx-auto cursor-pointer flex flex-col" @click="handleClick">
    <!-- 圖片區塊 -->
    <div class="group relative overflow-hidden aspect-[4/3] transition-shadow duration-300 group-hover:shadow-lg">
      <img
        :src="courseImgUrl"
        :alt="courseImgAlt"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      <!-- 圖片上文字 -->
      <div class="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <p class="w-full bg-black/60 text-white px-4 py-2 text-4 text-center font-bold leading-tight">
          {{ courseTitle }}
        </p>
      </div>

      <!-- 遮罩 -->
      <div class="absolute inset-0 bg-black/50 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none"></div>
    </div>

    <!-- 課程資訊 -->
    <div class="mt-4 px-2">
      <h4 class="text-4.5 font-bold text-white leading-snug clamped-text-1 mb-1">
        {{ courseTitle }}
      </h4>
      <p class="text-3.5 text-neutral_200 leading-snug clamped-text-2 mb-2 h-10">
        {{ courseSubtitle }}
      </p>
      <div class="flex items-center text-3.5 text-white">
        <!-- 評分 -->
        <div class="flex items-center pr-4">
          <span class="inline-block w-4 h-4 mr-1.5 i-ion:star color-primaryLight"></span>
          <div>{{ formatNumberFixed(courseRank) }}</div>
        </div>
        <!-- 學生數 -->
        <div class="flex items-center">
          <span class="inline-block w-4 h-4 mr-1.5 i-ion:people color-primaryLight"></span>
          <div>{{ formatNumber(courseStudentSum) }} 人</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps<{
  courseId: string
  courseImgUrl: string
  courseImgAlt: string
  courseTitle: string
  courseSubtitle: string
  courseRank: number
  courseStudentSum: number
}>();

const router = useRouter();
const handleClick = () => {
  router.push({ name: 'Course', params: { id: props.courseId } });
};

const formatNumberFixed = (value: unknown, fixedNum: number = 1): string => {
  const num = Number(value);
  return isNaN(num) ? '0.0' : num.toFixed(fixedNum);
}; // 確保顯示一位小數

const formatNumber = (value: number): string => `${value.toLocaleString('en-US')}`;
</script>

<style scoped>
.clamped-text-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.clamped-text-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>
