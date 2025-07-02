<template>
  <div class="w-full">
    <typography class="mb-6 text-white" variant="h2" font-type="title" underline>
      課程評價
    </typography>

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
          :disabled="!isValid"
          @click="submitRating"
          class="bg-green-500 hover:bg-green-600"
        >
          完成送出
        </n-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import typography from '@/components/layout/typography.vue';
import { NButton, NInput, useMessage } from 'naive-ui';

const props = defineProps<{
  courseId: string;
}>();

// 評分相關狀態
const rating = ref(0);
const comment = ref('');
const isSubmitting = ref(false);
const message = useMessage();

// 表單驗證
const isValid = computed(() => rating.value > 0 && comment.value.trim().length > 0);

// 監聽 courseId 變化，重置表單
watch(() => props.courseId, () => {
  resetForm();
});

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

    // TODO: 實際的 API 調用，這裡先模擬成功
    await new Promise(resolve => setTimeout(resolve, 1000));

    message.success('評價提交成功！');
    resetForm();
  } catch {
    message.error('評價提交失敗，請稍後再試');
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
/* 自定義星星樣式 */
.text-yellow-400 {
  color: #FFD700;
}
</style>
