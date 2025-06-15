<template>
  <div :class="containerClass">
    <n-button
      ghost
      :class="purchaseButtonClass"
      @mousedown="handlePurchaseMouseDown"
    >
      立即購買 NT$ {{ courseData.price.toLocaleString() }}
      <arrowRightIcon class="ml-2"/>
    </n-button>

    <n-button
      ghost
      :class="bookmarkButtonClass"
      @mousedown="handleBookmarkMouseDown"
      @mouseup="handleBookmarkMouseUp"
    >
      {{ courseData.is_bookmark ? '已收藏' : '收藏' }}
      <bookmarkIcon class="ml-2" :isBookmarked="courseData.is_bookmark"/>
    </n-button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import bookmarkIcon from '@/components/layout/bookmarkIcon.vue'
import arrowRightIcon from '@/components/layout/arrowRightIcon.vue'
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
  buttonStyle?: 'desktop' | 'mobile'
}>(), {
  buttonStyle: 'desktop'
})

const emit = defineEmits<{
  purchase: []
  toggleBookmark: []
}>()

const isMouseDown = ref(false)

const containerClass = computed(() =>
  props.buttonStyle === 'mobile' ? 'flex gap-2' : 'flex gap-2 flex-wrap'
)

const purchaseButtonClass = computed(() => {
  const baseClass = 'bg-primaryDefault'
  const styleClass = props.buttonStyle === 'mobile'
    ? 'hero-btn-mobile flex-1'
    : 'hero-btn'
  return `${baseClass} ${styleClass}`
})

const bookmarkButtonClass = computed(() => {
  const baseClass = 'bookmark-btn'
  const styleClass = props.buttonStyle === 'mobile'
    ? 'hero-btn-mobile flex-shrink-0'
    : 'hero-btn'
  const bookmarkState = props.courseData.is_bookmark ? 'bookmarked' : 'not-bookmarked'
  return `${baseClass} ${styleClass} ${bookmarkState}`
})

const handlePurchaseMouseDown = (event: Event) => {
  event.preventDefault()
  emit('purchase')
}

const handleBookmarkMouseDown = (event: Event) => {
  event.preventDefault()
  isMouseDown.value = true
}

const handleBookmarkMouseUp = () => {
  if (isMouseDown.value) {
    emit('toggleBookmark')
  }
  isMouseDown.value = false
}
</script>

<style scoped>
.hero-btn {
  @apply text-14px lh-24px text-white px-6 py-3 border-none transition-all duration-200;
}

.hero-btn:hover {
  @apply bg-primaryLight cursor-pointer text-white;
}

.hero-btn-mobile {
  @apply text-14px lh-24px text-white px-4 py-3 border-none transition-all duration-200 font-medium;
}

.hero-btn-mobile:hover {
  @apply bg-primaryLight cursor-pointer text-white;
}

.bookmark-btn.not-bookmarked {
  @apply bg-transparent border border-white;
}

.bookmark-btn.not-bookmarked:hover {
  @apply bg-primaryLight border-primaryLight;
}

.bookmark-btn.bookmarked {
  @apply bg-primaryDefault border border-primaryDefault;
}

.bookmark-btn.bookmarked:hover {
  @apply bg-primaryLight border-primaryLight;
}
</style>
