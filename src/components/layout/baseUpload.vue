<template>
  <div class="flex ">
    <img
      v-if="previewUrl"
      :src="previewUrl"
      :alt="previewAlt"
      :class="previewClass"
    />
    <n-upload
      :show-file-list="false"
      accept="image/*"
      :before-upload="handleBeforeUpload"
      :custom-request="() => {}"
    >
      <baseButton :label="uploadButtonText" icon="i-ion:cloud-upload-outline" iconPosition="right" class="m-4" />
    </n-upload>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import baseButton from '@/components/layout/baseButton.vue';

const props = defineProps<{
  // 由父層透過 v-model 綁定：可能是 File，也可能是舊的圖片 URL
  value?: File | string;
  // 上傳按鈕文字
  uploadButtonText?: string;
  // 預覽圖 alt
  previewAlt?: string;
  // 預覽圖 class
  previewClass?: string;
}>();

const emit = defineEmits(['update:value']);

// 預設文字 / 樣式
const uploadButtonText = props.uploadButtonText ?? '上傳圖片';
const previewAlt       = props.previewAlt       ?? '圖片預覽';
const previewClass     = props.previewClass     ?? 'mt-2 h-16 w-16 object-cover';

// 預覽圖片
const previewUrl = ref<string>('');

// 舊的本地圖片
const lastBlobUrl = ref<string | null>(null);

watch(
  () => props.value, (val) => {
    console.log('props.value changed:', val)

    // 清除上一個 blob URL
    if (lastBlobUrl.value) {
      URL.revokeObjectURL(lastBlobUrl.value);
      lastBlobUrl.value = null;
    }

    // 若是 URL 字串（例如編輯時載入舊頭像）
    if (typeof val === 'string') {
      // 舊圖片 URL
      previewUrl.value = val;
    } else if (val instanceof File) {
      // 新上傳圖片
      const blob = URL.createObjectURL(val);
      previewUrl.value = blob;
      lastBlobUrl.value = blob;
    } else {
      // 清空
      previewUrl.value = '';
    }
  },
  { immediate: true },
);

// 攔截檔案，不自動上傳
const handleBeforeUpload = (data: { file: File }) => {
  console.log('選到檔案：', data.file);

  // 回傳 File 給父層
  emit('update:value', data.file);
  // return false 讓 n-upload 停止內建的自動上傳流程
  return false;
};
</script>
