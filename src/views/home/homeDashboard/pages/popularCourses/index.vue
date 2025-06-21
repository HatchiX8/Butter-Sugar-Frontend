<template>
  <div class="px-12 py-15 bg-neutral_600 overflow-x-hidden">
    <div class="mx-auto max-w-[1200px]">
      <!-- 標題 -->
      <div class="mb-8 flex justify-center">
        <typography variant="h2" font-type="title" underline class="headingTitle  text-white">熱門課程</typography>
      </div>

      <!-- 副標題 -->
      <h3 class="text-4 text-neutral_200 text-center mb-8 leading-loose max-w-3xl mx-auto">
        精選超人氣課程，無論是學技能、培養興趣，還是專業進修，這裡都有適合你的選擇，快來一起學習吧！
      </h3>

      <!-- 課程卡片 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <courseCardItem
          v-for="(item, index) in resCourses"
          :key="index"
          :courseId="item.course_id"
          :courseImgUrl="item.course_image_url"
          :courseImgAlt="item.courseImgAlt"
          :courseTitle="item.course_name"
          :courseSubtitle="item.course_description"
          :courseRank="item.course_rating_score"
          :courseStudentSum="item.course_total_users"
        />
      </div>

      <!-- 按鈕 -->
      <div class="mt-10 text-center md:text-right">
        <router-link :to="{ name: 'CourseInfoList' }">
          <baseButton label="更多課程" icon="i-ion:arrow-forward" iconPosition="right" iconClass="w-4 h-4" class="text-white" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import courseCardItem from '@/views/home/homeDashboard/comps/courseCardItem.vue';
import typography from '@/components/layout/typography.vue';
import baseButton from '@/components/layout/baseButton.vue';
import { useHomeDashboardStore } from '@/stores/models/homeDashboard/store';
import type { PopularCourse  } from '@/views/home/homeDashboard/api/types';

const courses = ref<PopularCourse[]>([]);

// 取得熱門課程
const homeDashboardStore = useHomeDashboardStore();
onMounted(async () => {
  await homeDashboardStore.fetchPopularCourse();
  courses.value = homeDashboardStore.popularCourses;
});

// 補上 alt
const resCourses = computed(() =>
  courses.value.map((item) => ({
    ...item,
    courseImgAlt: `${item.course_name}照片`,
  }))
);
</script>

<style scoped>
::v-deep(.headingTitle > span) {
  @apply mx-auto;
}
</style>
