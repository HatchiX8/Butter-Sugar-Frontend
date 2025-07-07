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
            <div v-if="chapters.length">
              <n-collapse class="mb-5 p-2" v-for="(chapter, index) in chapters" :key="chapter.id">
                <div class="mb-2 flex items-center">
                  <p class="mr-5 text-nowrap">{{ chapterNum }}-{{ index + 1 }}</p>
                  <div class="w-full">
                    <baseInput type="text" placeholder="請輸入小節標題" v-model="chapter.subsection_title" @click.stop />
                  </div>
                </div>
                <div>
                  <p>影片</p>
                  <div class="flex items-center justify-between">
                    <!-- 左邊：已上傳影片 (這邊你之後可以放影片預覽 或 file name 等) -->
                    <div v-show="isVideoMap[chapter.order_index]" class="mr-4 flex-1">
                      <n-upload
                        :ref="(el) => setVideoUploadRef(chapter.order_index, el)"
                        accept="video/mp4"
                        :max="1"
                        :custom-request="
                          (options) =>
                            subsectionsVideoUpload(options, chapter.id, chapter.order_index)
                        "
                        :show-file-list="!!isVideoMap[chapter.order_index]"
                        :show-trigger="false"
                        @remove="() => handleVideoRemove(chapter.id, chapter.order_index)"
                      />
                      <video
                        v-if="videoShowMap[chapter.order_index]"
                        :src="videoShowMap[chapter.order_index]"
                        controls
                        class="mt-2 w-full max-w-md rounded-lg"
                      ></video>
                    </div>
                    <div v-show="!isVideoMap[chapter.order_index]">尚未選擇影片</div>
                    <!-- 右邊：上傳按鈕 -->
                    <div>
                      <n-button @click="() => triggerVideoUpload(chapter.order_index)"
                        >上傳影片</n-button
                      >
                      <n-button
                        type="error"
                        secondary
                        @click="() => removeSmallChapter(chapter.id, chapter.order_index)"
                        class="ml-2"
                      >
                        移除小節
                      </n-button>
                    </div>
                  </div>
                </div>
              </n-collapse>
            </div>
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
// API
import {
  apiPost_AddSubsectionsVideo,
  apiDelete_DeleteSubsectionsVideo,
  apiPost_AddSubsections,
  apiDelete_RemoveSubsections,
} from '@/views/dashboard/api/index';
// store

// 共用型別
import type { UploadCustomRequestOptions, UploadFileInfo } from 'naive-ui';
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
  chapterSectionId: string;
  subsectionsData?: Section[];
}

const props = withDefaults(defineProps<Props>(), {
  detail: '',
  showFooter: true,
  chapterNum: 1,
  chapterTitle: '準備工作',
  subsectionsData: () => [],
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'editOver', vlaue: chapter[]): void;
}>();

// --------------------------------

// ----------Type----------
interface Section {
  id: string;
  subsection_title: string;
  order_index: number;
  is_preview_available: boolean;
  video_file_url?: string;
  video_duration?: number;
};

interface chapter {
  id: string;
  subsection_title: string;
  order_index: number;
  video: string;
  is_preview_available: boolean;
};
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
const chapters = ref<chapter[]>([]); // 章節內容
const smallChapterCount = ref(0); // 章節計數器
const isChange = ref(false); // 資料是否變化

// 把小節資料傳給 chapters
watch(
  () => props.subsectionsData,
  (newVal) => {
    console.log('收到外層傳入的小節資料:', newVal);

    if (newVal && newVal.length) {
      chapters.value = newVal.map((item) => ({
        id: item.id,
        subsection_title: item.subsection_title,
        order_index: item.order_index,
        video: item.video_file_url ?? '尚未新增影片',
        is_preview_available: item.is_preview_available,
      }));
      smallChapterCount.value = newVal.length;
    }
  },
  { immediate: true }
);

// 監聽章節變化
watch(
  chapters,
  (newVal) => {
    console.log('小節順序發生變化', newVal);
    isChange.value = true;
  },
  { deep: true }
);

// -----------------------

// ----------小節按鈕事件----------
// 新增章節按鈕
const addSmallChapter = async () => {
  const postData = {
    subsection_title: '準備工作',
    is_preview_available: true,
  };

  try {
    const res = await apiPost_AddSubsections(props.chapterSectionId, postData);
    console.log('新增小節成功');

    const newChapter = {
      id: res.data.id,
      order_index: smallChapterCount.value,
      subsection_title: res.data.subsection_title,
      video: res.data.video_file_url || '尚未新增影片',
      is_preview_available: false,
    };
    chapters.value.push(newChapter);
    smallChapterCount.value++;
    emit('editOver', chapters.value); // 回傳目前章節的最新內容
  } catch (error) {
    console.log('新增小節失敗', error);
  }
};

// 移除章節
const removeSmallChapter = async (chapterId: string, order_index: number) => {
  try {
    await apiDelete_RemoveSubsections(chapterId);
    chapters.value = chapters.value.filter((chapter) => chapter.order_index !== order_index);

    // 移除對應的上傳元件與影片狀態
    delete videoUploadRefs.value[order_index];
    delete isVideoMap.value[order_index];
  } catch (err) {
    console.log('刪除章節失敗', err);
  }
};

const submitSmallChapter = () => {
  console.log('儲存送出小節');
  console.log('目前章節的最新內容', chapters.value);
  emit('editOver', chapters.value); // 回傳目前章節的最新內容
  emit('update:modelValue', false);
};
// -------------------------------

// -----------影片上傳-----------

const videoUploadRefs = ref<Record<number, InstanceType<typeof NUpload> | null>>({});

const isVideoMap = ref<Record<number, boolean>>({});
const videoShowMap = ref<Record<number, string>>({});
const videoFileListMap = ref<Record<number, UploadFileInfo[]>>({});

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

const subsectionsVideoUpload = async (
  options: UploadCustomRequestOptions,
  chapterId: string,
  order_index: number
) => {
  const { file, onFinish, onError } = options;

  try {
    console.log('上傳檔案：', file.file);
    isVideoMap.value[order_index] = true;
    if (file.file) {
      const res = await apiPost_AddSubsectionsVideo(chapterId, file.file);
      console.log('上傳成功', res);
    }
    onFinish?.();
  } catch (err) {
    console.log('上傳失敗', err);
    onError?.();
  }
};

const handleVideoRemove = (chapterId: string, order_index: number) => {
  deleteTrailer(chapterId);
  isVideoMap.value[order_index] = false;

  // 清除預覽影片
  const oldUrl = videoShowMap.value[order_index];
  if (oldUrl?.startsWith('blob:')) {
    URL.revokeObjectURL(oldUrl); // 如果是 blob 預覽就釋放資源
  }
  delete videoShowMap.value[order_index];
};

const deleteTrailer = async (chapterId: string) => {
  try {
    const res = await apiDelete_DeleteSubsectionsVideo(chapterId);
    console.log('刪除成功', res);
  } catch (err) {
    console.log(err);
  }
};

watch(
  () => props.subsectionsData,
  (newVal) => {
    if (!Array.isArray(newVal)) return;

    newVal.forEach((subsection) => {
      const orderIndex = subsection.order_index;
      const url = subsection.video_file_url;

      if (url) {
        videoShowMap.value[orderIndex] = url;
        isVideoMap.value[orderIndex] = true;
        videoFileListMap.value[orderIndex] = [{
          id: subsection.id,
          name: '影片預覽',
          status: 'finished',
          url: url || '',
        }];
      } else {
        // 沒有影片則清空狀態
        delete videoShowMap.value[orderIndex];
        isVideoMap.value[orderIndex] = false;
      }
    });
  },
  { immediate: true, deep: true }
);
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
