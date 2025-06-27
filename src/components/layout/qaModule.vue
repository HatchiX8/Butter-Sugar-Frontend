<template>
  <div class="qa-module bg-nature_200 mt-5 box-border w-full space-y-6 p-6 shadow-md">
    <!-- 篩選 ↓ -->
    <div class="flex justify-end">
      <n-select
        v-model:value="filterOption"
        :options="filterOptions"
        placeholder="篩選留言"
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
      <n-button type="primary" @click="addQuestion"> 提交 </n-button>
    </div>

    <!-- 留言列表 ↓ -->
    <ul class="space-y-4">
      <li
        v-for="(item, index) in filteredQaList"
        :key="index"
        class="border-b-neutral_500 border-b px-6 py-4"
      >
        <!-- 問題 (提問者) -->
        <div class="flex items-start space-x-4">
          <img
            :src="item.avatarUrl"
            class="mr-3 h-12 w-12 flex-shrink-0 rounded-full object-cover"
          />
          <div class="flex-1">
            <div class="flex items-center space-x-2">
              <span class="mr-3 text-lg font-bold text-white">{{ item.author }}</span>
              <span class="text-sm text-gray-400">{{ item.timestamp }}</span>
              <n-tag :type="item.resolved ? 'success' : 'error'" size="small" class="ms-4">
                {{ item.resolved ? '已解決' : '未解決' }}
              </n-tag>
            </div>
            <p class="mt-2 text-gray-200">{{ item.question }}</p>
          </div>
        </div>

        <!-- 回覆 (多筆) -->
        <div
          v-for="(reply, rIdx) in item.replies"
          :key="rIdx"
          class="ml-16 mt-4 flex items-start space-x-4"
        >
          <img
            :src="reply.avatarUrl || item.avatarUrl"
            class="h-12 w-12 flex-shrink-0 rounded-full object-cover mr-3"
          />
          <div class="bg-neutral_500 flex-1 rounded-md p-4">
            <div class="flex items-center space-x-2">
              <span class="font-medium text-white mr-3">{{ reply.author }}</span>
              <span class="text-sm text-gray-400">{{ reply.timestamp }}</span>
              <n-tag v-if="reply.isTeacher" size="small" class="ms-3 bg-primaryDefault text-white">授課講師</n-tag>
            </div>
            <p class="mt-2 break-words text-gray-100">{{ reply.content }}</p>
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
            <n-button size="small" type="primary" @click="submitReply(index)"> 回覆 </n-button>
          </div>
        </div>
      </li>
    </ul>

    <!-- 底部顯示全部 -->
    <div class="mt-8 text-center">
      <n-button size="medium" @click="showAll"> 顯示全部留言 ({{ qaList.length }}) </n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { Ref } from 'vue';
import { NSelect, NInput, NButton, NTag } from 'naive-ui';
import { useUserStore } from '@/stores/models/user/store';
import axios from 'axios';

/* ---------- 型別 ---------- */
interface Reply {
  author: string;
  timestamp: string;
  content: string;
  isTeacher: boolean;
  avatarUrl?: string;
}
interface QaItem {
  avatarUrl?: string;
  author: string;
  question: string;
  timestamp: string;
  resolved: boolean;
  replies: Reply[];
}

/* ---------- 狀態 ---------- */
const filterOption = ref('');
const newQuestion = ref('');

// 主列表
const qaList: Ref<QaItem[]> = ref([]);

// 一筆一個 draft
const replyDraft = ref<string[]>([]);

// 獲取用戶資料
const userStore = useUserStore();
const API_BASE = import.meta.env.VITE_API_URL;

// 用戶資料
const userImage = ref('');
const userNickname = ref('');

// 獲取用戶資料
const fetchUserData = async () => {
  if (!userStore.isLoggedIn) return;

  try {
    const res = await axios.get(`${API_BASE}/api/v1/users/info`, {
      headers: { Authorization: `Bearer ${userStore.userToken}` },
    });

    // 從 API 獲取用戶資料
    const userData = res.data.data;
    userImage.value = userData.profile_image_url || '';
    userNickname.value = userData.nickname || '';
  } catch (err) {
    console.error('獲取用戶資料失敗', err);
  }
};

/* ---------- 初始化 (localStorage) ---------- */
const saved = localStorage.getItem('qaList');
if (saved) {
  qaList.value = JSON.parse(saved);
}
onMounted(() => {
  // 確保每筆都有 replies
  qaList.value.forEach((q) => {
    if (!Array.isArray(q.replies)) q.replies = [];
  });
  replyDraft.value = qaList.value.map(() => '');

  // 獲取用戶資料
  fetchUserData();
});
/* ---------- 篩選 ---------- */
const filterOptions = [
  { label: '所有留言', value: '' },
  { label: '新到舊', value: 'newest' },
  { label: '舊到新', value: 'oldest' },
  { label: '已解決', value: 'resolved' },
  { label: '未解決', value: 'unresolved' },
];
const filteredQaList = computed(() => {
  let list = [...qaList.value];
  switch (filterOption.value) {
    case 'newest':
      list.sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp));
      break;
    case 'oldest':
      list.sort((a, b) => Date.parse(a.timestamp) - Date.parse(b.timestamp));
      break;
    case 'resolved':
      list = list.filter((i) => i.resolved);
      break;
    case 'unresolved':
      list = list.filter((i) => !i.resolved);
      break;
    default:
      break;
  }
  return list;
});

/* ---------- 新增提問 ---------- */
const addQuestion = (): void => {
  const q = newQuestion.value.trim();
  if (!q) return;
  qaList.value.push({
    avatarUrl: userImage.value || '', // 使用從 API 獲取的用戶頭像
    author: userNickname.value || '匿名用戶', // 使用用戶暱稱，如果沒有則顯示匿名用戶
    question: q,
    timestamp: new Date().toLocaleString(),
    resolved: false,
    replies: [],
  });
  newQuestion.value = '';
  syncStorageAndBackend();
};

/* ---------- 回覆邏輯 ---------- */
const cancelReply = (idx: number): void => {
  replyDraft.value[idx] = '';
};

const submitReply = (idx: number): void => {
  const txt = replyDraft.value[idx].trim();
  if (!txt) return;
  const now = new Date().toLocaleString();
  qaList.value[idx].replies.push({
    author: userNickname.value || '匿名用戶', // 使用用戶暱稱，如果沒有則顯示匿名用戶
    timestamp: now,
    content: txt,
    isTeacher: userStore.role === 'teacher', // 根據用戶角色判斷是否為講師
    avatarUrl: userImage.value || '', // 使用從 API 獲取的用戶頭像
  });
  qaList.value[idx].resolved = true;
  replyDraft.value[idx] = '';
  syncStorageAndBackend();
};

/* ---------- 儲存 ---------- */
const syncStorageAndBackend = async (): Promise<void> => {
  localStorage.setItem('qaList', JSON.stringify(qaList.value));
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
