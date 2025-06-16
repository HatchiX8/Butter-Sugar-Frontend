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
        :loading="cartStore.loading"
        @tab-change="handleTabChange"
        @purchase="handlePurchase"
        @add-to-cart="handleAddToCart"
        @toggle-bookmark="handleToggleBookmark"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import heroSection from './comps/heroSection.vue'
import tabs from './comps/tabs.vue'
import { useCartStore } from '@/stores/models/cart/store'
import { useMessage } from 'naive-ui'
import { useRouter } from 'vue-router'
import type { CartItem } from '@/api/cart/types';

const message = useMessage()
const router = useRouter()

const course = ref([
  {
    link: '/home/course/4',
    id: '27bfcdb3-a80d-44d1-889d-180aaa77e660',
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
    created_at: '2025-06-06T15:00:00.000Z',
    course_smallimage: 'https://d2s58zzou5c8mv.cloudfront.net/course-banner-images/beda94f5-a13b-4190-84eb-2d45684fba2e.jpg'
  },
])

const activeTab = ref('info')

// 取得對應ID的課程資料
const courseData = course.value[0]

// 處理購買事件
const cartStore = useCartStore()
const handlePurchase = async (item: CartItem) => {
  if (!item) return;
  const res = await cartStore.addItem(item);
  message[res.success ? 'success' : 'error'](res.message);

  if (res.success) {
    router.push('/home/cart-flow/cart')
  }
}
const handleAddToCart = async (item: CartItem) => {
  if (!item) return;
  const res = await cartStore.addItem(item);
  message[res.success ? 'success' : 'error'](res.message);
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
