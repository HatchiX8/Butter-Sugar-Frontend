<template>
  <div>
    <div class="mt-15 w-full">
      <n-tabs
        type="line"
        v-model:value="activeTab"
        @update:value="handleTabChange"
        justify-content="space-between"
      >
        <n-tab name="info" @click="scrollToSection('course-info')">
          <span class="text-white">課程資訊</span>
        </n-tab>
        <n-tab name="chapters" @click="scrollToSection('chapter-content')">
          <span class="text-white">章節內容</span>
        </n-tab>
        <n-tab name="faq" @click="scrollToSection('faq-section')">
          <span class="text-white">常見問題</span>
        </n-tab>
        <n-tab name="questions" @click="scrollToSection('course-qa')">
          <span class="text-white">課程問答</span>
        </n-tab>
        <n-tab name="reviews">
          <span class="text-white">課程評價</span>
        </n-tab>
      </n-tabs>
    </div>

    <div class="tab-content">
      <div class="flex flex-col items-center mx-auto p-6 max-w-[1280px] w-full box-border mt-15">
        <notify v-if="showNotify" :course-name="props.courseData?.title || ''" />

        <div class="w-full flex flex-col gap-6 max-w-[1280px] mx-auto items-center box-border md:flex-row md:items-start md:justify-center">
          <!-- 課程資訊區塊 (左欄) -->
          <div class="flex flex-col gap-6 w-full box-border border border-white/20 p-6 rounded-[0.125rem] order-last md:order-first gap-25 md:w-[845px] md:p-6">
            <!-- 根據當前標籤顯示不同內容 -->
            <template v-if="activeTab === 'info' || activeTab === 'chapters' || activeTab === 'faq'">
              <courseDetail v-if="props.courseData" :course-data="props.courseData" />
              <courseIntro v-if="props.courseData" :course-data="props.courseData" />
              <courseChapter/>
              <faq/>
            </template>

            <courseFaq v-if="activeTab === 'questions'" :course-id="props.courseId" />

            <courseReview v-if="activeTab === 'reviews'" :course-id="props.courseId" />
          </div>

          <!-- 右欄內容：購買課程和講師介紹 -->
          <div class="flex flex-col w-full max-w-full order-first md:order-last md:w-[411px]">
            <!-- 購買課程區塊 -->
            <coursePurchase
              v-if="props.courseData"
              :course-data="props.courseData"
              @purchase="handlePurchase"
              @add-to-cart="handleAddToCart"
              @toggle-bookmark="handleToggleBookmark"
              @go-to-teacher="goToTeacher"
            />

            <!-- 講師介紹區塊 -->
            <teacherIntro
              class="mt-6"
              :teacher-id="props.teacherId"
              @go-to-teacher="goToTeacher"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import notify from './notify.vue';
import courseFaq from './courseFaq.vue';
import courseDetail from './courseDetail.vue';
import courseIntro from './courseIntro.vue';
import courseChapter from './courseChapter.vue';
import faq from './faq.vue';
import coursePurchase from './coursePurchase.vue';
import teacherIntro from './teacherIntro.vue';
import courseReview from './courseReview.vue';
import type { CourseData } from '@/types/course';
import type { CartItem } from '@/api/cart/types';

const props = defineProps({
  courseData: {
    type: Object as () => CourseData | null,
    required: false,
    default: () => null
  },
  courseId: {
    type: String,
    required: false,
    default: ''
  },
  teacherId: {
    type: String,
    required: false,
    default: ''
  }
});

const showNotify = ref(true);
const activeTab = ref('info');

const scrollToSection = (sectionId: string) => {
  // Add a small delay to ensure DOM is updated before scrolling
  setTimeout(() => {
    const element = document.getElementById(sectionId);
    if (element) {
      const rect = element.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const offsetTop = rect.top + scrollTop - 80;

      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  }, 100);
};

const emit = defineEmits(['tab-change', 'purchase', 'toggle-bookmark', 'add-to-cart', 'go-to-teacher']);

const cartItem: CartItem = {
  course_id: props.courseData?.uuid ?? '',
  course_name: props.courseData?.title ?? '',
  price: props.courseData?.price ?? 0,
  course_small_imageurl: props.courseData?.course_small_imageUrl ?? ''
}

const handleTabChange = (tabName: string) => {
  activeTab.value = tabName;
  // Emit event to parent component to handle tab content change for all tabs
  emit('tab-change', tabName);
};

const handlePurchase = () => {
  emit('purchase', cartItem);
};

const handleToggleBookmark = () => {
  emit('toggle-bookmark');
};

const handleAddToCart = () => {
  emit('add-to-cart', cartItem);
};

const goToTeacher = () => {
  emit('go-to-teacher', props.courseData?.teacher_id ?? '');
};
</script>

<style scoped>
:deep(.n-tabs-nav) {
  @apply max-w-114 mx-auto;
}

:deep(.n-tabs-nav-scroll-content) {
  @apply flex justify-between;
}

:deep(.n-tabs-wrapper) {
  @apply w-full p-0;
}

:deep(.n-tabs .n-tabs-tab) {
  @apply transition-none;
}

:deep(.n-tabs-tab) {
  @apply h-10 py-2 px-0 text-white/60 text-4 font-400 transition-[color,background-color] m-0 flex items-center justify-center w-[calc(456px/5)];
}

:deep(.n-tabs-tab:hover) {
  @apply text-primary-default;
}

:deep(.n-tabs-tab__label) {
  @apply transition-colors text-inherit;
}

:deep(.n-tabs-tab:hover .n-tabs-tab__label) {
  @apply text-primary-default;
}

:deep(.n-tabs-tab--active) {
  @apply text-primary-light font-500 border-b-2 border-solid border-primary-light;
}

:deep(.n-tabs-tab--active .n-tabs-tab__label) {
  @apply text-primary-light;
}

:deep(.n-tabs-bar) {
  @apply hidden;
}

:deep(.n-tabs .n-tabs-nav.n-tabs-nav--line-type.n-tabs-nav--top .n-tabs-nav-scroll-content) {
  @apply border-none;
}
</style>
