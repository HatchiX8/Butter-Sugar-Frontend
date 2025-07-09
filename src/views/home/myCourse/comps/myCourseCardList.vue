<template>
  <div v-if="loading" class="w-full flex justify-center items-center py-10">
    <n-spin size="large" />
  </div>
  <div v-else-if="error" class="w-full flex justify-center items-center py-10 text-red-500">
    {{ error }}
  </div>
  <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 justify-items-center w-full">
    <!-- 因為 API 沒有提供講師名稱，所以使用預設值 -->
    <!-- :link="`/home/course/${course.id}`" -->
    <my-course-card
      v-for="course in paginatedCourses"
      :key="course.id"
      :link="`/home/course-chapter/${course.id}`"
      :img="course.course_small_imageUrl || ''"
      :title="course.course_name"
      :teacher="course.teacher || '講師'"
      :rating="course.rating || 5.0"
      :hours="course.course_hours || '0'"
      :total-users="course.total_users || '0'"
      :learning-progress="course.learning_progress || 0"
      :last-study-date="course.last_accessed_at"
    />
  </div>
  <div v-if="!loading && !error && filteredCourses.length === 0" class="w-full flex flex-col items-center py-10 text-neutral_200">
    <div v-if="courseList.length === 0" class="text-center">
      <typography variant="h5" font-type="title" class="text-white mb-4">尚未購買課程</typography>
      <typography variant="h5" font-type="title" class="text-white">立即探索課程，開始您的學習之旅!</typography>
    </div>
    <div v-else>
      <typography variant="h5" font-type="title" class="text-white">無符合條件的課程</typography>無符合條件的課程
    </div>
  </div>

  <!-- 分頁元件 -->
  <div v-if="!loading && !error && filteredCourses.length > 0" class="mx-auto mb-10">
    <pagination-comps
      v-model="currentPage"
      :total-pages="totalPages"
      :page-size="pageSize"
      :total-items="filteredCourses.length"
      @page-change="handlePageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { NSpin } from 'naive-ui';
import { useRoute, useRouter } from 'vue-router';
import MyCourseCard from './myCourseCard.vue';
import PaginationComps from '@/components/layout/paginationComps.vue';
import { getMyCourseList } from '../api';
import Typography from '@/components/layout/typography.vue';
import type { courseListInfo } from '../api/type';
import { useTeacherStore } from '@/stores/models/teacher/store';

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

// 取得路由與路由器
const route = useRoute();
const router = useRouter();

// 使用講師 store
const teacherStore = useTeacherStore();

// 用於存儲已加載的講師資料
const loadedTeachers = ref<Record<string, boolean>>({});

// 分頁相關
const pageSize = ref(12); // 每頁顯示12個項目

// 從 URL 參數取得初始頁碼
const initialPage = computed(() => {
  const pageParam = route.query.page;
  if (pageParam && !isNaN(Number(pageParam))) {
    return Number(pageParam);
  }
  return 1;
});

const currentPage = ref(initialPage.value);

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

// 計算總頁數
const totalPages = computed(() => Math.ceil(filteredCourses.value.length / pageSize.value));

// 計算當前頁的課程
const paginatedCourses = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;

  // 在返回分頁課程前，將課程資料轉換為包含講師暱稱的格式
  return filteredCourses.value.slice(startIndex, endIndex).map(course => {
    // 複製課程對象，以避免修改原始資料
    const formattedCourse = { ...course };

    // 獲取講師資料，優先使用 nickname
    const teacherId = course.teacher_id;
    if (teacherId) {
      const teacherData = teacherStore.getTeacherById(teacherId);

      if (teacherData) {
        // 如果有講師資料，優先使用 nickname
        formattedCourse.teacher = teacherData.nickname || teacherData.name || course.teacher || '講師';
      } else if (!loadedTeachers.value[teacherId]) {
        // 如果沒有講師資料且未加載過，則嘗試加載
        loadedTeachers.value[teacherId] = true;
        teacherStore.fetchTeacher(teacherId);
      }
    }

    return formattedCourse;
  });
});

// 處理頁碼變化
const handlePageChange = (page: number) => {
  currentPage.value = page;
  // 更新 URL 參數
  router.push({
    query: { ...route.query, page }
  });
  // 滾動到頁面頂部
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// 監聽篩選條件變化，更新總課程數和重置頁碼
watch([() => props.filterType, () => props.searchKeyword, courseList], () => {
  emit('update-total-items', filteredCourses.value.length);
  // 重置到第一頁並更新 URL
  currentPage.value = 1;
  router.push({
    query: { ...route.query, page: 1 }
  });
}, { deep: true });

// 元件掛載時獲取課程列表
onMounted(() => {
  fetchMyCourses();
});

// 監聽路由參數變化
watch(
  () => route.query.page,
  (newPage) => {
    if (newPage && !isNaN(Number(newPage))) {
      currentPage.value = Number(newPage);
    } else if (!newPage) {
      currentPage.value = 1;
    }
  }
);

// 當頁碼變化時，確保頁碼不超出範圍
watch(totalPages, newTotalPages => {
  if (currentPage.value > newTotalPages && newTotalPages > 0) currentPage.value = newTotalPages;
});
</script>
