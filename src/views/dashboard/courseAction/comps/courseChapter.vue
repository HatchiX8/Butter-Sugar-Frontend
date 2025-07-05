<template>
  <div>
    <div class="line-height-5 mb-5">
      <p class="fw-bold text-primaryDefault">「幫助學生循序漸進地學習！」</p>
      <p class="py-5">
        清楚的課程架構能讓學生更容易學習。請先規劃好章節與單元，每個章節可以包含多個影片、講義或測驗內容。
      </p>
      <ul class="chapterDesc pl-6">
        <li>每個章節應該有清楚的學習目標</li>
        <li>盡量將影片單元控制在 10-20 分鐘 內，避免學生疲勞</li>
        <li>您可以加入 PDF 配方表、食譜，幫助學生更好地學習</li>
        <li>確保影片畫質至少 1080p，聲音清晰，沒有雜音</li>
        <li>可以使用手機或相機錄製，但請確保燈光充足，畫面穩定</li>
        <li>影片格式請使用MP4 格式檔案</li>
      </ul>
    </div>
    <!-- 章節列表 -->
    <div v-if="chapters.length > 0">
      <n-collapse class="mb-3">
        <draggable v-model="chapters" item-key="id" :animation="200" @end="onChapterDragEnd">
          <template #item="{ element: chapter, index }">
            <n-collapse-item :key="chapter.section_id">
              <template #header>
                <div class="flex w-full items-center justify-around">
                  <p class="mr-3 font-bold text-white">第 {{ index + 1 }} 章</p>
                  <div class="w-40%">
                    <baseInput type="text" placeholder="請輸入章節標題" v-model="chapter.main_section_title" @click.stop />
                  </div>
                  <div class="ml-auto">
                    <n-button
                      @click.stop="
                        editChapter(
                          chapter.order_index,
                          chapter.main_section_title,
                          chapter.section_id
                        )
                      "
                      class="mr-4 rounded-md border-none px-4 py-2"
                      type="primary"
                    >
                      編輯
                    </n-button>
                    <n-button
                      @click.stop="deleteChapter(chapter.section_id, chapter.order_index)"
                      class="mr-4 rounded-md border-none px-4 py-2"
                      type="error"
                    >
                      移除
                    </n-button>
                  </div>
                </div>
              </template>

              <!-- 小節列表 -->
              <draggable
                v-model="chapter.sections"
                item-key="id"
                :group="{ name: 'sections' }"
                animation="200"
              >
                <template #item="{ element }">
                  <li class="mb-2 rounded border bg-gray-700 p-2 text-white">
                    {{ element.subsection_title }}
                  </li>
                </template>
              </draggable>
            </n-collapse-item>
          </template>
        </draggable>
      </n-collapse>
    </div>
    <div v-show="isChange" class="text-red ml-5">資料尚未儲存，請注意</div>
    <div class="my-5 flex w-full">
      <n-button
        class="bg-secondaryLight ml-auto mr-4 rounded-md border-none px-4 py-3"
        @click="saveChapter"
        v-show="isChange"
        type="primary"
      >
        儲存編輯
      </n-button>
    </div>
    <div class="my-5 flex w-full">
      <n-button type="primary" class="bg-secondaryDefault mr-4 rounded-md border-none px-4 py-3" @click="addChapter">
        新增章節
      </n-button>
    </div>

    <videoModal
      v-model:modelValue="modelValue"
      title="測試"
      :showFooter="true"
      :chapterNum="chapterNum"
      :chapterTitle="chapterTitle"
      :chapterSectionId="chapterSectionId || ''"
      :subsectionsData="subsections"
      @editOver="updateChapter"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useDashboardStore } from '@/stores/models/index';
import draggable from 'vuedraggable';
import videoModal from './videoModal.vue';
import { baseInput } from '@/components/index';
import {
  apiPost_AddChapter,
  apiDelete_RemoveChapter,
  apiGet_GetChapter,
  apiGet_GetSubsections,
  apiPatch_ChangeChaptersSubsections,
} from '@/views/dashboard/api/index';

// ----------Type----------
interface Section {
  id: string;
  subsection_title: string;
  order_index: number;
  is_preview_available: boolean;
  video_file_url?: string;
  video_duration?: number;
}

interface chapter {
  section_id: string;
  main_section_title: string;
  order_index: number; // 可調整
  sections: Section[];
}
// ------------------------

// ----------Store----------
const dashboardStore = useDashboardStore();
// -------------------------

// 模擬章節資料

// ----------章節----------
const chapters = ref<chapter[]>([]); // 章節內容
const chapterCount = ref(chapters.value.length + 1); // 章節計數器
const isChange = ref<boolean>(false); // 資料是否變化
const chapterNum = ref<number>(0); // 傳入小節給予的章節
const chapterSectionId = ref<string>();
const chapterTitle = ref<string>('準備工作'); // 章節標題
const subsections = ref<Section[]>([]); // 指定章節的小節

// 監聽章節變化
watch(
  chapters,
  () => {
    console.log('偵測到章節內容更新');
    isChange.value = true;
  },
  { deep: true }
);

// 更新章節順序
const updateChapterOrder = () => {
  chapters.value.forEach((chapter, index) => {
    chapter.order_index = index + 1; // 從 1 開始編
  });
  console.log('章節重新排序完畢', chapters.value);
};

// 拖曳完畢觸發事件
const onChapterDragEnd = () => {
  updateChapterOrder();
  isChange.value = true;
};

// -----------------------

// ----------章節按鈕事件----------
// 編輯章節按鈕
const editChapter = async (num: number, title: string, id: string) => {
  await saveChapter(); // 先進行儲存，避免編輯完畢後更新API資料遺失

  // 取得此章節底下的小節
  const res = await apiGet_GetSubsections(id);
  subsections.value = res.data.map((item): Section => ({
    id: item.id,
    subsection_title: item.subsection_title,
    order_index: item.order_index,
    is_preview_available: item.is_preview_available,
    video_file_url: item.video_file_url ?? '',
    video_duration: item.video_duration ?? 0,
  }));

  console.log('觸發編輯按扭', num);
  chapterNum.value = num;
  chapterTitle.value = title;
  chapterSectionId.value = id;
  modelValue.value = true;
};

// 刪除章節按鈕
const deleteChapter = async (chapterId: string, order_index: number) => {
  console.log('觸發刪除按扭', chapterId);
  await apiDelete_RemoveChapter(chapterId);
  chapters.value = chapters.value.filter((chapter) => chapter.order_index !== order_index);

  // 清除「內容為空的章節」或「無效物件」
  chapters.value = chapters.value.filter(
    (chapter) => chapter && typeof chapter === 'object' && Object.keys(chapter).length > 0
  );

  updateChapterOrder(); // 更新章節順序
};

// 新增章節按鈕
const addChapter = async () => {
  try {
    const postData = {
      main_section_title: '準備工作',
    };
    const res = await apiPost_AddChapter(dashboardStore.courseId, postData); // 觸發新增章節API

    const newChapter = {
      section_id: res.data.id,
      order_index: chapters.value.length + 1,
      main_section_title: res.data.main_section_title,
      sections: [],
    };
    chapters.value.push(newChapter);
    updateChapterOrder(); // 更新章節順序
    chapterCount.value++;
  } catch (err) {
    console.log('新增課程失敗', err);
  }
};

// 儲存章節編輯
const saveChapter = async () => {
  const postData = chapters.value.map((chapter, index) => ({
    id: chapter.section_id,
    main_section_title: chapter.main_section_title,
    order_index: index + 1,
    subsections: chapter.sections.map((sub, subIndex) => ({
      id: sub.id,
      section_id: chapter.section_id,
      subsection_title: sub.subsection_title,
      order_index: subIndex + 1,
      is_preview_available: sub.is_preview_available,
    })),
  }));

  await apiPatch_ChangeChaptersSubsections(dashboardStore.courseId, postData); // 觸發新增章節API
  console.log('儲存章節編輯成功');

  isChange.value = false;
};
// ------------------------------

// -----------彈跳視窗-----------
const modelValue = ref(false);

// 使用者在彈窗點擊確認後觸發更新函式
const updateChapter = async (editOverSubsections: Section[]) => {
  try {
    // 找出這次編輯的章節
    const chapterIndex = chapters.value.findIndex(
      (chapter) => chapter.section_id === chapterSectionId.value
    );
    if (chapterIndex !== -1) {
      // 將內層回傳的小節內容，更新到外層對應章節
      chapters.value[chapterIndex].sections = editOverSubsections.map((item) => ({
        id: item.id,
        subsection_title: item.subsection_title,
        order_index: item.order_index,
        is_preview_available: item.is_preview_available,
      }));
      isChange.value = true;
    }

    // 同步更新 subsections，確保下次打開彈窗是最新內容
    subsections.value = [...chapters.value[chapterIndex].sections];
    console.log('重設 subsections: ', subsections.value);
  } catch (err) {
    console.log('更新章節內容失敗', err);
  }
};
// -----------------------------

const props = defineProps<{
  courseData: {
    id: string;
    course_name: string;
    course_description: string;
  };
}>();

watch(
  () => props.courseData.id,
  async (courseId) => {
    if (courseId) {
      const res = await apiGet_GetChapter(courseId);
      const rawSections = res.data;
      chapters.value = rawSections.map((section) => ({
        section_id: section.id,
        main_section_title: section.main_section_title,
        order_index: section.order_index,
        sections: section.subsections.map((sub) => ({
          id: sub.id,
          subsection_title: sub.subsection_title,
          order_index: sub.order_index,
          is_preview_available: sub.is_preview_available,
        })),
      }));
      console.log('章節資料: ', chapters.value)
    }
  },
  { immediate: true } // 確保初次也會觸發
);
</script>

<style scoped>
.chapterDesc li {
  padding: 10px 0;
  list-style: disc;
}
</style>
