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
  link: string
  id: string
  img: string
  title: string
  teacher: string
  description: string
  rating: number
  students: number
  hours: number
  price: number
  originPrice: number
  is_bookmark: boolean
  course_smallimage: string
}

const props = defineProps<{
  courseData: CourseData
}>()

const cartItem: CartItem = {
  course_id: props.courseData?.id ?? "",
  course_name: props.courseData?.title ?? "",
  price: props.courseData?.price ?? 0,
  course_smallimage: props.courseData?.course_smallimage ?? ""
}

const emit = defineEmits(['purchase', 'toggle-bookmark'])

const handlePurchase = () => {
  emit('purchase', cartItem);
}

const handleToggleBookmark = () => {
  emit('toggle-bookmark');
}
</script>
