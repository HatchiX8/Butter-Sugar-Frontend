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
interface CourseData {
  link: string
  id: number
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
}

const props = defineProps<{
  courseData: CourseData
}>()

const emit = defineEmits<{
  purchase: []
  toggleBookmark: []
}>()

const handlePurchase = () => {
  emit('purchase')
}

const handleToggleBookmark = () => {
  emit('toggleBookmark')
}
</script>
