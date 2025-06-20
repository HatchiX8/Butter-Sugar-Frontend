<template>
  <div id="course-info" class="border-b border-white/20">
    <typography variant="h2" font-type="title" class="text-white" underline>課程資訊</typography>
  </div>
  <!-- 課程資訊內容 -->
  <div class="flex flex-wrap gap-4">
    <div class="flex items-center gap-4 text-white w-full md:w-[calc(50%-0.5rem)]">
      <div class="flex items-center justify-center w-4 h-4">
        <div class="i-ion:star text-primary-light"></div>
      </div>
      <div>開課日期 {{ formatDate(courseData?.created_at) || '尚未開課' }}</div>
    </div>
    <div class="flex items-center gap-4 text-white w-full md:w-[calc(50%-0.5rem)]">
      <div class="flex items-center justify-center w-4 h-4">
        <div class="i-ion:calendar-clear-outline text-primary-light"></div>
      </div>
      <div>觀看期限 無限制</div>
    </div>
    <div class="flex items-center gap-4 text-white w-full md:w-[calc(50%-0.5rem)]">
      <div class="flex items-center justify-center w-4 h-4">
        <div class="i-ion:time-outline text-primary-light"></div>
      </div>
      <div>課程時數 {{ courseData?.hours || " - " }} 小時</div>
    </div>
    <div class="flex items-center gap-4 text-white w-full md:w-[calc(50%-0.5rem)]">
      <div class="flex items-center justify-center w-4 h-4">
        <div class="i-ion:people text-primary-light"></div>
      </div>
      <div>學員人數 {{ formatNumber(courseData?.students || 0) }} 人</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import typography from '@/components/layout/typography.vue';

const formatNumber = (num: number): string => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const formatDate = (dateString?: string): string => {
  if (!dateString) return '2025/06/06';

  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}/${month}/${day}`;
};

interface CourseData {
  link: string;
  id: number;
  uuid: string;
  img: string;
  title: string;
  teacher: string;
  description: string;
  rating: number;
  students: number;
  hours: number;
  price: number;
  originPrice: number;
  is_bookmark: boolean;
  created_at: string;
  course_description: string | null;
  suitable_for: string | null;
  course_goal: string | null;
  course_description_imageUrl: string | null;
  course_small_imageUrl: string | null;
  teacher_id: string;
}

defineProps<{
  courseData?: CourseData;
}>();
</script>

<style scoped>
</style>
