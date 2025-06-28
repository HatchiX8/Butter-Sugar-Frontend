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
    <n-collapse class="mb-3">
      <n-collapse-item v-for="(chapter, index) in chapters" :key="chapter.id">
        <template #header>
          <div class="flex w-full items-center justify-around">
            <p class="mr-3 font-bold text-white">第 {{ index + 1 }} 章</p>
            <p class="font-bold text-white">
              {{ chapter.title }}
            </p>
            <div class="ml-auto">
              <button
                @click.stop="editChapter(chapter.id)"
                class="bg-secondaryLight mr-4 rounded-md border-none px-4 py-2 text-white"
              >
                編輯
              </button>
              <button
                @click.stop="deleteChapter(chapter.id)"
                class="bg-secondaryDefault mr-4 rounded-md border-none px-4 py-2 text-white"
              >
                移除
              </button>
            </div>
          </div>
        </template>

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
    </n-collapse>

    <div class="w-40% my-5">
      <button
        class="bg-secondaryLight mr-4 rounded-md border-none px-4 py-3 text-white"
        @click="addChapter"
      >
        新增章節
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
// 在 setup script 中引入
import draggable from 'vuedraggable';

// 模擬章節資料

const chapters = ref([
  {
    id: 'chapter-1',
    title: '準備工作',
    sections: [
      { id: 's1', title: '介紹' },
      { id: 's2', title: '設備準備' },
    ],
  },
  {
    id: 'chapter-2',
    title: '基礎實作',
    sections: [
      { id: 's3', title: '材料準備' },
      { id: 's4', title: '流程講解' },
    ],
  },
  {
    id: 'chapter-3',
    title: '進階挑戰',
    sections: [
      { id: 's5', title: '常見錯誤' },
      { id: 's6', title: '補充資料' },
    ],
  },
]);

watch(
  chapters,
  (newVal) => {
    console.log('小節順序發生變化', newVal);
    // 呼叫 API 傳送最新資料
    apiFn();
  },
  { deep: true }
);

// ----------章節----------
const chapterCount = ref(chapters.value.length + 1);
// -----------------------
// ----------章節按鈕事件----------
// 編輯章節按鈕
const editChapter = (courseId: string) => {
  console.log('觸發編輯按扭', courseId);
};

// 刪除章節按鈕
const deleteChapter = (chapterId: string) => {
  console.log('觸發刪除按扭', chapterId);
  chapters.value = chapters.value.filter((chapter) => chapter.id !== chapterId);

  // 清除「內容為空的章節」或「無效物件」
  chapters.value = chapters.value.filter(
    (chapter) => chapter && typeof chapter === 'object' && Object.keys(chapter).length > 0
  );
};

// 新增章節按鈕
const addChapter = () => {
  const newChapter = {
    id: `chapter-${chapterCount.value}`,
    title: `準備工作`,
    sections: [],
  };
  chapters.value.push(newChapter);
  chapterCount.value++;
};
// ------------------------------

// 這邊之後要設定參數的interface
const apiFn = () => {
  console.log('觸發更新api');
};
</script>
<style scoped>
.chapterDesc li {
  padding: 10px 0;
  list-style: disc;
}
</style>
