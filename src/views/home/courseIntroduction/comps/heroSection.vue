<template>
  <section class="relative w-full overflow-hidden mt-20">
    <!-- 桌面版佈局 -->
    <desktopHeroLayout
      :course-data="props.courseData"
      :course-hero-image="courseHeroImage"
      @purchase="handlePurchase"
      @toggle-bookmark="handleToggleBookmark"
    />

    <!-- 移動端佈局 -->
    <mobileHeroLayout
      :course-data="props.courseData"
      :course-hero-image="courseHeroImage"
      @purchase="handlePurchase"
      @toggle-bookmark="handleToggleBookmark"
    />
  </section>
</template>

<script setup lang="ts">
import courseHeroImage from '@/assets/images/course/courseHero.jpg'
import desktopHeroLayout from './desktopHeroLayout.vue'
import mobileHeroLayout from './mobileHeroLayout.vue'
import type { CartItem } from '@/api/cart/types'
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
  courseData: CourseData
}>()

const cartItem: CartItem = {
  course_id: props.courseData?.uuid ?? '',
  course_name: props.courseData?.title ?? '',
  price: props.courseData?.price ?? 0,
  course_small_imageurl: props.courseData?.course_small_imageUrl ?? ''
}

const emit = defineEmits<{
  (e: 'purchase', item: CartItem): void
  (e: 'toggleBookmark', value: boolean): void
}>()

const handlePurchase = () => {
  emit('purchase', cartItem);
}

const handleToggleBookmark = (newState: boolean) => {
  emit('toggleBookmark', newState)
}
</script>
