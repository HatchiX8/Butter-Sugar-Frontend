<template>
  <div>
    <div class="mb-5">
      <p>「幫助學生循序漸進地學習！」</p>
      <p>
        清楚的課程架構能讓學生更容易學習。請先規劃好章節與單元，每個章節可以包含多個影片、講義或測驗內容。
      </p>
      <ul>
        <li>
          <p>每個章節應該有清楚的學習目標</p>
        </li>
        <li>
          <p>盡量將影片單元控制在 10-20 分鐘 內，避免學生疲勞</p>
        </li>
        <li>
          <p>您可以加入 PDF 配方表、食譜，幫助學生更好地學習</p>
        </li>
        <li>
          <p>確保影片畫質至少 1080p，聲音清晰，沒有雜音</p>
        </li>
        <li>
          <p>可以使用手機或相機錄製，但請確保燈光充足，畫面穩定</p>
        </li>
        <li>
          <p>影片格式請使用MP4 格式檔案</p>
        </li>
      </ul>
    </div>
    <!-- 章節列表 -->
    <n-collapse class="mb-3">
      <n-collapse-item v-for="chapter in chapters" :key="chapter.id">
        <template #header>
          <div class="flex w-full items-center justify-around">
            <div class="font-bold text-white">
              {{ chapter.title }}
            </div>
            <div class="ml-auto"><button @click.stop="editChapter(chapter.id)">編輯</button></div>
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
    <div>
      <div class="w-40% mb-5">
        <button>新增章節</button>
      </div>
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
    title: '第一章：準備工作',
    sections: [
      { id: 's1', title: '介紹' },
      { id: 's2', title: '設備準備' },
    ],
  },
  {
    id: 'chapter-2',
    title: '第二章：基礎實作',
    sections: [
      { id: 's3', title: '材料準備' },
      { id: 's4', title: '流程講解' },
    ],
  },
  {
    id: 'chapter-3',
    title: '第三章：進階挑戰',
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
    apiFn(newVal);
  },
  { deep: true }
);

const editChapter = (courseId: string) => {
  console.log('觸發編輯按扭', courseId);
};

// 這邊之後要設定參數的interface
const apiFn = (val) => {
  console.log('觸發更新api', val);
};
</script>
