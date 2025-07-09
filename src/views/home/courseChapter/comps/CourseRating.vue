<template>
  <div class="w-full">
    <typography class="mb-6 text-white" variant="h2" font-type="title" underline>
      課程評價
    </typography>

    <n-spin :show="loading">
      <div class="rounded-lg border border-white/20 bg-blackbox p-8">
        <p class="mb-6 text-lg text-white">請分享你的課程心得及留下評價吧!</p>

        <div class="mb-6">
          <div class="mb-2 flex items-center">
            <span class="mr-4 text-white">課程評分</span>
            <span class="text-red-500">*</span>
          </div>
          <div class="flex items-center">
            <div class="flex">
              <div
                v-for="i in 5"
                :key="i"
                class="cursor-pointer text-2xl"
                @click="rating = i"
              >
                <span v-if="i <= rating" class="text-yellow-400 ms-2">★</span>
                <span v-else class="text-yellow-400/30 ms-2">☆</span>
              </div>
            </div>
          </div>
        </div>

        <div class="mb-6">
          <div class="mb-2 flex items-center">
            <span class="mr-4 text-white">課程評價</span>
            <span class="text-red-500">*</span>
          </div>
          <div class="relative">
            <n-input
              v-model:value="comment"
              type="textarea"
              placeholder="分享您對這堂課的看法..."
              :autosize="{ minRows: 4, maxRows: 8 }"
              class="rounded-md"
              maxlength="500"
            />
            <div class="absolute bottom-2 right-2 text-gray-400">
              {{ comment.length }}/500
            </div>
          </div>
        </div>

        <div class="flex justify-end">
          <n-button
            type="primary"
            size="large"
            :loading="isSubmitting"
            :disabled="!isValid || isSubmitting"
            @click="submitRating"
            class="bg-green-500 hover:bg-green-600"
          >
            {{ hasUserRated ? '更新評價' : '完成送出' }}
          </n-button>
        </div>

        <!-- 顯示其他用戶評價 -->
        <div v-if="reviewList.length > 0" class="mt-8">
          <div class="mb-4 border-b border-white/20 pb-2">
            <p class="text-lg text-white">{{ totalRatings }} 則評價 · 平均評分 {{ averageRating }}</p>
          </div>
          
          <div v-for="(review, index) in reviewList" :key="index" class="mb-6 border-b border-white/20 pb-4 last:border-b-0">
            <div class="mb-2 flex items-center">
              <span class="mr-2 font-bold text-white">{{ review.user.name }}</span>
              <span class="text-gray-400">{{ review.user.date }}</span>
            </div>
            <div class="mb-2 flex">
              <span v-for="i in 5" :key="i" class="text-lg">
                <span v-if="i <= review.rating" class="text-yellow-400">★</span>
                <span v-else class="text-yellow-400/30">☆</span>
              </span>
            </div>
            <p class="text-white">{{ review.content }}</p>
          </div>
        </div>
      </div>
    </n-spin>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue';
import typography from '@/components/layout/typography.vue';
import { NButton, NInput, NSpin, useMessage } from 'naive-ui';
import { useCourseRatingStore } from '@/stores/models/courseRating/store';

const props = defineProps<{
  courseId: string;
}>();

// 初始化 store
const courseRatingStore = useCourseRatingStore();
const message = useMessage();

// 評分相關狀態
const rating = ref(0);
const comment = ref('');
const isSubmitting = ref(false);
const loading = computed(() => courseRatingStore.loading);

// 從 store 獲取數據
const reviewList = computed(() => courseRatingStore.reviewList);
const totalRatings = computed(() => courseRatingStore.totalRatings);
const averageRating = computed(() => courseRatingStore.averageRating);
const hasUserRated = computed(() => courseRatingStore.hasUserRatedCourse(props.courseId));

// 表單驗證
const isValid = computed(() => rating.value > 0 && comment.value.trim().length > 0);

// 監聽 courseId 變化，重新獲取評價並重置表單
watch(() => props.courseId, async (newCourseId) => {
  if (newCourseId) {
    await fetchRatings();
    loadUserRating();
  }
});

// 獲取課程評價
const fetchRatings = async () => {
  if (props.courseId) {
    await courseRatingStore.fetchRatingsByCourseId(props.courseId);
  }
};

// 載入用戶評價
const loadUserRating = () => {
  const userRating = courseRatingStore.getUserRatingForCourse(props.courseId);
  if (userRating) {
    rating.value = Number(userRating.rating_score);
    comment.value = userRating.review_text;
  } else {
    resetForm();
  }
};

// 重置表單
const resetForm = () => {
  rating.value = 0;
  comment.value = '';
};

// 提交評價
const submitRating = async () => {
  if (!isValid.value) return;
  
  try {
    isSubmitting.value = true;
    
    let result;
    if (hasUserRated.value) {
      // 更新評價
      result = await courseRatingStore.updateRating(
        props.courseId,
        rating.value,
        comment.value
      );
    } else {
      // 新增評價
      result = await courseRatingStore.addRating(
        props.courseId,
        rating.value,
        comment.value
      );
    }
    
    if (result.success) {
      message.success(result.message || '評價提交成功！');
      // 不需要重置表單，因為我們希望顯示用戶的評價
    } else {
      message.error(result.message || '評價提交失敗');
    }
  } catch {
    message.error('評價提交失敗，請稍後再試');
  } finally {
    isSubmitting.value = false;
  }
};

// 組件掛載時獲取評價
onMounted(async () => {
  if (props.courseId) {
    await fetchRatings();
    loadUserRating();
  }
});
</script>

<style scoped>
/* 自定義星星樣式 */
.text-yellow-400 {
  color: #FFD700;
}
</style>
