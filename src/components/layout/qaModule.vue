<template>
  <div class="qa-module w-full p-6 bg-nature_200 shadow-md space-y-6 mt-5 box-border">
    <!-- 篩選 ↓ -->
    <div class="flex justify-end">
      <n-select
        v-model:value="filterOption"
        :options="filterOptions"
        placeholder="篩選留言"
        size="medium"
        class="w-full md:w-48 mb-6"
      />
    </div>

    <!-- 新增提問 ↓ -->
    <div class="flex flex-col md:flex-row items-center gap-4 mb-10">
      <n-input
        v-model:value="newQuestion"
        type="textarea"
        rows="2"
        placeholder="請輸入問題"
        class="flex-1 bg-neutral_500 border-neutral_500 text-white"
      />
      <n-button type="primary" @click="addQuestion">
        提交
      </n-button>
    </div>

    <!-- 留言列表 ↓ -->
    <ul class="space-y-4">
      <li
        v-for="(item, index) in filteredQaList"
        :key="index"
        class="px-6 py-4 border-b border-b-neutral_500"
      >
        <!-- 問題 (提問者) -->
        <div class="flex items-start space-x-4">
          <img
            :src="item.avatarUrl"
            class="w-12 h-12 rounded-full object-cover flex-shrink-0 mr-3"
          />
          <div class="flex-1">
            <div class="flex items-center space-x-2">
              <span class="text-white text-lg font-bold mr-3">問題者{{ item.author }}</span>
              <span class="text-gray-400 text-sm">{{ item.timestamp }}</span>
              <n-tag :type="item.resolved ? 'success' : 'error'" size="small">
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
          class="flex items-start space-x-4 mt-4 ml-16"
        >
          <img
            :src="reply.avatarUrl || item.avatarUrl"
            class="w-12 h-12 rounded-full object-cover flex-shrink-0"
          />
          <div class="flex-1 bg-neutral_500 p-4 rounded-md">
            <div class="flex items-center space-x-2">
              <span class="text-white font-medium">{{ reply.author }}</span>
              <span class="text-gray-400 text-sm">{{ reply.timestamp }}</span>
              <n-tag v-if="reply.isTeacher" size="small">授課講師</n-tag>
            </div>
            <p class="mt-2 text-gray-100 break-words">{{ reply.content }}</p>
          </div>
        </div>

        <!-- 回覆輸入框 ↓ -->
        <div class="md:w-full ps-5 mt-3 border-none">
          <div>
            <n-input
              v-model:value="replyDraft[index]"
              type="textarea"
              rows="2"
              placeholder="輸入回覆"
              class="flex-1 bg-neutral_500 border-neutral_600 text-white"
            />
          </div>
          <div class="flex justify-end mt-3">
            <n-button size="small" @click="cancelReply(index)" class="mr-2">取消</n-button>
            <n-button size="small" type="primary" @click="submitReply(index)">
              回覆
            </n-button>
          </div>
        </div>
      </li>
    </ul>

    <!-- 底部顯示全部 -->
    <div class="text-center mt-8">
      <n-button size="medium" @click="showAll">
        顯示全部留言 ({{ qaList.length }})
      </n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Ref } from 'vue'
import { NSelect, NInput, NButton, NTag } from 'naive-ui'

/* ---------- 型別 ---------- */
interface Reply {
  author: string
  timestamp: string
  content: string
  isTeacher: boolean
  avatarUrl?: string
}
interface QaItem {
  avatarUrl?: string
  author: string
  question: string
  timestamp: string
  resolved: boolean
  replies: Reply[]
}

/* ---------- 狀態 ---------- */
const filterOption = ref('')
const newQuestion  = ref('')

// 主列表
const qaList: Ref<QaItem[]> = ref([])

// 一筆一個 draft
const replyDraft = ref<string[]>([])

/* ---------- 初始化 (localStorage) ---------- */
const saved = localStorage.getItem('qaList')
if (saved) {
  qaList.value = JSON.parse(saved)
}
onMounted(() => {
  // 確保每筆都有 replies
  qaList.value.forEach(q => { if (!Array.isArray(q.replies)) q.replies = [] })
  replyDraft.value = qaList.value.map(() => '')
})
/* ---------- 篩選 ---------- */
const filterOptions = [
  { label: '所有留言', value: '' },
  { label: '新到舊',   value: 'newest' },
  { label: '舊到新',   value: 'oldest' },
  { label: '已解決',   value: 'resolved' },
  { label: '未解決',   value: 'unresolved' }
]
const filteredQaList = computed(() => {
  let list = [...qaList.value]
  switch (filterOption.value) {
    case 'newest':   list.sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp)); break
    case 'oldest':   list.sort((a, b) => Date.parse(a.timestamp) - Date.parse(b.timestamp)); break
    case 'resolved': list = list.filter(i => i.resolved);   break
    case 'unresolved': list = list.filter(i => !i.resolved); break
    default: break
  }
  return list
})

/* ---------- 新增提問 ---------- */
const addQuestion = (): void => {
  const q = newQuestion.value.trim()
  if (!q) return
  qaList.value.push({
    avatarUrl: '',            // TODO: 換成登入者頭像
    author: '小乖貓',          // TODO: 換成登入者名稱
    question: q,
    timestamp: new Date().toLocaleString(),
    resolved: false,
    replies: []
  })
  newQuestion.value = ''
  syncStorageAndBackend()
}

/* ---------- 回覆邏輯 ---------- */
const cancelReply = (idx: number): void => {
  replyDraft.value[idx] = ''
}

const submitReply = (idx: number): void => {
  const txt = replyDraft.value[idx].trim()
  if (!txt) return
  const now = new Date().toLocaleString()
  qaList.value[idx].replies.push({
    author: '許燁堂',         // TODO: 換成登入者名稱
    timestamp: now,
    content: txt,
    isTeacher: true,          // 若非講師就改 false
    avatarUrl: ''             // TODO: 換成講師頭像
  })
  qaList.value[idx].resolved = true
  replyDraft.value[idx] = ''
  syncStorageAndBackend()
}

/* ---------- 儲存 ---------- */
const syncStorageAndBackend = async (): Promise<void> => {
  localStorage.setItem('qaList', JSON.stringify(qaList.value))
}

/* ---------- 其他 ---------- */
const showAll = (): void => {
  filterOption.value = ''
}
</script>

<style scoped>
.qa-module { background-color: #2b2b2b; } /* 深色底 */
</style>
