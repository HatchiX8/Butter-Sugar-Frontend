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
    <courseVideo 
      :courseName="courseName" 
      :sectionId="sectionId" 
      :subsectionId="subsectionId"
    />
    <qaModule :courseId="courseId" />
    <router-view />
  </div>
</template>
<script lang="ts" setup>
import breadcrumbComps from '@/components/layout/breadcrumbComps.vue';
import courseVideo from './comps/courseVideo.vue';
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCourseStore } from '@/stores/models/course/store';

// 使用 store
const courseStore = useCourseStore();
const loaded = ref(false);

// 獲取課程 ID 和章節參數
const route = useRoute();
const courseId = computed(() => route.params.id?.toString() || '1');

// 獲取章節和子章節 ID
const sectionId = computed(() => route.query.section?.toString() || '');
const subsectionId = computed(() => route.query.subsection?.toString() || '');

// 載入課程資料
const loadCourse = async () => {
  if (!courseStore.courseList.length) {
    await courseStore.fetchCourses();
  }
  loaded.value = true;
};

// 組件掛載時載入課程資料
onMounted(loadCourse);

// 獲取課程名稱
const courseName = computed(() => {
  if (!loaded.value) return '';
  const course = courseStore.getCourseById(courseId.value);
  return course?.course_name || '';
});
</script>
