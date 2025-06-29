<template>
  <div class="qa-module bg-nature_200 mt-5 box-border w-full space-y-6 p-6 shadow-md">
    <!-- 加載狀態 -->
    <div v-if="isLoading" class="py-10 text-center">
      <n-spin size="large" />
      <p class="mt-3 text-white">正在加載問題...</p>
    </div>

    <template v-else>
      <!-- 錯誤提示 -->
      <div v-if="hasError" class="bg-red-500 my-4 p-4 rounded text-white">
        {{ errorMessage }}
      </div>

      <!-- 篩選 ↓ -->
      <div class="flex justify-end">
        <n-select
          v-model:value="filterOption"
          :options="filterOptions"
          placeholder="篩選問題"
          size="medium"
          class="mb-6 w-full md:w-48"
        />
      </div>

      <!-- 新增提問 ↓ -->
      <div class="mb-10 flex flex-col items-center gap-4 md:flex-row">
        <n-input
          v-model:value="newQuestion"
          type="textarea"
          rows="2"
          placeholder="請輸入問題"
          class="bg-neutral_500 border-neutral_500 flex-1 text-white"
        />
        <n-button type="primary" @click="addQuestion" :loading="isSubmitting"> 提交 </n-button>
      </div>

      <!-- 留言列表 ↓ -->
      <ul class="space-y-4">
        <li
          v-for="(qa, index) in filteredQaList"
          :key="qa.question_id || index"
          class="border-b-neutral_500 border-b px-6 py-4"
        >
          <!-- 問題 (提問者) -->
          <div class="flex items-start space-x-4">
            <img
              :src="qa.user.profile_image_url || qa.user.avatar || defaultAvatar"
              class="mr-3 h-12 w-12 flex-shrink-0 rounded-full object-cover"
              alt="用戶頭像"
            />
            <div class="flex-1">
              <div class="flex items-center space-x-2">
                <span class="mr-3 text-lg font-bold text-white">{{ qa.user.name }}</span>
                <span class="text-sm text-gray-400">{{ qa.user.date }}</span>
                <n-tag 
                  :type="hasAnswer(qa) ? 'success' : 'error'" 
                  size="small" 
                  class="ms-4"
                >
                  {{ hasAnswer(qa) ? '已回答' : '未回答' }}
                </n-tag>
              </div>
              <p class="mt-2 text-gray-200">{{ qa.question }}</p>
            </div>
          </div>

          <!-- 回覆 (多筆) -->
          <div
            v-for="(answer, rIdx) in getAnswers(qa)"
            :key="rIdx"
            class="ml-16 mt-4 flex items-start space-x-4"
          >
            <img
              :src="answer.profile_image_url || answer.avatar || defaultAvatar"
              class="h-12 w-12 flex-shrink-0 rounded-full object-cover mr-3"
              alt="用戶頭像"
            />
            <div class="bg-neutral_500 flex-1 rounded-md p-4">
              <div class="flex items-center space-x-2">
                <span class="font-medium text-white mr-3">{{ answer.name }}</span>
                <span class="text-sm text-gray-400">{{ answer.date }}</span>
                <n-tag 
                  v-if="answer.role" 
                  size="small" 
                  class="ms-3 bg-primaryDefault text-white"
                >
                  {{ answer.role }}
                </n-tag>
              </div>
              <p class="mt-2 break-words text-gray-100">{{ answer.content }}</p>
            </div>
          </div>

          <!-- 回覆輸入框 ↓ -->
          <div class="mt-3 border-none ps-5 md:w-full">
            <div>
              <n-input
                v-model:value="replyDraft[index]"
                type="textarea"
                rows="2"
                placeholder="輸入回覆"
                class="bg-neutral_500 border-neutral_600 flex-1 text-white"
              />
            </div>
            <div class="mt-3 flex justify-end">
              <n-button size="small" @click="cancelReply(index)" class="mr-2">取消</n-button>
              <n-button 
                size="small" 
                type="primary" 
                :loading="replySubmitting[index]" 
                @click="submitReply(index, qa.question_id || '')"
              > 
                回覆 
              </n-button>
            </div>
          </div>
        </li>
      </ul>

      <!-- 空狀態提示 -->
      <div v-if="qaList.length === 0" class="py-10 text-center text-white">
        <p>目前還沒有任何問題，成為第一個提問者吧！</p>
      </div>

      <!-- 底部顯示全部 -->
      <div v-if="qaList.length > 0" class="mt-8 text-center">
        <n-button size="medium" @click="showAll"> 顯示全部問題 ({{ qaList.length }}) </n-button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { NSelect, NInput, NButton, NTag, NSpin } from 'naive-ui';
import { useCourseQAStore } from '@/stores/models/courseQA/store';
import type { Answer } from '@/api/courseQa/type';
import type { QA } from '@/api/courseQa/type';

// 接收課程 ID 參數
const props = defineProps<{
  courseId: string;
}>();

// 預設頭像
const defaultAvatar = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';

/* ---------- 狀態 ---------- */
const filterOption = ref('');
const newQuestion = ref('');
const replyDraft = ref<string[]>([]);
const isSubmitting = ref(false);
const replySubmitting = ref<boolean[]>([]);

// 取得 store
// const userStore = useUserStore(); // 暫時不需要使用 userStore
const courseQAStore = useCourseQAStore();

// 課程問題列表
const qaList = computed(() => courseQAStore.qaList[props.courseId] || []);

// 載入狀態
const isLoading = computed(() => courseQAStore.isLoading[props.courseId] || false);

// 錯誤狀態
const hasError = computed(() => courseQAStore.hasError[props.courseId] || false);

// 錯誤訊息
const errorMessage = computed(() => courseQAStore.errorMessage[props.courseId] || '');

// 網頁加載後尋找問題列表
onMounted(async () => {
  // 初始化回覆草稿陣列
  replySubmitting.value = new Array(qaList.value.length).fill(false);
  replyDraft.value = new Array(qaList.value.length).fill('');
  
  // 載入課程問題
  await fetchQuestions();
});

// 當 qaList 變更時，更新草稿陣列
watch(qaList, () => {
  replySubmitting.value = new Array(qaList.value.length).fill(false);
  replyDraft.value = new Array(qaList.value.length).fill('');
});

/* ---------- 方法 ---------- */
// 加載課程問題
const fetchQuestions = async () => {
  if (props.courseId) {
    await courseQAStore.fetchCourseQA(props.courseId);
  }
};

// 篩選選項
const filterOptions = [
  { label: '所有問題', value: '' },
  { label: '已回答', value: 'answered' },
  { label: '未回答', value: 'unanswered' },
  { label: '新到舊', value: 'newest' },
  { label: '舊到新', value: 'oldest' },
];

// 篩選問題列表
const filteredQaList = computed(() => {
  let list = [...qaList.value];
  
  switch (filterOption.value) {
    case 'newest':
      list.sort((a, b) => {
        const dateA = new Date(a.user.date).getTime();
        const dateB = new Date(b.user.date).getTime();
        return dateB - dateA;
      });
      break;
    case 'oldest':
      list.sort((a, b) => {
        const dateA = new Date(a.user.date).getTime();
        const dateB = new Date(b.user.date).getTime();
        return dateA - dateB;
      });
      break;
    case 'answered':
      list = list.filter(item => hasAnswer(item));
      break;
    case 'unanswered':
      list = list.filter(item => !hasAnswer(item));
      break;
    default:
      break;
  }
  
  return list;
});

/* ---------- 新增提問 ---------- */
const addQuestion = async () => {
  const questionText = newQuestion.value.trim();
  if (!questionText || !props.courseId) return;
  
  isSubmitting.value = true;
  try {
    const success = await courseQAStore.submitQuestion(props.courseId, questionText);
    if (success) {
      newQuestion.value = '';
      // 重新載入問題列表
      await fetchQuestions();
    }
  } finally {
    isSubmitting.value = false;
  }
};

/* ---------- 回覆邏輯 ---------- */
const cancelReply = (idx: number): void => {
  replyDraft.value[idx] = '';
};

const submitReply = async (idx: number, questionId: string) => {
  const replyText = replyDraft.value[idx].trim();
  if (!replyText || !props.courseId || !questionId) return;
  
  replySubmitting.value[idx] = true;
  try {
    const success = await courseQAStore.submitAnswer(props.courseId, questionId, replyText);
    if (success) {
      replyDraft.value[idx] = '';
      // 重新載入問題列表
      await fetchQuestions();
    }
  } finally {
    replySubmitting.value[idx] = false;
  }
};

// 判斷問題是否有回答
const hasAnswer = (qa: QA): boolean => {
  if (!qa.answer) return false;
  if (Array.isArray(qa.answer)) return qa.answer.length > 0;
  return true;
};

// 取得問題的回答陣列
const getAnswers = (qa: QA): Answer[] => {
  if (!qa.answer) return [];
  if (Array.isArray(qa.answer)) return qa.answer;
  return [qa.answer];
};

/* ---------- 其他 ---------- */
const showAll = (): void => {
  filterOption.value = '';
};
</script>

<style scoped>
.qa-module {
  background-color: #2b2b2b;
} /* 深色底 */
</style>
