<template>
  <div class="flex w-full flex-col items-start">
    <!-- 標題和麵包屑 -->
    <course-chapter-banner :course-name="courseName" />

    <!-- 滿版兩欄區塊 -->
    <course-chapter-hero
      :section="currentSection"
      :subsection="currentSubsection"
      :course-image-url="currentCourse?.course_banner_imageUrl"
      @start-learning="handleStartLearning"
    />

    <div class="mx-auto w-full max-w-[1280px] px-0 md:px-4 py-6">
      <!-- 通知區塊 -->
      <div class="w-90% mx-auto md:w-full mb-6">
        <notify v-if="showNotify" :course-name="courseName" @close="showNotify = false"/>
      </div>

      <!-- 主要內容區塊 -->
      <div class="flex flex-col gap-6 md:flex-row">
        <!-- 左欄：課程章節 -->
        <div class="w-90% md:w-2/3 lg:w-3/4">
          <course-chapter-menu
            :sections="sections"
            :loading="sectionStore.loading"
            @select-subsection="handleSelectSubsection"
          />
        </div>

        <!-- 右欄：講師介紹 -->
        <div class="w-90% mx-auto md:w-1/3">
          <div class="sticky top-6">
            <teacher-intro
              :teacher-id="currentCourse?.teacher_id || ''"
              @go-to-teacher="goToTeacher"
              v-if="loaded && currentCourse"
            />
            <div
              v-else
              class="flex flex-col gap-4 w-full p-6 rounded-[0.125rem] border border-white/20 bg-black box-border"
            >
              <div class="mb-2">
                <typography variant="h6" font-type="title" class="text-neutral-200">載入講師資料中...</typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 課程評價 -->
    <div class="mx-auto w-full max-w-[1280px] px-0 md:px-4 py-6">
      <course-rating :course-id="courseId" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Notify from '@/views/home/courseIntroduction/comps/notify.vue';
import teacherIntro from '@/views/home/courseIntroduction/comps/teacherIntro.vue';
import { useCourseStore } from '@/stores/models/course/store';
import { useSectionStore } from '@/stores/models/courseChapter/sectionStore';
import CourseChapterBanner from './comps/CourseChapterBanner.vue';
import CourseChapterHero from './comps/CourseChapterHero.vue';
import CourseChapterMenu from './comps/CourseChapterMenu.vue';
import CourseRating from './comps/CourseRating.vue';
import { storeToRefs } from 'pinia';

const router = useRouter();
const showNotify = ref(true);

// 前往講師頁面
const goToTeacher = (teacherId: string) => {
  router.push({
    name: 'TeacherProfile',
    params: { id: teacherId },
  });
};

// 處理子章節選擇事件
const handleSelectSubsection = (sectionId: string, subsectionId: string) => {
  // 跳轉到對應的上課頁面
  router.push({
    name: 'CourseVideo',
    params: { id: courseId.value },
    query: { section: sectionId, subsection: subsectionId }
  });
};

const courseStore = useCourseStore();
const sectionStore = useSectionStore();
const { sections } = storeToRefs(sectionStore);
const loaded = ref(false);

// 獲取課程 ID
const route = useRoute();
const courseId = computed(() => route.params.id?.toString() || '');

// 載入課程資料
const loadCourse = async () => {
  try {
    if (!courseStore.courseList.length) {
      await courseStore.fetchCourses();
    }

    if (courseId.value) {
      await sectionStore.fetchByCourse(courseId.value);
    }
  } finally {
    loaded.value = true;
  }
};

// 組件掛載時載入課程資料
onMounted(loadCourse);

// 獲取當前課程資料
const currentCourse = computed(() => {
  if (!loaded.value) return null;
  return courseStore.getCourseById(courseId.value);
});

// 獲取課程名稱
const courseName = computed(() => currentCourse.value?.course_name || '載入中...');

// 獲取當前選中的章節與子章節
const currentSection = computed(() => {
  if (!sections.value || sections.value.length === 0) return null;
  return sections.value[0]; // 預設顯示第一個章節
});

const currentSubsection = computed(() => {
  if (!currentSection.value || !currentSection.value.subsections || currentSection.value.subsections.length === 0) return null;
  return currentSection.value.subsections[0]; // 預設顯示第一個子章節
});

// 開始上課按鈕處理函數
const handleStartLearning = () => {
  if (currentSection.value && currentSubsection.value) {
    // 跳轉到課程視頻頁面，並傳遞章節和子章節參數
    router.push({
      name: 'CourseVideo',
      params: { id: courseId.value },
      query: {
        section: currentSection.value.id,
        subsection: currentSubsection.value.id
      }
    });
  } else {
    // 如果沒有章節列表，直接導向課程主頁
    router.push(`/home/course/course-page/${courseId.value}`);
  }
};
</script>

<style scoped>
.video-menu :deep(.n-menu-item-content--selected)::before {
  background-color: transparent !important;
}
.video-menu :deep(.n-base-icon.n-menu-item-content__arrow svg) {
  fill: yellow !important;
}
</style>
