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
            <n-collapse-item :key="chapter.id">
              <template #header>
                <div class="flex w-full items-center justify-around">
                  <p class="mr-3 font-bold text-white">第 {{ index + 1 }} 章</p>
                  <div class="w-40%">
                    <baseInput type="text" v-model="chapter.title" @click.stop />
                  </div>
                  <div class="ml-auto">
                    <n-button
                      @click.stop="editChapter(chapter.order, chapter.title)"
                      class="mr-4 rounded-md border-none px-4 py-2"
                      type="primary"
                    >
                      編輯
                    </n-button>
                    <n-button
                      @click.stop="deleteChapter(chapter.order)"
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
                    {{ element.title }}
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
      :chapter-num="chapterNum"
      :chapter-title="chapterTitle"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
// import { useDashboardStore } from '@/stores/models/index';
import draggable from 'vuedraggable';
import videoModal from './videoModal.vue';
import { baseInput } from '@/components/index';

// ----------Type----------
interface Section {
  id: string;
  title: string;
}

interface chapter {
  id: string;
  order: number; // 可調整
  title: string;
  sections: Section[];
}
// ------------------------

// ----------Store----------
// const dashboardStore = useDashboardStore();
// -------------------------

// 模擬章節資料

// ----------章節----------
const chapters = ref<chapter[]>([]); // 章節內容
const chapterCount = ref(chapters.value.length + 1); // 章節計數器
const isChange = ref<boolean>(false); // 資料是否變化
const chapterNum = ref<number>(0);
const chapterTitle = ref<string>('準備工作'); // 章節標題
// 監聽章節變化
watch(
  chapters,
  (newVal) => {
    console.log('小節順序發生變化', newVal);
    isChange.value = true;
    updateChapterOrder();
  },
  { deep: true }
);

// 章節API請求
const apiFn = () => {
  console.log('觸發更新api');
  isChange.value = false;
};

// 更新章節順序
const updateChapterOrder = () => {
  chapters.value.forEach((chapter, index) => {
    chapter.order = index + 1; // 從 1 開始編
  });
};

const onChapterDragEnd = () => {
  updateChapterOrder();
  isChange.value = true;
  console.log('章節重新排序完畢', chapters.value);
};
// -----------------------

// ----------章節按鈕事件----------
// 編輯章節按鈕
const editChapter = (num: number, title: string) => {
  console.log('觸發編輯按扭', num);
  chapterNum.value = num;
  chapterTitle.value = title;
  modelValue.value = true;
};

// 刪除章節按鈕
const deleteChapter = (chapterId: number) => {
  console.log('觸發刪除按扭', chapterId);
  chapters.value = chapters.value.filter((chapter) => chapter.order !== chapterId);

  // 清除「內容為空的章節」或「無效物件」
  chapters.value = chapters.value.filter(
    (chapter) => chapter && typeof chapter === 'object' && Object.keys(chapter).length > 0
  );

  updateChapterOrder(); // 更新章節順序
};

// 新增章節按鈕
const addChapter = () => {
  const newChapter = {
    id: '後端回傳ID',
    order: chapters.value.length + 1,
    title: `準備工作`,
    sections: [],
  };
  chapters.value.push(newChapter);
  updateChapterOrder(); // 更新章節順序
  chapterCount.value++;
};

// 儲存章節編輯
const saveChapter = () => {
  console.log('儲存章節編輯', chapters.value);
  apiFn();
};
// ------------------------------

// -----------彈跳視窗-----------
const modelValue = ref(false);

// const handleAddTitle = async (title: string) => {
//   courseTitle.value = title;
//   console.log('成功寫入', courseTitle.value);
//   const courseId = await props.request({
//     type: 'addTitle',
//     payload: title,
//   });
//   titleId.value = courseId;
// };
// -----------------------------
</script>

<style scoped>
.chapterDesc li {
  padding: 10px 0;
  list-style: disc;
}
</style>
