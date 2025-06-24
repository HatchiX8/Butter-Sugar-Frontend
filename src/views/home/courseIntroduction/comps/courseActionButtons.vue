<template>
  <div :class="containerClass">
    <n-button
      ghost
      :class="purchaseButtonClass"
      @mousedown="handlePurchaseMouseDown"
    >
      {{ isPurchased ? '立即上課' : `立即購買 NT$ ${courseData.price.toLocaleString()}` }}
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
import { ref, computed, onMounted, watch } from 'vue'
import bookmarkIcon from '@/components/layout/bookmarkIcon.vue'
import arrowRightIcon from '@/components/layout/arrowRightIcon.vue'
import { useBookmarkStore } from '@/stores/models'
import { useMyCourseStore } from '@/stores/models/course/myCourseStore'
import { useFavoriteCourseStore } from '@/stores/models/favoriteCourses/store'
import { useUserStore } from '@/stores/models/user/store'
import { useRouter } from 'vue-router'
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
  startLearning: [string]
}>()

const isMouseDown = ref(false)

// 使用新的 Pinia store 管理收藏狀態
const favoriteStore = useFavoriteCourseStore()
const userStore = useUserStore()
// 兼容原有的 bookmarkStore
const bookmarkStore = useBookmarkStore()

// 使用計算屬性來獲取最新的收藏狀態
const isBookmarked = computed(() => favoriteStore.hasFavorite(props.courseData.uuid))

// 使用 myCourseStore 判斷課程是否已購買
const myCourseStore = useMyCourseStore()
const isPurchased = computed(() => {
  if (!props.courseData?.uuid) return false
  return myCourseStore.isPurchased(props.courseData.uuid)
})

// 使用 router 進行頁面導航
const router = useRouter()

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
  
  // 根據購買狀態決定行為
  if (isPurchased.value) {
    // 如果已購買，跳轉至課程頁面
    if (props.courseData?.uuid) {
      // 直接使用 router 導航至課程頁面
      router.push(`/home/course/course-page/${props.courseData.uuid}`)
      
      // 同時觸發開始學習事件（保留向上通知的能力）
      emit('startLearning', props.courseData.uuid)
    }
  } else {
    // 未購買則執行購買流程
    emit('purchase')
  }
}

const handleBookmarkMouseDown = (event: Event) => {
  event.preventDefault()
  isMouseDown.value = true
}

const handleBookmarkMouseUp = async () => {
  if (isMouseDown.value) {
    // 在操作API前先保存當前狀態，用於發生錯誤時回滾
    const wasBookmarked = isBookmarked.value;
    const currentCourseId = props.courseData.uuid;
    
    // 使用新的 favoriteStore 切換收藏狀態
    try {
      if (wasBookmarked) {
        // 如果已收藏，則移除收藏
        await favoriteStore.removeFromFavorites(currentCourseId);
      } else {
        // 如果尚未收藏，則增加收藏
        await favoriteStore.addToFavorites(currentCourseId);
      }

      // 為了兼容性，同步更新原有的 bookmarkStore
      bookmarkStore.setBookmarkState(currentCourseId, isBookmarked.value);

      // 通知父元件更新狀態
      emit('toggleBookmark', isBookmarked.value);
    } catch (error) {
      // 顯示錯誤通知
      if (window.$message) {
        window.$message.error(`操作失敗: ${error instanceof Error ? error.message : '請稍後再試'}`);
      }
    }
  }
  isMouseDown.value = false;
}

// 初始化時載入收藏狀態
onMounted(async () => {
  // 如果用戶已登入，則從伺服器載入收藏列表
  if (userStore.isLoggedIn) {
    await favoriteStore.fetchFavorites()
  }
  
  // 確保兼容性，同步到原有的 bookmarkStore
  if (favoriteStore.hasFavorite(props.courseData.uuid) && !bookmarkStore.isBookmarked(props.courseData.uuid)) {
    bookmarkStore.setBookmarkState(props.courseData.uuid, true)
  }

  // 如果 props 中標記為已收藏但 store 中沒有，則更新 store
  if (!favoriteStore.hasFavorite(props.courseData.uuid) && props.courseData.is_bookmark) {
    if (userStore.isLoggedIn) {
      await favoriteStore.addToFavorites(props.courseData.uuid)
    } else {
      // 如未登入，添加到本地收藏
      favoriteStore.addToFavorites(props.courseData.uuid)
      bookmarkStore.setBookmarkState(props.courseData.uuid, true)
    }
  }
})

// 監聽登入狀態變化，登入後同步收藏課程
watch(() => userStore.isLoggedIn, async (isLoggedIn) => {
  if (isLoggedIn) {
    // 登入後同步本地收藏到遠端
    await favoriteStore.syncLocalWithRemote()
  }
}, { immediate: true })
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
