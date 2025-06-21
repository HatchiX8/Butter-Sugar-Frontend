<template>
  <div class="block md:hidden">
    <!-- 圖片區域 -->
    <div class="relative w-full h-80">
      <img
        :src="courseHeroImage"
        :alt="courseData.title"
        class="w-full h-full"
        style="object-fit: cover;"
      />
      <!-- 遮罩 -->
      <div class="absolute inset-0 bg-black bg-opacity-60"></div>
    </div>

    <!-- 內容區域 -->
    <div class="bg-neutral-800 px-4 py-6">
      <courseHeroContent :course-data="courseData" variant="mobile" />
      <courseActionButtons
        :course-data="courseData"
        button-style="mobile"
        @purchase="$emit('purchase')"
        @toggle-bookmark="(newState) => $emit('toggleBookmark', newState)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import courseHeroContent from './courseHeroContent.vue'
import courseActionButtons from './courseActionButtons.vue'
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
  courseData: CourseData
  courseHeroImage: string
}>()

defineEmits<{
  purchase: []
  toggleBookmark: [boolean]
}>()
</script>
