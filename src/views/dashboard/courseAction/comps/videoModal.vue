<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-modal v-model:show="show" :mask-closable="false">
      <n-card
        :title="`第 ${chapterNum} 節 : ${chapterTitle}`"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
        closable
        @close="show = false"
        class="mx-auto my-0 w-[80%] md:m-auto md:w-[650px]"
      >
        <n-scrollbar class="max-h-50vh" trigger="hover">
          <div class="mb-5 pr-5">
            <p class="fw-bold text-primaryDefault mb-3">第{{ chapterNum }}節</p>
            <n-collapse class="mb-5 p-2" v-for="(chapter, index) in chapters" :key="chapter.id">
              <div class="mb-2 flex items-center">
                <p class="mr-5 text-nowrap">{{ chapterNum }}-{{ index + 1 }}</p>
                <div class="w-full">
                  <baseInput type="text" v-model="chapter.title" @click.stop />
                </div>
              </div>
              <div>
                <p>影片</p>
                <div class="flex items-center justify-between">
                  <!-- 左邊：已上傳影片 (這邊你之後可以放影片預覽 或 file name 等) -->
                  <div v-show="isVideoMap[chapter.id]" class="mr-4 flex-1">
                    <n-upload
                      :ref="(el) => setVideoUploadRef(chapter.id, el)"
                      accept="video/mp4"
                      :max="1"
                      :custom-request="(options) => courseVideoUpload(options, chapter.id)"
                      :show-file-list="!!isVideoMap[chapter.id]"
                      :show-trigger="false"
                      @remove="() => handleVideoRemove(chapter.id)"
                    />
                  </div>
                  <div v-show="!isVideoMap[chapter.id]">尚未選擇影片</div>
                  <!-- 右邊：上傳按鈕 -->
                  <div>
                    <n-button @click="() => triggerVideoUpload(chapter.id)">上傳影片</n-button>
                    <n-button
                      type="error"
                      secondary
                      @click="() => removeSmallChapter(chapter.id)"
                      class="ml-2"
                    >
                      移除小節
                    </n-button>
                  </div>
                </div>
              </div>
            </n-collapse>
          </div>
        </n-scrollbar>
        <n-button
          class="rounded-md border-none px-4 py-2"
          type="primary"
          @click="addSmallChapter"
          strong
          secondary
        >
          新增小節
        </n-button>
        <template #footer v-if="showFooter">
          <div class="mt-4 flex justify-end gap-2">
            <n-button type="primary" @click="submitSmallChapter">確定</n-button>
            <n-button @click="() => emit('update:modelValue', false)">取消</n-button>
          </div>
        </template>
      </n-card>
    </n-modal>
  </n-config-provider>
</template>

<script setup lang="ts">
// ----------import----------
// 套件
import { ref, watch } from 'vue';
import { NUpload } from 'naive-ui';
// store

// 共用型別
import type { UploadCustomRequestOptions } from 'naive-ui';
import type { ComponentPublicInstance } from 'vue';
// 元件
import { baseInput } from '@/components/index';
import { hexToRgba, themeColors } from '@/utils';
// 商業邏輯

// ---------------------------

// -----------props&emit-----------
interface Props {
  modelValue: boolean;
  detail?: string;
  showFooter?: boolean;
  chapterTitle?: string;
  chapterNum?: number;
}

const props = withDefaults(defineProps<Props>(), {
  detail: '',
  showFooter: true,
  chapterNum: 1,
  chapterTitle: '準備工作',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

// --------------------------------

// ----------Type----------

interface chapter {
  id: number;
  title: string;
  video: string;
}
// ------------------------

// -----------彈跳視窗-----------
const show = ref(props.modelValue);

// 因為需要內部關閉視窗，所以採用雙監聽方式
watch(
  () => props.modelValue,
  (val) => (show.value = val)
);
// 外部傳進來時 → 同步到內部
watch(show, (val) => emit('update:modelValue', val)); // 內部操作時 → 通知外部更新
// ------------------------------

// ----------章節----------
const chapters = ref<chapter[]>([{ id: 1, title: '準備工作', video: '123' }]); // 章節內容
const smallChapterCount = ref(chapters.value.length + 1); // 章節計數器
const isChange = ref(false); // 資料是否變化

// 監聽章節變化
watch(
  chapters,
  (newVal) => {
    console.log('小節順序發生變化', newVal);
    isChange.value = true;
  },
  { deep: true }
);

// 章節API請求
const apiFn = () => {
  console.log('課程小節更新api');
  isChange.value = false;
};
// -----------------------

// ----------小節按鈕事件----------
// 新增章節按鈕
const addSmallChapter = () => {
  const newChapter = {
    id: smallChapterCount.value,
    title: `新增小節`,
    video: '測測',
  };
  chapters.value.push(newChapter);
  smallChapterCount.value++;
};

const removeSmallChapter = (chapterId: number) => {
  chapters.value = chapters.value.filter((chapter) => chapter.id !== chapterId);

  // 移除對應的上傳元件與影片狀態
  delete videoUploadRefs.value[chapterId];
  delete isVideoMap.value[chapterId];
};

const submitSmallChapter = () => {
  console.log('儲存送出小節');
  apiFn();
  emit('update:modelValue', false);
};
// -------------------------------

// -----------影片上傳-----------

const videoUploadRefs = ref<Record<number, InstanceType<typeof NUpload> | null>>({});

const isVideoMap = ref<Record<number, boolean>>({});

const setVideoUploadRef = (chapterId: number, el: Element | ComponentPublicInstance | null) => {
  if (!videoUploadRefs.value) videoUploadRefs.value = {};
  videoUploadRefs.value[chapterId] = el as InstanceType<typeof NUpload> | null;
};

const triggerVideoUpload = (chapterId: number) => {
  const uploadRef = videoUploadRefs.value[chapterId];
  if (uploadRef) {
    uploadRef.openOpenFileDialog(); // ✅ 改成這個才不會報錯
  } else {
    console.warn('找不到該章節的上傳元件');
  }
};

const courseVideoUpload = async (options: UploadCustomRequestOptions, chapterId: number) => {
  const { file, onFinish, onError } = options;

  try {
    console.log('上傳檔案：', file);
    isVideoMap.value[chapterId] = true;
    addCourseVideo();
    onFinish?.();
  } catch (err) {
    console.log('上傳失敗', err);
    onError?.();
  }
};

const handleVideoRemove = (chapterId: number) => {
  deleteTrailer();
  isVideoMap.value[chapterId] = false;
};

const deleteTrailer = async () => {
  // const res = await apiDelete_DeleteTrailer(titleId.value);
  deleteCourseVideo();
};

const addCourseVideo = () => {
  console.log('新增課程影片API');
  // 這邊可以呼叫新增課程影片的API
};

const deleteCourseVideo = () => {
  console.log('刪除課程影片API');
  // 這邊可以呼叫刪除課程影片的API
};
// -----------------------------

// ----------樣式-----------
const colors = themeColors.colors;
const themeOverrides = {
  Card: {
    colorModal: colors.neutral_600,
    titleTextColor: colors.primaryDefault,
    titleFontWeight: '700',
    textColor: colors.white,
    boxShadow: `0 0 10px ${hexToRgba(colors.primaryDefault, 0.8)}`,
  },
};
// -------------------------
</script>
