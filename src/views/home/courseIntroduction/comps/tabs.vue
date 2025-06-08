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
        <n-tab name="faq">
          <span class="text-white">常見問答</span>
        </n-tab>
        <n-tab name="questions" @click="scrollToSection('course-qa')">
          <span class="text-white">課程問答</span>
        </n-tab>
        <n-tab name="reviews">
          <span class="text-white">課程評價</span>
        </n-tab>
      </n-tabs>

      <div class="flex flex-col items-center mx-auto p-6 max-w-[1280px] w-full box-border mt-15">
        <notify v-if="showNotify" />

        <courseInfo :course-data="props.courseData" @purchase="handlePurchase" @toggle-bookmark="handleToggleBookmark" />
      </div>

    </div>

    <div v-if="activeTab === 'info' || activeTab === 'chapters' || activeTab === 'questions'" class="tab-content">
      <!-- 常見問答 content -->
      <h2 class="text-white">課程資訊</h2>
      <h2 class="text-white">章節內容</h2>
      <h2 class="text-white">課程問答</h2>
      <!-- Add your FAQ content here -->
    </div>

    <!-- Tab content for FAQ and Reviews -->
    <div v-if="activeTab === 'faq'" class="tab-content">
      <!-- 常見問答 content -->
      <h2 class="text-white">常見問答</h2>
      <!-- Add your FAQ content here -->
    </div>

    <div v-else-if="activeTab === 'reviews'" class="tab-content">
      <!-- 課程評價 content -->
      <h2 class="text-white">課程評價</h2>
      <!-- Add your reviews content here -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import notify from './notify.vue';
import courseInfo from './courseInfo.vue';

const props = defineProps({
  courseData: {
    type: Object,
    required: false,
    default: () => ({})
  }
});

const showNotify = ref(true);
const activeTab = ref('info');

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const emit = defineEmits(['tab-change', 'purchase', 'toggle-bookmark']);

const handleTabChange = (tabName: string) => {
  activeTab.value = tabName;
  // Emit event to parent component to handle tab content change for all tabs
  emit('tab-change', tabName);
};

const handlePurchase = () => {
  emit('purchase');
};

const handleToggleBookmark = () => {
  emit('toggle-bookmark');
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
