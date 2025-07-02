<template>
  <div>
    <div v-if="loading || isDataFetching" class="flex justify-center items-center min-h-[65vh] text-gray-600">
      <typography variant="h2" font-type="title" class="text-white">載入課程資料中...</typography>
    </div>
    <div v-else-if="!loading && !isDataFetching && !courseData" class="flex justify-center items-center min-h-[65vh] text-gray-600">
      <typography variant="h2" font-type="title" class="text-white">查無此課程資料!</typography>
    </div>
    <template v-else-if="courseData">
      <heroSection
        :course-data="courseData"
        @purchase="handlePurchase"
        @toggle-bookmark="handleToggleBookmark"
      />
      <div class="page-container">
        <tabs
          :course-data="courseData"
          :course-id="courseId"
          :teacher-id="courseData?.teacher_id || ''"
          :loading="cartStore.loading"
          @tab-change="handleTabChange"
          @purchase="handlePurchase"
          @add-to-cart="handleAddToCart"
          @toggle-bookmark="handleToggleBookmark"
          @go-to-teacher="goToTeacherPage"
          @start-learning="handleStartLearning"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import typography from '@/components/layout/typography.vue'
import { useCourseStore } from '@/stores/models/course/store'
import { useTeacherStore } from '@/stores/models/teacher/store'
import { useBookmarkStore } from '@/stores/models/bookmark'
import type { courseListInfo, CourseData, Teacher } from '@/types/course'

import heroSection from './comps/heroSection.vue'
import tabs from './comps/tabs.vue'
// import { useCourseStore } from '@/stores/models/course/store'
import { useCartStore } from '@/stores/models/cart/store'
import { useMessage } from 'naive-ui'
import { useRouter } from 'vue-router'
import type { CartItem } from '@/api/cart/types'

const message = useMessage()
const router = useRouter()

// 使用已定義的 CourseData 介面
// 已從 @/types/course 導入

// 獲取路由參數
const route = useRoute()
const courseId = computed(() => route.params.id as string)

// 使用 course store
const courseStore = useCourseStore()
const { loading, fetchCourses } = courseStore

// 使用 teacher store
const teacherStore = useTeacherStore()
const { fetchTeacher } = teacherStore

// 使用 bookmark store
const bookmarkStore = useBookmarkStore()

// 資料庫回傳資料已修正，不需要清理課程描述

// API 資料轉換為組件期望的格式
const convertToCourseData = (apiCourse: courseListInfo | null): CourseData | null => {
  if (!apiCourse) return null

  // 取得教師暱稱
  let teacherName = '未知教師';

  // 嘗試從 teacherStore 獲取教師資訊
  const cachedTeacher = teacherStore.getTeacherById(apiCourse.teacher_id);
  if (cachedTeacher && cachedTeacher.nickname) {
    teacherName = cachedTeacher.nickname;
  }
  // 如果 teacher 是物件且有 nickname 屬性
  else if (apiCourse.teacher && typeof apiCourse.teacher === 'object' && apiCourse.teacher !== null) {
    const teacherObj = apiCourse.teacher as Teacher;
    if (teacherObj.nickname) {
      teacherName = teacherObj.nickname;
    }
  }
  // 如果 teacher 是字串
  else if (typeof apiCourse.teacher === 'string' && apiCourse.teacher) {
    teacherName = apiCourse.teacher;
  }

  return {
    link: `/home/course/${apiCourse.id}`,
    id: parseInt(apiCourse.id),
    uuid: apiCourse.id, // 確保 uuid 屬性存在，使用 id 作為 uuid
    img: apiCourse.course_banner_imageUrl || '/src/assets/images/course/course1.jpg',
    title: apiCourse.course_name,
    teacher: teacherName, // 使用教師暱稱
    teacher_id: apiCourse.teacher_id || '', // 添加教師 ID，確保傳遞給子組件
    description: (apiCourse.course_banner_description || apiCourse.course_description || '').trim(),
    rating: 5.0, // 假設評分，API 中可能沒有此欄位
    students: parseInt(apiCourse.total_users || '0'),
    hours: parseInt(apiCourse.course_hours || '0'),
    price: parseInt(apiCourse.sell_price || '0'),
    originPrice: parseInt(apiCourse.origin_price || '0'),
    is_bookmark: false, // 假設未收藏，API 中可能沒有此欄位
    created_at: apiCourse.created_at,
    course_description: apiCourse.course_description || '',
    suitable_for: apiCourse.suitable_for || '',
    course_goal: apiCourse.course_goal || '',
    course_description_imageUrl: apiCourse.course_description_imageUrl || null,
    course_small_imageUrl: apiCourse.course_small_imageUrl || '',
  }
}

// 保存課程收藏狀態的參考變數
const isBookmarked = ref(false)

// 保存原始 API 數據的參考變數
const originalCourseData = ref<courseListInfo | null>(null)

// 取得對應 ID 的課程資料
const courseData = computed(() => {
  // 使用 store 的 getCourseById 方法取得原始資料
  const apiCourse = courseStore.getCourseById(courseId.value)
  // 轉換為組件期望的格式
  const course = convertToCourseData(apiCourse)

  // 如果課程存在，設置收藏狀態
  if (course && course.uuid) {
    // 使用獨立的 ref 變數追蹤收藏狀態
    course.is_bookmark = isBookmarked.value
  }

  return course
})

// 監聽 courseId 變化，更新原始課程數據
watch(courseId, (newId) => {
  if (newId) {
    originalCourseData.value = courseStore.getCourseById(newId)
  }
}, { immediate: true })

// 自定義載入狀態，確保資料完全載入後才顯示內容
const isDataFetching = ref(true)

// 在元件掛載時獲取課程資料
onMounted(async () => {
  isDataFetching.value = true
  try {
    // 初始化書籤狀態
    bookmarkStore.initializeFromLocalStorage()

    // 無論如何都重新獲取課程資料，確保資料是最新的
    await fetchCourses()

    // 獲取課程數據後，嘗試獲取講師數據
    if (originalCourseData.value && originalCourseData.value.teacher_id) {
      await fetchTeacher(originalCourseData.value.teacher_id);
    }
    // 課程資料載入完成後，設置初始收藏狀態
    if (courseId.value) {
      isBookmarked.value = bookmarkStore.isBookmarked(courseId.value)
    }
  } finally {
    // 資料獲取完成後，設置載入狀態為 false
    isDataFetching.value = false
  }
})

const activeTab = ref('info')

// 處理購買事件
const cartStore = useCartStore()
const handleAddToCart = async () => {
  const course = courseData.value
  if (!course) return

  const cartItem: CartItem = {
    course_id: course.uuid,
    course_name: course.title,
    price: course.price,
    course_small_imageurl: course.course_small_imageUrl ?? '',
  }

  const res = await cartStore.addItem(cartItem)
  message[res.success ? 'success' : 'error'](res.message)
}
const handlePurchase = async () => {
  await handleAddToCart()
  router.push({ name: 'Cart'});
}

// 前往講師頁面
const goToTeacherPage = () => {
  router.push({ name: 'HighlightedInstructor', params: { teacher_id: courseData.value?.teacher_id ?? '' } });
}

// 處理立即上課按鈕點擊事件 (已購買課程)
const handleStartLearning = (courseId: string) => {
  if (!courseId) return;
  // 跳轉至課程影片頁面
  router.push(`/home/course/course-page/${courseId}`);
}

// 處理收藏切換事件
const handleToggleBookmark = (newState?: boolean) => {
  const course = courseData.value
  if (course && course.uuid) {
    // 如果收到了子組件傳來的 newState 參數，直接使用它更新本地狀態
    // 子組件已經調用了 bookmarkStore.toggleBookmark()，所以不需要再呼叫一次
    if (typeof newState === 'boolean') {
      // 直接使用子組件傳來的新狀態
      isBookmarked.value = newState
    }
    // 只有當此方法直接從頁面調用且沒有傳入 newState 時，才調用 toggleBookmark
    else if (typeof newState === 'undefined') {
      // 僅在直接從本頁面觸發且沒有提供狀態時才切換
      const toggledState = bookmarkStore.toggleBookmark(course.uuid)
      // 更新本地狀態
      isBookmarked.value = toggledState
    }
  }
}

// 處理標籤切換
const handleTabChange = (tabName: string) => {
  activeTab.value = tabName
  // 滾動到頂部以顯示切換的內容
  window.scrollTo({
    top: 600, // 調整這個值以匹配您的標題高度
    behavior: 'smooth'
  })
}
</script>

<style scoped>

</style>
