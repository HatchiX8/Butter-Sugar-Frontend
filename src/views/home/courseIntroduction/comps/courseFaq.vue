<template>
  <div id="course-qa" class="flex flex-col gap-10 w-full">
    <typography variant="h2" font-type="title" class="text-white" underline>課程問答</typography>

    <!-- 留言輸入區 (只有登入用戶才能看到) -->
    <div v-if="isLoggedIn" class="border-1 border-solid border-white/20 p-6 bg-neutral_500 mb-6">
      <div class="flex items-start gap-4 mb-4">
        <div class="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <img
            class="w-full h-full"
            style="object-fit: cover; object-position: center;"
            src="@/assets/images/course/teacher.jpg"
            alt="用戶頭像"
          />
        </div>
        <div class="flex-grow">
          <n-input
            v-model:value="commentText"
            type="textarea"
            placeholder="輸入您的問題或留言..."
            :autosize="{ minRows: 3, maxRows: 6 }"
            class="mb-3"
          />
          <div class="flex justify-end">
            <n-button type="primary" @click="submitComment" :disabled="!commentText.trim()">
              <typography variant="paragraph-medium" font-type="content" class="text-white">送出</typography>
            </n-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 未登入提示區 -->
    <div v-if="!isLoggedIn" class="border-1 border-solid border-white/20 p-6 bg-neutral_500 flex flex-col items-center">
      <div class="i-ion:person-circle-outline text-primary-light text-8xl mb-4"></div>
      <typography variant="h5" font-type="title" class="text-white mb-2">請先登入後留言</typography>
      <typography variant="paragraph-regular" font-type="content" class="text-neutral-200 mb-4">登入後即可參與課程問答，與講師及其他學員互動</typography>
      <n-button type="primary" size="large" class="px-8" @click="onGoogleLogin">
        <typography variant="paragraph-medium" font-type="content" class="text-white">登入/註冊</typography>
      </n-button>
    </div>

    <!-- 問答列表元件 (所有用戶都能看到) -->
    <QnAList
      :qaList="qaList"
      :defaultPageSize="defaultPageSize"
      :expandedPageSize="expandedPageSize"
      :initialShowAll="showAllQa"
      @update:showAll="showAllQa = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/models/index';
import typography from '@/components/layout/typography.vue';
import { NButton, NInput } from 'naive-ui';
import QnAList from '@/components/layout/qaList.vue';

// ----------第三方登入----------
const API_BASE = import.meta.env.VITE_API_URL;
const onGoogleLogin = () => {
  window.location.href = `${API_BASE}/api/v1/users/auth/google`;
};

// 使用 pinia 的 userStore 來判斷登入狀態
const userStore = useUserStore();
const isLoggedIn = computed(() => userStore.isLoggedIn);
const commentText = ref('');

// 分頁相關狀態
const showAllQa = ref(false); // 控制顯示全部問答還是預設數量
const defaultPageSize = 5; // 預設每頁顯示 5 筆
const expandedPageSize = 10; // 展開後每頁顯示 10 筆

// 課程問答資料
const qaList = ref([
  {
    user: {
      name: '小乖貓',
      date: '2025/06/08 13:23:36'
    },
    question: '請問，沒有發酵箱，會教其他的替代方案嗎？',
    answer: {
      name: '許燁堂',
      date: '2025/06/09 10:29:45',
      role: '授課講師',
      content: '會教簡易的家用發酵方式。'
    }
  },
  {
    user: {
      name: 'Seris',
      date: '2025/05/14 00:23:36'
    },
    question: '請問我可以使用手持攪拌機來打麵糰嗎？',
    answer: {
      name: '許燁堂',
      date: '2025/06/09 10:29:45',
      role: '授課講師',
      content: '不建議使用手持攪拌機，課程中會提供手揉靜置的方式，讓沒有攪拌機的同學也能製作麵包。'
    }
  },
  {
    user: {
      name: 'Seris',
      date: '2025/05/14 00:23:36'
    },
    question: '請問我可以使用手持攪拌機來打麵糰嗎？',
  },
  {
    user: {
      name: 'Seris',
      date: '2025/05/14 00:23:36'
    },
    question: '請問我可以使用手持攪拌機來打麵糰嗎？',
    answer: [{
      name: '許燁堂',
      date: '2025/06/09 10:29:45',
      role: '授課講師',
      content: '不建議使用手持攪拌機，課程中會提供手揉靜置的方式，讓沒有攪拌機的同學也能製作麵包。'
    },{
      name: 'Seris',
      date: '2025/06/09 10:29:45',
      content: '感謝您的回覆'
    }]
  },
  {
    user: {
      name: 'Seris',
      date: '2025/05/14 00:23:36'
    },
    question: '請問我可以使用手持攪拌機來打麵糰嗎？',
  },
]);

// 處理留言提交
const submitComment = () => {
  if (!commentText.value.trim()) return;

  // 這裡可以添加提交留言到後端的邏輯
  // 目前僅做前端模擬
  alert('留言已送出：' + commentText.value);
  commentText.value = ''; // 清空輸入框
};
</script>

<style scoped>
/* 分頁樣式已移至 QnAList 元件中 */
</style>
