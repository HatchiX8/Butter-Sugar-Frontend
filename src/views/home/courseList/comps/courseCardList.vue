<template>
  <div v-if="loading" class="w-full flex justify-center items-center py-10">
    <n-spin size="large" />
  </div>
  <div v-else-if="error" class="w-full flex justify-center items-center py-10 text-red-500">
    {{ error }}
  </div>
  <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 justify-items-center w-full">
    <courseCard v-for="course in courses" :key="course.id" v-bind="course" />
  </div>
</template>

<script setup lang="ts">
import courseCard from './courseCard.vue';
import { useCourseStore } from '@/stores/models/course/store';
import { useTeacherStore } from '@/stores/models/teacher/store';
import { storeToRefs } from 'pinia';
import { onMounted, computed, defineProps, defineEmits, watch, ref } from 'vue';
import { NSpin } from 'naive-ui';

// 定義屬性
const props = defineProps<{
  categoryId?: number | null,
  sortType?: string,
  page?: number,
  pageSize?: number
}>();

// 定義事件
const emit = defineEmits<{
  'update-total-items': [total: number]
}>();

// 使用 Pinia store
const courseStore = useCourseStore();
const teacherStore = useTeacherStore();

// 使用 storeToRefs 解構 store 中的響應式資料
const { courseList, loading, error } = storeToRefs(courseStore);

// 用於存儲已加載的講師資料
const loadedTeachers = ref<Record<string, boolean>>({});

// 將 courseList 轉換為元件需要的格式並根據 categoryId 過濾、sortType 排序及分頁
// TODO: 根據teacher_id 查講師名稱 & 撥課程評分
const allCourses = computed(() => {
  // 先過濾出已上架的課程，然後轉換格式
  const formattedCourses = courseList.value
    .filter(course => course.course_status === '上架')
    .map(course => {
      // 將字串轉換為數字，以便排序
      const studentsCount = parseInt(course.total_users || '0', 10);

      // 獲取講師資料，優先使用 nickname
      const teacherId = course.teacher_id;
      const teacherData = teacherStore.getTeacherById(teacherId);
      let teacherName = course.teacher || '講師';

      // 如果有講師資料，優先使用 nickname
      if (teacherData) {
        teacherName = teacherData.nickname || teacherData.name || teacherName;
      } else if (teacherId && !loadedTeachers.value[teacherId]) {
        // 如果沒有講師資料且未加載過，則嘗試加載
        loadedTeachers.value[teacherId] = true;
        teacherStore.fetchTeacher(teacherId);
      }

      return {
        link: `/home/course/${course.id}`,
        id: course.id,
        img: course.course_small_imageUrl || '',
        title: course.course_name,
        category_id: course.category_id,
        teacher: teacherName,
        rating: 5.0, // API 中沒有評分欄位，使用預設值
        students: studentsCount.toLocaleString('zh-TW'), // 加上千分位顯示
        studentsCount, // 保存原始數字以便排序
        hours: parseInt(course.course_hours || '0', 10),
        price: parseInt(course.sell_price || '0', 10),
        originPrice: parseInt(course.origin_price || '0', 10),
        createdAt: course.created_at || '' // 保存創建時間以便排序
      };
    });

  // 根據選擇的類別過濾課程
  let filteredCourses = formattedCourses;
  if (props.categoryId) {
    filteredCourses = formattedCourses.filter(course => course.category_id === props.categoryId);
  }

  // 根據 sortType 排序
  if (props.sortType === 'hot') {
    // 最熱門：依學生人數降序排列
    return filteredCourses.sort((a, b) => b.studentsCount - a.studentsCount);
  } else if (props.sortType === 'time') {
    // 依時間：依 created_at 降序排列（最新的在前）
    return filteredCourses.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });
  }

  // 預設返回無排序的列表
  return filteredCourses;
});

// 當前頁的課程
const courses = computed(() => {
  // 如果沒有指定頁碼或每頁數量，則返回全部課程
  if (!props.page || !props.pageSize) {
    return allCourses.value;
  }

  // 計算當前頁的課程
  const startIndex = (props.page - 1) * props.pageSize;
  const endIndex = startIndex + props.pageSize;
  return allCourses.value.slice(startIndex, endIndex);
});

// 監聽 allCourses 變化，更新總課程數
watch(() => allCourses.value.length, (newLength) => {
  emit('update-total-items', newLength);
});

// 元件掛載時獲取課程列表
onMounted(() => {
  courseStore.fetchCourses().then(() => {
    // 課程資料加載完成後立即發送總課程數
    emit('update-total-items', allCourses.value.length);
  });
});

// 監聽 categoryId 變化，更新總課程數
watch([() => props.categoryId, () => courseList.value], () => {
  // 類別或課程列表變化時更新總課程數
  emit('update-total-items', allCourses.value.length);
});
</script>
