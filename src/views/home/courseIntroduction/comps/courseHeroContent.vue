<template>
  <div>
    <!-- 講師名稱 -->
    <typography
      :variant="teacherVariant"
      font-type="title"
      class="text-neutral-200 mb-2"
    >
      {{ courseData.teacher }}
    </typography>

    <!-- 主標題 -->
    <typography
      :variant="titleVariant"
      font-type="title"
      :class="titleClass"
    >
      {{ courseData.title }}
    </typography>

    <!-- 描述 -->
    <typography
      :variant="descriptionVariant"
      font-type="title"
      :class="descriptionClass"
    >
      {{ courseData.description }}
    </typography>

    <!-- 課程資訊 -->
    <courseInfoStats :course-data="courseData" :variant="variant" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import typography from '@/components/layout/typography.vue'
import courseInfoStats from './courseInfoStats.vue'
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

const props = withDefaults(defineProps<{
  courseData: CourseData
  variant?: 'desktop' | 'mobile'
}>(), {
  variant: 'desktop'
})

const isDesktop = computed(() => props.variant === 'desktop')

const teacherVariant = computed(() => isDesktop.value ? 'h5' : 'h6')
const titleVariant = computed(() => isDesktop.value ? 'h1' : 'h3')
const descriptionVariant = computed(() => isDesktop.value ? 'h5' : 'h6')

const titleClass = computed(() =>
  isDesktop.value
    ? 'text-white mr-8 text-wrap xl:whitespace-nowrap'
    : 'text-white mb-3 leading-tight'
)

const descriptionClass = computed(() =>
  isDesktop.value
    ? 'text-neutral-100 mr-8 mt-4 text-wrap xl:whitespace-nowrap'
    : 'text-neutral-100 mb-4 leading-relaxed'
)
</script>
