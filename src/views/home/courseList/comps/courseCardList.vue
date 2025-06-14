<template>
  <div v-if="loading" class="w-full flex justify-center items-center py-10">
    <n-spin size="large" />
  </div>
  <div v-else-if="error" class="w-full flex justify-center items-center py-10 text-red-500">
    {{ error }}
  </div>
  <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 justify-items-center w-full">
    <courseCard v-for="course in courses" :key="course.id" v-bind="course" />
  </div>
</template>

<script setup lang="ts">
import courseCard from './courseCard.vue';
import { useCourseStore } from '@/stores/models/course/store';
import { storeToRefs } from 'pinia';
import { onMounted, computed } from 'vue';
import { NSpin } from 'naive-ui';

// 使用 Pinia store
const courseStore = useCourseStore();

// 使用 storeToRefs 解構 store 中的響應式資料
const { courseList, loading, error } = storeToRefs(courseStore);

// 將 courseList 轉換為元件需要的格式
const courses = computed(() => courseList.value.map(course => ({
  link: `/home/course/${course.id}`,
  id: course.id,
  img: course.course_banner_imageUrl || '/src/assets/images/course/course1.jpg', // 使用 API 返回的圖片
  title: course.course_name,
  teacher: '講師', // 這裡需要從 teacher_id 獲取講師名稱，暫時使用預設值
  rating: 5.0, // API 中沒有評分欄位，使用預設值
  students: parseInt(course.total_users || '0', 10),
  hours: parseInt(course.course_hours || '0', 10),
  price: parseInt(course.sell_price || '0', 10),
  originPrice: parseInt(course.origin_price || '0', 10)
})));

// 元件掛載時獲取課程列表
onMounted(() => {
  courseStore.fetchCourses();
});
</script>
