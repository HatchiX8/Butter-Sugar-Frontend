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
      {{ isBookmarked ? '已收藏' : '收藏' }}
      <bookmarkIcon class="ml-2" :isBookmarked="isBookmarked"/>
    </n-button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import bookmarkIcon from '@/components/layout/bookmarkIcon.vue'
import arrowRightIcon from '@/components/layout/arrowRightIcon.vue'
import { useBookmarkStore } from '@/stores/models'
interface CourseData {
  link: string
  id: number
  uuid: string
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
  toggleBookmark: [boolean]
}>()

const isMouseDown = ref(false)

// 使用 Pinia store 管理收藏狀態
const bookmarkStore = useBookmarkStore()

// 使用計算屬性來獲取最新的收藏狀態
const isBookmarked = computed(() => bookmarkStore.isBookmarked(props.courseData.uuid))

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
  const bookmarkState = isBookmarked.value ? 'bookmarked' : 'not-bookmarked'
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
    // 使用 store 的 toggleBookmark 函數切換收藏狀態
    const newState = bookmarkStore.toggleBookmark(props.courseData.uuid)
    
    // 通知父元件更新狀態
    emit('toggleBookmark', newState)
  }
  isMouseDown.value = false
}

// 初始化時從 store 載入收藏狀態
onMounted(() => {
  // 確保 store 中有此課程的收藏狀態
  if (!bookmarkStore.isBookmarked(props.courseData.uuid) && props.courseData.is_bookmark) {
    // 如果 props 中標記為已收藏但 store 中沒有，則更新 store
    bookmarkStore.setBookmarkState(props.courseData.uuid, true)
  }
})
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
