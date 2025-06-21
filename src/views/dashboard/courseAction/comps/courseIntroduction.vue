<template>
  <div>
    <div class="mb-5">
      <p class="fw-bold text-primaryDefault">「撰寫一個吸引人的課程簡介」</p>
      <br />
      <ul class="introDesc line-height-5 pl-6">
        <li>課程名稱：簡單明瞭，能夠立即傳達課程主題。</li>
        <li>課程簡介：用幾句話概述課程內容，強調獨特價值。</li>
        <li>適合對象：明確說明此課程適合哪些學員，如初學者、進階學員或專業人士。</li>
        <li>課程長度與章節：說明學習時間，幫助學生規劃學習進度。</li>
        <li>學習收穫：告知學生完成課程後能夠掌握的技能與應用。</li>
        <li>課程圖片：視覺是學生對課程的第一印象，請選擇一張專屬於課程的封面</li>
      </ul>
    </div>
    <div class="w-100% mb-5">
      <div class="mb-5">
        <p class="mb-3 fw-bold text-primaryDefault">課程名稱</p>
        <baseInput type="text" placeholder="請輸入課程名稱" v-model="courseTitle" />
      </div>
      <div class="w-100% mb-5">
        <p class="mb-3 fw-bold text-primaryDefault">課程類別</p>
        <n-space vertical>
          <n-select v-model:value="optionsValue" :options="options" placeholder="請選擇類別" />
        </n-space>
      </div>
    </div>

    <div v-show="courseTitle && optionsValue" class="w-40%">
      <div class="mb-5">
        <p class="mb-3 fw-bold text-primaryDefault">課程描述</p>
        <n-input type="text" placeholder="請輸入課程描述" class="bg-black focus:outline-none" />
      </div>
      <div class="mb-5">
        <p class="mb-3 fw-bold text-primaryDefault">課程圖片</p>
        <div class="h-50 w-50 bg-yellow-900">圖片內容</div>
      </div>

      <div class="mb-5">
        <p class="mb-3 fw-bold text-primaryDefault">課程簡介</p>
        <n-input type="text" placeholder="請輸入課程簡介" class="bg-black focus:outline-none" />
      </div>
      <div class="mb-5">
        <p class="mb-3 fw-bold text-primaryDefault">課程簡介說明圖片</p>
        <div class="mb-5 flex gap-3">
          <div class="w-50 h-40 bg-yellow-900">圖片內容</div>
          <div class="w-50 h-40 bg-yellow-900">圖片內容</div>
        </div>
      </div>

      <div class="mb-5">
        <p class="mb-3 fw-bold text-primaryDefault">課前準備</p>
        <p>預告片</p>
        <div class="flex items-center justify-between">
          <!-- 左邊：已上傳影片 (這邊你之後可以放影片預覽 或 file name 等) -->
          <div v-show="isVideo" class="mr-4 flex-1">
            <n-upload
              ref="videoUploadRef"
              accept="video/mp4"
              :max="1"
              :custom-request="customVideoUpload"
              :show-file-list="true"
              :show-trigger="false"
              @remove="handleVideoRemove"
            />
          </div>
          <div v-show="!isVideo">尚未選擇影片</div>
          <!-- 右邊：上傳按鈕 -->
          <div>
            <n-button @click="triggerVideoUpload">上傳影片</n-button>
          </div>
        </div>
      </div>

      <div class="mb-5">
        <p class="mb-3 fw-bold text-primaryDefault">課程講義</p>
        <div class="flex items-center justify-between">
          <!-- 左邊：已上傳影片 (這邊你之後可以放影片預覽 或 file name 等) -->
          <div v-show="isFile" class="mr-4 flex-1">
            <n-upload
              ref="fileUploadRef"
              accept="video/mp4,application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              :max="1"
              :custom-request="customFileUpload"
              :show-file-list="true"
              :show-trigger="false"
              @remove="handleFileRemove"
            />
          </div>
          <div v-show="!isFile">尚未選擇檔案</div>
          <!-- 右邊：上傳按鈕 -->
          <div>
            <n-button @click="triggerFileUpload">上傳檔案</n-button>
          </div>
        </div>
      </div>

      <div class="mb-5">
        <p class="mb-3 fw-bold text-primaryDefault">適合對象</p>
        <n-input type="text" placeholder="請輸入適合對象" class="bg-black focus:outline-none" />
      </div>
      <div class="mb-5">
        <p class="mb-3 fw-bold text-primaryDefault">課程目標</p>
        <n-input type="text" placeholder="請輸入課程目標" class="bg-black focus:outline-none" />
      </div>
    </div>
  </div>
  <titleModal
    :modelValue="modelValue"
    v-model:inputValue="courseTitle"
    title="請輸入課程標題"
    :showFooter="true"
    :onConfirm="handleConfirm"
    @update:modelValue="(val) => emit('update:modelValue', val)"
    @update:title="modalTitle = $event"
    @update:type="(val) => (optionsValue = val)"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import titleModal from './titleModal.vue';
import { baseInput } from '@/components/index';
import type { AddChildRequestPayload } from '@/views/dashboard/type';
const route = useRoute();

// -----------彈跳視窗-----------
const isEditMode = computed(() => Boolean(route.query.id)); // 有 id 就代表是編輯
const modelValue = ref(false);
const courseTitle = ref<string>('');
const modalTitle = ref('');

onMounted(() => {
  console.log('檢視路由ID', isEditMode.value);
  if (!isEditMode.value && courseTitle.value === '') {
    modelValue.value = true;
  }
});

const handleConfirm = () => {
  console.log('觸發新增標題', modalTitle.value);
  courseTitle.value = modalTitle.value;
  console.log('成功寫入', courseTitle.value);
  // 這邊請求寫入titleAPI
  emit('request', {
    type: 'addTitle',
    payload: courseTitle.value,
  });
};
// -----------------------------

// -----------emit&props-----------
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'request', payload: AddChildRequestPayload): void;
}>();
// -----------------------------

// -----------下拉選單-----------
const options = [
  { label: '麵包', value: 1 },
  { label: '蛋糕', value: 2 },
  { label: '餅乾', value: 3 },
];
const optionsValue = ref();

watch(optionsValue, (newVal, oldVal) => {
  if (newVal && newVal !== oldVal) {
    console.log('觸發存檔請求API', newVal);
    emit('request', {
      type: 'addCategory',
      payload: newVal,
    });
  } else {
    return;
  }
});
// -----------------------------

// -----------影片上傳-----------
const videoUploadRef = ref();
const isVideo = ref(false);
const triggerVideoUpload = () => {
  // 拿到內部 input element 手動 click
  const inputEl = videoUploadRef.value?.$el?.querySelector('input[type="file"]');
  if (inputEl) {
    inputEl.click();
  } else {
    console.warn('找不到 input element');
  }
};

const customVideoUpload = () => {
  console.log('影片後續API函式');
  isVideo.value = true;
};

const handleVideoRemove = () => {
  console.log('使用者移除影片');
  isVideo.value = false;
};
// -----------------------------

// -----------檔案上傳-----------
const fileUploadRef = ref();
const isFile = ref(false);
const triggerFileUpload = () => {
  // 拿到內部 input element 手動 click
  const inputEl = fileUploadRef.value?.$el?.querySelector('input[type="file"]');
  if (inputEl) {
    inputEl.click();
  } else {
    console.warn('找不到 input element');
  }
};

const customFileUpload = () => {
  console.log('檔案後續API函式');
  isFile.value = true;
};

const handleFileRemove = () => {
  console.log('使用者移除檔案');
  isFile.value = false;
};
// -----------------------------

// -----------區塊-----------
// -----------------------------
</script>
<style scoped>
.introDesc li{
  padding: 10px 0;
  list-style: disc;
}
</style>