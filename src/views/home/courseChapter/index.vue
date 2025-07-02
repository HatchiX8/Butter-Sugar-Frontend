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
          <div class="rounded-lg border border-white/20 p-6">
            <n-spin :show="sectionStore.loading">
              <n-empty
                v-if="!sectionStore.loading && sections.length === 0"
                description="目前此課程尚無章節內容"
                class="py-10"
              />

              <n-collapse v-else accordion>
                <n-collapse-item
                  v-for="section in sections"
                  :key="section.id"
                  :title="`第 ${section.order_index + 1} 章：${section.main_section_title}`"
                  :name="section.id"
                  class="mb-2 last:mb-0"
                >
                  <div v-for="subsection in section.subsections" :key="subsection.id" class="py-2 pl-4 hover:bg-gray-700/50 rounded cursor-pointer transition-colors">
                    <div class="flex items-center gap-2 text-white">
                      <span class="text-blue-400 font-mono">{{ `${section.order_index + 1}-${subsection.order_index}` }}</span>
                      <span>{{ subsection.subsection_title }}</span>
                    </div>
                  </div>
                </n-collapse-item>
              </n-collapse>
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
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { NCollapse, NCollapseItem, NSpin, NEmpty } from 'naive-ui';
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
</script>
