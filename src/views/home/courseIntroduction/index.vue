<template>
  <div>
    <div v-if="loading" class="flex justify-center items-center min-h-screen text-gray-600">
      載入課程資料中...
    </div>
    <div v-else-if="error" class="flex justify-center items-center min-h-screen text-red-500">
      {{ error }}
    </div>
    <div v-else-if="!courseData" class="flex justify-center items-center min-h-screen text-gray-600">
      找不到此課程資料
    </div>
    <template v-else>
      <heroSection
        :course-data="courseData"
        @purchase="handlePurchase"
        @toggle-bookmark="handleToggleBookmark"
      />
      <div class="page-container">
        <tabs
          :course-data="courseData"
          @tab-change="handleTabChange"
          @purchase="handlePurchase"
          @toggle-bookmark="handleToggleBookmark"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCourseStore } from '@/stores/models/course/store'
import type { courseListInfo, CourseData, Teacher } from '@/types/course'

import heroSection from './comps/heroSection.vue'
import tabs from './comps/tabs.vue'

// 使用已定義的 CourseData 介面
// 已從 @/types/course 導入

// 獲取路由參數
const route = useRoute()
const courseId = computed(() => route.params.id as string)

// 使用 course store
const courseStore = useCourseStore()
const { loading, error, fetchCourses } = courseStore

// 清理課程描述中的評分和學生數量
const cleanDescription = (description: string): string => description
  .replace(/\s*\d+\.\d+\s*/, '') // 移除評分（如 5.0）
  .replace(/\s*\d+\s*人\s*/, '') // 移除學生數量（如 1238人）
  .replace(/\s*\n\s*$/, '') // 移除結尾的換行符
  .trim();

// API 資料轉換為組件期望的格式
const convertToCourseData = (apiCourse: courseListInfo | null): CourseData | null => {
  if (!apiCourse) return null

  // 取得教師暱稱
  let teacherName = '未知教師';

  // 如果 teacher 是物件且有 nickname 屬性
  if (apiCourse.teacher && typeof apiCourse.teacher === 'object' && apiCourse.teacher !== null) {
    const teacherObj = apiCourse.teacher as Teacher;
    if (teacherObj.nickname) {
      teacherName = teacherObj.nickname;
    }
  }
  // 如果 teacher 是字串
  else if (typeof apiCourse.teacher === 'string' && apiCourse.teacher) {
    teacherName = apiCourse.teacher;
  }
  // 如果沒有 teacher 資訊，使用 teacher_id
  else if (apiCourse.teacher_id) {
    teacherName = apiCourse.teacher_id;
  }

  return {
    link: `/home/course/${apiCourse.id}`,
    id: parseInt(apiCourse.id),
    img: apiCourse.course_banner_imageUrl || '/src/assets/images/course/course1.jpg',
    title: apiCourse.course_name,
    teacher: teacherName, // 使用教師暱稱
    description: cleanDescription(apiCourse.course_banner_description || apiCourse.course_description || ''),
    rating: 5.0, // 假設評分，API 中可能沒有此欄位
    students: parseInt(apiCourse.total_users || '0'),
    hours: parseInt(apiCourse.course_hours || '0'),
    price: parseInt(apiCourse.sell_price || '0'),
    originPrice: parseInt(apiCourse.origin_price || '0'),
    is_bookmark: false, // 假設未收藏，API 中可能沒有此欄位
    created_at: apiCourse.created_at
  }
}

// 取得對應 ID 的課程資料
const courseData = computed(() => {
  // 使用 store 的 getCourseById 方法取得原始資料
  const apiCourse = courseStore.getCourseById(courseId.value)
  // 轉換為組件期望的格式
  return convertToCourseData(apiCourse)
})

// 如果課程列表為空，則獲取課程資料
onMounted(async () => {
  if (courseStore.courseList.length === 0) {
    await fetchCourses()
  }
})

const activeTab = ref('info')

// 處理購買事件
const handlePurchase = () => {
  // 加入購買邏輯
}

// 處理收藏切換事件
const handleToggleBookmark = () => {
  const course = courseData.value
  if (course) {
    course.is_bookmark = !course.is_bookmark
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
