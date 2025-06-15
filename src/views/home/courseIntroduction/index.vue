<template>
  <div>
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import heroSection from './comps/heroSection.vue'
import tabs from './comps/tabs.vue'

const course = ref([
  {
    link: '/home/course/4',
    id: 4,
    img: '/src/assets/images/course/course1.jpg',
    title: '職人級！一次掌握歐式麵包的高水量與發酵秘訣',
    teacher: '許燁堂',
    description: '深入解析高水量麵糰操作，學習如何控制麵糰濕度、延展性，做出氣孔完美的歐式麵包！',
    rating: 5.0,
    students: 1238,
    hours: 11,
    price: 4200,
    originPrice: 9800,
    is_bookmark: false,
    created_at: '2025-06-06T15:00:00.000Z'
  },
])

const activeTab = ref('info')

// 取得對應ID的課程資料
const courseData = course.value[0]

// 處理購買事件
const handlePurchase = () => {
  // 加入購買邏輯
}

// 處理收藏切換事件
const handleToggleBookmark = () => {
  courseData.is_bookmark = !courseData.is_bookmark
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
