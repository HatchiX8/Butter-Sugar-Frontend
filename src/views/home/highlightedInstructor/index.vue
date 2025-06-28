<template>
  <div class="w-full max-w-[80%] md:max-w-[1280px] mx-auto my-20">
    <!-- 載入中狀態 -->
    <div v-if="loading" class="flex justify-center items-center h-60">
      <n-spin size="large">
        <template #description>載入講師資料中...</template>
      </n-spin>
    </div>

    <!-- 錯誤狀態 -->
    <div v-else-if="error" class="flex flex-col items-center justify-center h-60 text-center">
      <div class="text-error text-xl mb-4">{{ error }}</div>
      <n-button @click="fetchInstructorData" type="primary">重新載入</n-button>
    </div>

    <!-- 講師資料 -->
    <template v-else-if="instructor">
      <div class="max-w-[90%] mx-auto flex flex-col sm:flex-row sm:items-start md:items-center px-8 py-10 gap-6 mt-14 text-white"
      :style="{ backgroundImage: `url(${bgImgUrl})` }">
        <!-- 講師左側 -->
        <div class="flex-shrink-0 w-60 bg-black p-4 text-center">
          <div class="teacher-avatar p-3 [background:url('@/assets/images/home/teacher-flower-lace.png')_center_center/contain_no-repeat]">
            <img :src="instructor.avatar" alt="講師頭像" class="w-24 h-24 mx-auto rounded-full [object-fit:cover]" />
          </div>
          <div class="text-sm text-black mt-4 py-2px [background:url('@/assets/images/home/teacher-flag.png')_center_center/contain_no-repeat]">精選講師</div>
          <div class="text-lg font-bold mt-2">{{ instructor.name }}</div>
          <div class="text-xs mt-2 whitespace-pre-line">{{ instructor.specialization || '' }}</div>
          <div class="mt-2 text-sm">
            <span class="inline-block w-3.5 h-3.5 i-ion:star color-primaryLight"></span>
            <span class="pl-1">{{ formatNumberFixed(instructor.rating) }}</span>
            <span class="pl-1">({{ instructor.reviews_count }} 人評價)</span>
          </div>
        </div>
        <!-- 講師右側 -->
        <div class="flex gap-4 py-6 text-sm leading-relaxed item-center">
          <img :src="quoteImg" alt="講師引號" class="w-10 h-10 object-contain" />
          <div class="flex flex-col align-middle ">
            <p class="text-4 mb-4">
              {{ instructor.slogan }}
            </p>
            <p class="text-neutral_100">{{ instructor.introduction }}</p>
          </div>
        </div>
      </div>
      <!-- 精選課程 -->
      <div class="sm:w-full md:max-w-[90%] mx-auto">
        <typography variant="h3" font-type="title" underline class="text-white my-8 mt-5">精選課程</typography>
        <div v-if="courses.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          <courseCard v-for="course in courses" :key="course.id" v-bind="course" />
        </div>
        <div v-else class="text-center py-10 text-neutral_300">
          暫無精選課程
        </div>
      </div>
    </template>

    <!-- 無資料狀態 -->
    <div v-else class="flex flex-col items-center justify-center h-60 text-center">
      <div class="text-neutral_300 text-xl mb-4">找不到講師資料</div>
      <n-button @click="fetchInstructorData" type="primary">重新載入</n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { NButton, NSpin } from 'naive-ui';
import typography from '@/components/layout/typography.vue';
import courseCard from '@/views/home/courseList/comps/courseCard.vue';
import { useTeacherStore } from '@/stores/models/teacher/store';
import type { Teacher } from '@/stores/models/teacher/store';

// 取得路由參數
const route = useRoute();
const teacherId = ref<string>('');

// 背景圖片
const bgImgUrl = new URL('@/assets/images/home/bg-grey-wrinkle.png', import.meta.url).href;
import quoteImg from '@/assets/images/home/teacher-quote.png'

// 格式化數字為固定小數位數
const formatNumberFixed = (value: unknown, fixedNum: number = 1): string => {
  const num = Number(value);
  return isNaN(num) ? '0.0' : num.toFixed(fixedNum);
};

// 使用 teacherStore
const teacherStore = useTeacherStore();
const { loading, error } = storeToRefs(teacherStore);

// 講師資料
const instructor = ref<Teacher | null>(null);

// 講師課程
interface CourseItem {
  link: string;
  id: number;
  img: string;
  title: string;
  teacher: string;
  rating: number;
  students: number;
  hours: number;
  price: number;
  originPrice?: number;
}

const courses = ref<CourseItem[]>([]);

// 獲取講師資料
const fetchInstructorData = async () => {
  if (!teacherId.value) return;

  // 從 store 獲取講師資料
  const teacher = await teacherStore.fetchTeacher(teacherId.value);
  if (teacher) {
    instructor.value = teacher;

    // 這裡暫時使用假資料，因為目前 API 尚未提供講師課程列表
    courses.value = [
      {
        link: `/home/course/1`,
        id: 1,
        img: 'https://i.postimg.cc/VSGjLy7v/french-bread.png',
        title: '法式經典｜酥脆外皮、柔軟內裡的完美法國麵包',
        teacher: teacher.name,
        rating: 5.0,
        students: 1238,
        hours: 11,
        price: 5800,
        originPrice: 9800,
      },
      {
        link: `/home/course/2`,
        id: 2,
        img: 'https://i.postimg.cc/3WDg7c2r/toast.png',
        title: '香濃奶油香氣四溢！手作日式生吐司',
        teacher: teacher.name,
        rating: 5.0,
        students: 1238,
        hours: 11,
        price: 3600,
        originPrice: 9800,
      },
      {
        link: `/home/course/3`,
        id: 3,
        img: 'https://i.postimg.cc/8fWWH7Tf/baking.png',
        title: '手作麵包輕體驗｜零失敗入門免費課',
        teacher: teacher.name,
        rating: 5.0,
        students: 1238,
        hours: 11,
        price: 4500,
      },
    ];
  }
};

// 組件掛載時獲取講師資料
onMounted(() => {
  // 從路由參數獲取講師 ID，如果沒有則使用默認值 1
  const routeId = route.params.id;

  teacherId.value = (routeId && typeof routeId === 'string') ? routeId : '1';

  // 獲取講師資料
  fetchInstructorData();
});
</script>

<style scoped>

</style>
