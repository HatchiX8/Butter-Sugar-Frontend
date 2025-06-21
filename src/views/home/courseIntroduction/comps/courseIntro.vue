<template>
  <div id="course-info" class="flex flex-col gap-6 w-full">
    <typography variant="h2" font-type="title" class="text-white" underline>課程簡介</typography>

    <!-- 使用相對定位包裝所有內容，以便實現半透明效果 -->
    <div class="intro-content relative">
      <!-- 設置最大高度並添加溢出隱藏 -->
      <div 
        ref="contentRef" 
        class="intro-text" 
        :class="{'max-h-400px overflow-hidden': !showFullContent && isContentOverflow}"
      >
        <!-- 課程描述 -->
        <typography variant="paragraph-medium" font-type="content" class="text-white mb-6">
          {{ props.courseData.course_description }}
        </typography>

        <!-- 課程描述圖片 -->
        <div v-if="props.courseData.course_description_imageUrl" class="mb-6">
          <img 
            :src="props.courseData.course_description_imageUrl || ''" 
            alt="課程描述圖片" 
            class="w-full h-auto"
          >
        </div>

        <!-- 適合對象 -->
        <div class="mb-6" v-if="props.courseData.suitable_for">
          <typography variant="h6" font-type="title" class="text-white mb-5">適合對象</typography>
          <typography variant="paragraph-medium" font-type="content" class="text-white mb-1">
            {{ props.courseData.suitable_for }}
          </typography>
        </div>

        <!-- 課程大綱 -->
        <div class="mb-6" v-if="props.courseData.course_goal">
          <typography variant="h6" font-type="title" class="text-white mb-5">課程大綱</typography>
          <typography variant="paragraph-medium" font-type="content" class="text-white mb-1 whitespace-pre-line">
            {{ props.courseData.course_goal }}
          </typography>
        </div>
      </div>
      
      <!-- 半透明效果覆蓋層 -->
      <div 
        v-if="!showFullContent && isContentOverflow" 
        class="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent"
      ></div>
      
      <!-- 顯示更多內容按鈕 -->
      <div 
        v-if="isContentOverflow" 
        class="flex justify-center mt-4"
      >
        <n-button size="large" class="px-3 py-6 max-w-164px" @click="toggleContent">
          <div class="flex items-center gap-1">
            <typography variant="paragraph-regular" font-type="content" class="text-neutral-100">
              {{ showFullContent ? '收起內容' : '顯示更多內容' }}
            </typography>
            <div :class="[showFullContent ? 'i-ion:arrow-up-outline' : 'i-ion:arrow-down-outline', 'cursor-pointer w-5 h-5']"></div>
          </div>
        </n-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import typography from '@/components/layout/typography.vue';
import { NButton } from 'naive-ui';
import type { CourseData } from '@/types/course';
import { ref, onMounted, nextTick } from 'vue';

// 定義 props 接收課程資料
const props = defineProps({
  courseData: {
    type: Object as () => CourseData,
    required: true
  }
});

// 控制內容顯示狀態
const showFullContent = ref(false);
const isContentOverflow = ref(false);
const contentRef = ref<HTMLElement | null>(null);

// 切換內容顯示狀態
const toggleContent = () => {
  showFullContent.value = !showFullContent.value;
};

// 檢查內容是否超過 400px 高度
const checkContentHeight = async () => {
  await nextTick();
  if (contentRef.value) {
    // 獲取內容高度
    const contentHeight = contentRef.value.scrollHeight;
    // 如果內容高度超過 400px，設置 isContentOverflow 為 true
    isContentOverflow.value = contentHeight > 400;
  }
};

// 組件掛載後檢查內容高度
onMounted(async () => {
  await checkContentHeight();
});
</script>
