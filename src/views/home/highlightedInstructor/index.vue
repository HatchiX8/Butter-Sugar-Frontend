<template>
  <div class="w-80% max-w-220 mx-auto my-20">
    <div v-if="displayTeacher" class="flex flex-col sm:flex-row items-center sm:items-start px-8 py-10 gap-6 mt-14 text-white"
    :style="{ backgroundImage: `url(${bgImgUrl})` }">
      <!-- 講師左側 -->
      <div class="flex-shrink-0 w-60 bg-black p-4 text-center">
        <img :src="displayTeacher.avatarUrl" alt="講師頭像" class="w-24 h-24 mx-auto rounded-full object-cover" />
        <p class="text-sm mt-4">精選講師</p>
        <p class="text-lg font-bold mt-2">{{ displayTeacher.nickname }}</p>
        <p class="text-xs mt-2 whitespace-pre-line">{{ displayTeacher.specialty }}</p>
        <div class="mt-2 text-sm">
          <span class="inline-block w-3.5 h-3.5 i-ion:star color-primaryLight"></span>
          <span class="pl-1">{{ displayTeacher.rank }}</span>
          <span class="pl-1">({{ displayTeacher.rankNum }} 人評價)</span>
        </div>
      </div>
      <!-- 講師右側 -->
      <div class="flex-1 text-sm leading-relaxed">
        <p class="text-lg mb-4">
          {{ displayTeacher.slogan }}
        </p>
        <p class="text-neutral_100">{{ displayTeacher.aboutMe }}</p>
      </div>
    </div>
    <!-- 精選課程 -->
    <typography variant="h3" font-type="title" underline class="my-8 text-white">精選課程</typography>
    <div v-if="displayCourses.length === 0" class="text-white text-center mt-8">
      <span>尚無課程資料。</span>
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <courseCard v-for="course in displayCourses" :key="course.id" v-bind="course" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia';
import typography from '@/components/layout/typography.vue';
import courseCard from '@/views/home/courseList/comps/courseCard.vue';
import { useInstructorStore } from '@/stores/models/instructor/store';
import { useRoute } from 'vue-router';

const bgImgUrl = new URL('@/assets/images/home/bg-grey-wrinkle.png', import.meta.url).href;

const route = useRoute();
const instructorStore = useInstructorStore();

const { teacher, courses } = storeToRefs(instructorStore);

const displayTeacher = computed(() => {
  if (!teacher.value) return null;
  return {
    avatarUrl: teacher.value.profile_image_url,
    nickname: teacher.value.name,
    slogan: teacher.value.slogan,
    aboutMe: teacher.value.description,
    specialty: teacher.value.specialization,
    rank: formatNumberFixed(teacher.value.rating_score),
    rankNum: Number(teacher.value.rating_users),
  };
});

type CourseCardProps = {
  id: string
  link?: string
  img: string
  title: string
  teacher: string
  rating: string | number
  students: string | number
  hours: string | number
  price: number
  originPrice?: number
};

const displayCourses = computed<CourseCardProps[]>(() =>
  (courses.value ?? []).map(c => ({
    id: c.id,
    link: `/home/course/${c.id}`,
    img: c.course_small_imageUrl ?? '',
    title: c.course_name ?? '',
    teacher: teacher.value?.name ?? '',
    rating: Number(c.course_ratings?.avg_rating_score ?? 0),
    students: (c.total_users ?? 0).toLocaleString('zh-TW'),
    hours: c.course_hours ?? 0,
    price: c.sell_price ?? 0,
    originPrice: c.origin_price ?? 0
  }))
);

const formatNumberFixed = (value: unknown, fixedNum: number = 1): string => {
  const num = Number(value);
  return isNaN(num) ? '0.0' : num.toFixed(fixedNum);
}; // 確保顯示一位小數

onMounted(() => {
  const teacherId = route.params.teacher_id as string;
  if (teacherId) {
    instructorStore.fetchInstructor(teacherId);
  }
});
</script>

<style scoped>

</style>
