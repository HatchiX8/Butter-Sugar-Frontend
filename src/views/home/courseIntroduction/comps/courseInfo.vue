<template>
  <div class="w-full flex flex-col gap-6 mt-[3.75rem] max-w-[1280px] mx-auto items-center box-border md:flex-row md:items-start md:justify-center">
    <!-- 課程資訊區塊 (左欄) -->
    <div class="flex flex-col gap-6 w-full box-border border border-white/20 p-6 rounded-[0.125rem] order-last md:order-first gap-25 md:w-[845px] md:p-6">
      <courseDetail v-if="props.courseData" :course-data="courseData" />
      <courseIntro v-if="props.courseData" :course-data="props.courseData" />
      <courseChapter />
      <faq />
    </div>

    <!-- 右欄內容：購買課程和講師介紹 -->
    <div class="flex flex-col w-full max-w-full order-first md:order-last md:w-[411px]">
      <!-- 購買課程區塊 -->
      <coursePurchase
        :course-data="courseData"
        @purchase="handlePurchase"
        @add-to-cart="handleAddToCart"
      />

      <!-- 講師介紹區塊 -->
      <teacherIntro class="mt-6" />
    </div>
  </div>
</template>

<script setup lang="ts">
import courseDetail from './courseDetail.vue';
import teacherIntro from './teacherIntro.vue';
import coursePurchase from './coursePurchase.vue';
import courseIntro from './courseIntro.vue';
import courseChapter from './courseChapter.vue';
import faq from './faq.vue';
import type { CartItem } from '@/api/cart/types';

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
const props = defineProps<{
  courseData?: CourseData;
}>();

const emit = defineEmits(['purchase', 'add-to-cart']);

const cartItem: CartItem = {
  course_id: props.courseData?.uuid ?? '',
  course_name: props.courseData?.title ?? '',
  price: props.courseData?.price ?? 0,
  course_small_imageurl: props.courseData?.course_small_imageUrl ?? ''
}

const handlePurchase = () => {
  emit('purchase', cartItem);
};

const handleAddToCart = () => {
  emit('add-to-cart', cartItem);
};
</script>

<style scoped>

</style>
