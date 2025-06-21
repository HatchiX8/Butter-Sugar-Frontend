<template>
  <div class="w-full">
    <div class="mb-8">
      <typography class="text-white mb-2" size="h3">課程評價</typography>
      <div v-if="!courseRatingStore.loading && !courseRatingStore.error && courseRatingStore.totalRatings > 0" class="flex items-center gap-4 mb-4">
        <div class="flex items-center">
          <span class="text-2xl font-bold text-yellow-500 mr-2">{{ courseRatingStore.averageRating }}</span>
          <div class="flex">
            <span v-for="i in 5" :key="i" class="text-lg">
              <span v-if="i <= Math.round(courseRatingStore.averageRating)" class="text-yellow-500">★</span>
              <span v-else class="text-gray-300">★</span>
            </span>
          </div>
        </div>
        <span class="text-gray-600">({{ courseRatingStore.totalRatings }} 則評價)</span>
      </div>
    </div>
    <div v-if="courseRatingStore.loading" class="flex justify-center items-center py-8">
      <typography variant="paragraph-medium" font-type="content" class="text-white">載入中...</typography>
    </div>
    <div v-else-if="courseRatingStore.error" class="flex justify-center items-center py-8">
      <typography variant="paragraph-medium" font-type="content" class="text-red-500">{{ courseRatingStore.error }}</typography>
    </div>
    <div v-else-if="courseRatingStore.totalRatings === 0" class="flex justify-center items-center py-8">
      <typography variant="paragraph-medium" font-type="content" class="text-gray-500">此課程尚無評價</typography>
    </div>
    <div v-else>
      <ReviewList :reviewList="courseRatingStore.reviewList" :pageSize="showAllReviews ? expandedPageSize : collapsedPageSize" @update:showAll="showAllReviews = $event" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import typography from '@/components/layout/typography.vue';
import ReviewList from '../../../../components/layout/reviewList.vue';
import { useCourseRatingStore } from '../../../../stores/models/courseRating/store';

// Props 定義
const props = defineProps({
  courseId: {
    type: String,
    required: true
  }
});

const collapsedPageSize = 3; // 預設顯示 3 筆
const expandedPageSize = 10; // 展開後每頁顯示 10 筆

// 使用評價 store
const courseRatingStore = useCourseRatingStore();
// Using store properties directly instead of destructuring to maintain reactivity
const showAllReviews = ref(false);

// 監聽 courseId prop 變化，重新獲取資料
watch(
  () => props.courseId,
  (newId) => {
    if (newId) {
      courseRatingStore.fetchRatingsByCourseId(newId);
    }
  },
  { immediate: true }
);
</script>

<style scoped>
/* 分頁樣式已移至 ReviewList 元件中 */
</style>
