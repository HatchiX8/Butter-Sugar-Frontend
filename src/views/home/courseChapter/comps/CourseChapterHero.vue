<template>
  <div class="w-full bg-blackbox-border py-8">
    <div class="mx-auto flex w-full max-w-[1280px] flex-col gap-8 px-4 md:flex-row md:gap-4">
      <!-- 左側：章節資訊 -->
      <div class="w-full md:w-1/2 flex flex-col justify-center items-center">
        <div v-if="section" class="mb-4 text-xl font-bold text-white">
          {{ section.main_section_title }}
        </div>
        <div v-if="subsection" class="mb-6 text-2xl font-bold text-primaryDefault">
          {{ subsection.subsection_title }}：{{ subsection.order_index }}/{{ section?.subsections.length }}
        </div>
        <n-button
          type="primary"
          size="large"
          class="w-40 mt-4"
          @click="$emit('start-learning')"
        >
          開始上課
        </n-button>
      </div>
      <!-- 右側：圖片 -->
      <div class="w-full pt-4 md:pt-0 md:w-1/2 flex items-center justify-center">
        <div class="aspect-video w-full max-w-[400px] bg-gray-700 rounded-md overflow-hidden shadow-lg md:max-w-[500px]">
          <img
            :src="courseImageUrl || '/images/default-course-cover.jpg'"
            alt="課程封面"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { NButton } from 'naive-ui';

defineProps<{
  section: {
    id: string;
    main_section_title: string;
    order_index: number;
    subsections: Array<{
      id: string;
      subsection_title: string;
      order_index: number;
    }>;
  } | null;
  subsection: {
    id: string;
    subsection_title: string;
    order_index: number;
  } | null;
  courseImageUrl?: string;
}>();

defineEmits(['start-learning']);
</script>
