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
import { onMounted, computed, defineProps } from 'vue';
import { NSpin } from 'naive-ui';

// 定義屬性
const props = defineProps<{
  categoryId?: number | null
}>();

// 使用 Pinia store
const courseStore = useCourseStore();

// 使用 storeToRefs 解構 store 中的響應式資料
const { courseList, loading, error } = storeToRefs(courseStore);

// 將 courseList 轉換為元件需要的格式並根據 categoryId 過濾
const courses = computed(() => {
  // 先轉換格式
  const formattedCourses = courseList.value.map(course => ({
    link: `/home/course/${course.id}`,
    id: course.id,
    img: course.course_banner_imageUrl || '/src/assets/images/course/course1.jpg', // 使用 API 返回的圖片
    title: course.course_name,
    category_id: course.category_id,
    teacher: '講師', // 這裡需要從 teacher_id 獲取講師名稱，暫時使用預設值
    rating: 5.0, // API 中沒有評分欄位，使用預設值
    students: parseInt(course.total_users || '0', 10),
    hours: parseInt(course.course_hours || '0', 10),
    price: parseInt(course.sell_price || '0', 10),
    originPrice: parseInt(course.origin_price || '0', 10)
  }));

  // 如果沒有選擇類別，顯示所有課程
  if (!props.categoryId) {
    return formattedCourses;
  }

  // 根據選擇的類別過濾課程
  return formattedCourses.filter(course => course.category_id === props.categoryId);
});

// 元件掛載時獲取課程列表
onMounted(() => {
  courseStore.fetchCourses();
});
</script>
