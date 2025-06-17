<template>
  <div v-if="loading" class="w-full flex justify-center items-center py-10">
    <n-spin size="large" />
  </div>
  <div v-else-if="error" class="w-full flex justify-center items-center py-10 text-red-500">
    {{ error }}
  </div>
  <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 justify-items-center w-full">
    <!-- 因為 API 沒有提供講師名稱，所以使用預設值 -->
    <my-course-card
      v-for="course in filteredCourses"
      :key="course.id"
      :link="`/home/course/${course.id}`"
      :img="course.course_banner_imageUrl || '/src/assets/images/course/course1.jpg'"
      :title="course.course_name"
      :teacher="'講師'"
      :rating="course.rating || 5.0"
      :hours="course.course_hours || '0'"
      :learning-progress="course.learning_progress || 0"
      :last-study-date="course.last_accessed_at"
    />
  </div>
  <div v-if="!loading && !error && filteredCourses.length === 0" class="w-full flex justify-center items-center py-10 text-neutral_200">
    無符合條件的課程
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { NSpin } from 'naive-ui';
import MyCourseCard from './myCourseCard.vue';
import { getMyCourseList } from '../api';
import type { courseListInfo } from '../api/type';

// 定義屬性
const props = defineProps<{
  filterType?: string, // 篩選類型：all(所有), notStarted(尚未開始), inProgress(進行中), completed(已完成)
  searchKeyword?: string // 搜尋關鍵字
}>();

// 定義事件
const emit = defineEmits<{
  'update-total-items': [total: number]
}>();

// 狀態
const loading = ref(false);
const error = ref<string | null>(null);
const courseList = ref<courseListInfo[]>([]);

// 獲取我的課程列表
const fetchMyCourses = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await getMyCourseList();
    courseList.value = response.data.courses;
    emit('update-total-items', courseList.value.length);
  } catch (err) {
    error.value = err instanceof Error ? err.message : '查詢課程列表時發生錯誤';
  } finally {
    loading.value = false;
  }
};

// 根據篩選條件過濾課程
const filteredCourses = computed(() => {
  // 先根據搜尋關鍵字過濾
  let filtered = courseList.value;

  if (props.searchKeyword && props.searchKeyword.trim() !== '') {
    const keyword = props.searchKeyword.toLowerCase().trim();
    filtered = filtered.filter(course =>
      course.course_name.toLowerCase().includes(keyword) ||
      (course.course_banner_description && course.course_banner_description.toLowerCase().includes(keyword))
    );
  }

  // 再根據篩選類型過濾
  if (props.filterType && props.filterType !== 'all') {
    switch (props.filterType) {
      case 'notStarted':
        filtered = filtered.filter(course => !course.learning_progress || course.learning_progress === 0);
        break;
      case 'inProgress':
        filtered = filtered.filter(course => course.learning_progress && course.learning_progress > 0 && course.learning_progress < 100);
        break;
      case 'completed':
        filtered = filtered.filter(course => course.learning_progress && course.learning_progress === 100);
        break;
      default:
        // 'all' 或其他情況，不需要額外過濾
        break;
    }
  }

  return filtered;
});

// 監聽篩選條件變化，更新總課程數
watch([() => props.filterType, () => props.searchKeyword, courseList], () => {
  emit('update-total-items', filteredCourses.value.length);
}, { deep: true });

// 元件掛載時獲取課程列表
onMounted(() => {
  fetchMyCourses();
});
</script>
