<template>
  <div class="w-full max-w-[1280px] mx-auto px-4 flex flex-col items-start box-border text-white">
    <breadcrumbComps
      class="mt-30"
      :items="[
        { label: '首頁', to: '/' },
        { label: '我的課程', to: '/home/my-course?page=1' },
        { label: courseName },
      ]"
    />
    <courseVideo />
    <qaModule />
    <router-view />
  </div>
</template>
<script lang="ts" setup>
import breadcrumbComps from '@/components/layout/breadcrumbComps.vue';
import courseVideo from './comps/courseVideo.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useCourseStore } from '@/stores/models/course/store';

// 使用 store
const courseStore = useCourseStore();

// 獲取課程 ID
const route = useRoute();
const courseId = computed(() => route.params.id?.toString() || '1');

// 獲取課程名稱
const courseName = computed(() => {
  const course = courseStore.getCourseById(courseId.value);
  return course?.course_name || '載入課程中...';
});
</script>
