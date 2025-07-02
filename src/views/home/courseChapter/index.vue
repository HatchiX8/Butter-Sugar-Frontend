<template>
  <div class="mx-auto flex w-full flex-col items-start md:max-w-[1280px]">
    <div class="w-full px-4">
      <breadcrumbComps
        class="mt-30"
        :items="[
          { label: '首頁', to: '/' },
          { label: '我的課程', to: '/my-course' },
          { label: courseName },
        ]"
      />
      <typography class="mt-10 text-white" variant="h2" font-type="title" underline>
        {{ courseName }}
      </typography>
    </div>

    <div class="mx-auto w-full max-w-[1280px] px-4 py-6">
      <!-- 通知區塊 -->
      <notify v-if="showNotify" :course-name="courseName" @close="showNotify = false" class="mb-6" />

      <!-- 主要內容區塊 -->
      <div class="flex flex-col gap-6 md:flex-row">
        <!-- 左欄：課程章節 -->
        <div class="w-full md:w-2/3 lg:w-3/4">
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
        <div class="w-full md:w-1/3 lg:w-1/4">
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
</script>

<style scoped>
.video-menu :deep(.n-menu-item-content--selected)::before {
  background-color: transparent !important;
}
.video-menu :deep(.n-base-icon.n-menu-item-content__arrow svg) {
  fill: yellow !important;
}
</style>
