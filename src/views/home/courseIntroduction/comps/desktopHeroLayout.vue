<template>
  <div class="hidden md:block relative w-full h-540 min-h-150">
    <!-- 背景圖片 -->
    <div
      class="absolute inset-0 w-full h-full max-h-540px"
      :style="backgroundImageStyle"
    ></div>

    <!-- 遮罩 -->
    <div class="absolute inset-0 w-full h-full bg-black bg-opacity-60 z-1"></div>

    <!-- 內容區域 -->
    <div class="absolute inset-0 top-50 w-full h-full flex items-start justify-start px-[5%] z-2">
      <div class="max-w-4xl w-full">
        <courseHeroContent :course-data="courseData" />
        <courseActionButtons
          :course-data="courseData"
          button-style="desktop"
          @purchase="$emit('purchase')"
          @toggle-bookmark="$emit('toggleBookmark')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import courseHeroContent from './courseHeroContent.vue'
import courseActionButtons from './courseActionButtons.vue'
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
  courseHeroImage: string
}>()

defineEmits<{
  purchase: []
  toggleBookmark: []
}>()

const backgroundImageStyle = computed(() => ({
  backgroundImage: `url(${props.courseHeroImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat'
}))
</script>
