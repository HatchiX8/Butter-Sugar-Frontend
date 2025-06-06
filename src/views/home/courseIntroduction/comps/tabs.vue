<template>
  <div>
    <div class="tabs-container">
      <n-tabs
        type="line"
        v-model:value="activeTab"
        @update:value="handleTabChange"
        justify-content="space-between"
      >
        <n-tab name="info" @click="scrollToSection('course-info')">
          <span>課程資訊</span>
        </n-tab>
        <n-tab name="chapters" @click="scrollToSection('chapter-content')">
          <span>章節內容</span>
        </n-tab>
        <n-tab name="faq">
          <span>常見問答</span>
        </n-tab>
        <n-tab name="questions" @click="scrollToSection('course-qa')">
          <span>課程問答</span>
        </n-tab>
        <n-tab name="reviews">
          <span>課程評價</span>
        </n-tab>
      </n-tabs>
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
import { ref } from 'vue';

const activeTab = ref('info');

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const handleTabChange = (tabName: string) => {
  activeTab.value = tabName;
  // Emit event to parent component to handle tab content change for all tabs
  const emit = defineEmits(['tab-change']);
  emit('tab-change', tabName);
};

</script>

<style scoped>
.tabs-container {
  @apply px-6 mt-15;
}

.n-tab span {
  @apply text-white;
}

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
  @apply h-10 py-2 px-0 text-white/60 text-4 font-400 transition-[color,background-color] m-0;
  width: calc(456px / 5); /* 平均分配寬度 */
  @apply flex items-center justify-center;
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
