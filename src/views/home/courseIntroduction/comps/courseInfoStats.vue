<template>
  <div :class="containerClass">
    <span class="flex items-center gap-1">
      <starIcon />
      {{ Number(courseData.rating).toFixed(1) }}
    </span>
    <span class="flex items-center gap-1">
      <groupIcon />
      {{ courseData.students }}人
    </span>
    <span class="flex items-center gap-1">
      <timeIcon />
      {{ courseData.hours }}小時
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import starIcon from '@/components/layout/starIcon.vue'
import groupIcon from '@/components/layout/groupIcon.vue'
import timeIcon from '@/components/layout/timeIcon.vue'
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

const props = withDefaults(defineProps<{
  courseData: CourseData
  variant?: 'desktop' | 'mobile'
}>(), {
  variant: 'desktop'
})

const containerClass = computed(() => {
  const baseClass = 'flex items-center text-sm gap-4 flex-wrap'
  return props.variant === 'desktop'
    ? `${baseClass} text-neutral-100 mt-6 mb-8`
    : `${baseClass} text-neutral-200 mb-6`
})
</script>
