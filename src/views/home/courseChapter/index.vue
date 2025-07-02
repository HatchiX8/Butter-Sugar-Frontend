<template>
  <div class="flex w-full flex-col items-start">
    <div class="mx-auto w-full max-w-[1280px] px-4">
      <breadcrumbComps
        class="mt-30"
        :items="[
          { label: '首頁', to: '/' },
          { label: '我的課程', to: '/home/my-course' },
          { label: courseName },
        ]"
      />
      <typography class="mt-10 text-white" variant="h2" font-type="title" underline>
        {{ courseName }}
      </typography>
    </div>

    <!-- 滿版兩欄區塊 -->
    <div class="w-full bg-blackbox-border py-8">
      <div class="mx-auto flex w-full max-w-[1280px] flex-col gap-8 px-4 md:flex-row md:gap-4">
        <!-- 左側：章節資訊 -->
        <div class="w-full md:w-1/2 flex flex-col justify-center items-center">
          <div v-if="currentSection" class="mb-4 text-xl font-bold text-white">
            {{ currentSection.main_section_title }}
          </div>
          <div v-if="currentSubsection" class="mb-6 text-2xl font-bold text-primaryDefault">
            {{ currentSubsection.subsection_title }}：{{ currentSubsection.order_index }}/{{ currentSection?.subsections.length }}
          </div>
          <n-button
            type="primary"
            size="large"
            class="w-40 mt-4"
            @click="handleStartLearning"
          >
            開始上課
          </n-button>
        </div>
        <!-- 右側：圖片 -->
        <div class="w-full pt-4 md:pt-0 md:w-1/2 flex items-center justify-center">
          <div class="aspect-video w-full max-w-[400px] bg-gray-700 rounded-md overflow-hidden shadow-lg md:max-w-[500px]">
            <img
              :src="currentCourse?.course_banner_imageUrl || '/images/default-course-cover.jpg'"
              alt="課程封面"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="mx-auto w-full max-w-[1280px] px-0 md:px-4 py-6">
      <!-- 通知區塊 -->
      <div class="w-90% mx-auto md:w-full mb-6">
        <notify v-if="showNotify" :course-name="courseName" @close="showNotify = false"/>
      </div>

      <!-- 主要內容區塊 -->
      <div class="flex flex-col gap-6 md:flex-row">
        <!-- 左欄：課程章節 -->
        <div class="w-90% md:w-2/3 lg:w-3/4">
          <div class="video-menu h-auto w-full overflow-y-auto rounded-lg border border-white/20 p-6">
            <n-spin :show="sectionStore.loading">
              <n-empty
                v-if="!sectionStore.loading && sections.length === 0"
                description="目前此課程尚無章節內容"
                class="py-10"
              />

              <n-menu
                v-else
                :options="menuOptions"
                accordion
                v-model:expanded-keys="expandedKeys"
                @update:value="handleMenuClick"
                :indent="12"
                class="h-full bg-transparent"
              />
            </n-spin>
          </div>
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
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, h } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { NSpin, NEmpty, NMenu } from 'naive-ui';
import type { MenuOption } from 'naive-ui';
import breadcrumbComps from '@/components/layout/breadcrumbComps.vue';
import typography from '@/components/layout/typography.vue';
import { useCourseStore } from '@/stores/models/course/store';
import { useSectionStore } from '@/stores/models/courseChapter/sectionStore';
import { storeToRefs } from 'pinia';
import Notify from '@/views/home/courseIntroduction/comps/notify.vue';
import teacherIntro from '@/views/home/courseIntroduction/comps/teacherIntro.vue';

const router = useRouter();
const showNotify = ref(true);

// 前往講師頁面
const goToTeacher = (teacherId: string) => {
  router.push({
    name: 'TeacherProfile',
    params: { id: teacherId },
  });
};

// 處理選單點擊事件
const handleMenuClick = (key: string) => {
  // 尋找點擊的是哪個子章節
  for (const section of sections.value) {
    const subsection = section.subsections.find(sub => sub.id === key);
    if (subsection) {
      // 跳轉到對應的上課頁面
      router.push({
        name: 'CourseVideo',
        params: { id: courseId.value },
        query: { section: section.id, subsection: subsection.id }
      });
      return;
    }
  }
};

const courseStore = useCourseStore();
const sectionStore = useSectionStore();
const { sections } = storeToRefs(sectionStore);
const loaded = ref(false);

// 獲取課程 ID
const route = useRoute();
const courseId = computed(() => route.params.id?.toString() || '');

// 定義章節選單相關變數
const menuOptions = ref<MenuOption[]>([]);
const expandedKeys = ref<string[]>([]);

// 將 sections 轉換為 menu options 格式
const generateMenuOptions = () => {
  if (!sections.value || sections.value.length === 0) {
    menuOptions.value = [];
    return;
  }

  menuOptions.value = sections.value.map((section) => ({
    type: 'submenu',
    key: section.id,
    label: () => h(
      'div',
      { class: 'flex items-center text-white' },
      section.main_section_title
    ),
    children: section.subsections.map((subsection) => ({
      type: 'item',
      key: subsection.id,
      label: () => h(
        'div',
        { class: 'flex items-center gap-2 text-white' },
        [
          h('span', { class: 'font-mono' }, `${section.order_index + 1}-${subsection.order_index}`),
          h('span', {}, subsection.subsection_title)
        ]
      )
    }))
  })) as MenuOption[];

  // 如果有章節，預設展開第一個章節
  if (sections.value.length > 0) {
    expandedKeys.value = [sections.value[0].id];
  }
};

// 載入課程資料
const loadCourse = async () => {
  try {
    if (!courseStore.courseList.length) {
      await courseStore.fetchCourses();
    }

    if (courseId.value) {
      await sectionStore.fetchByCourse(courseId.value);
      // 生成選單選項
      generateMenuOptions();
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
