<template>
  <div id="course-review" class="flex flex-col gap-10 w-full">
    <typography variant="h2" font-type="title" class="text-white" underline>課程評價</typography>

    <!-- 評價列表元件 -->
    <ReviewList
      :reviewList="reviewList"
      :defaultPageSize="defaultPageSize"
      :expandedPageSize="expandedPageSize"
      :initialShowAll="showAllReviews"
      @update:showAll="showAllReviews = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import typography from '@/components/layout/typography.vue';
import ReviewList from '../../../../components/layout/reviewList.vue';

// 分頁相關狀態
const showAllReviews = ref(false); // 控制顯示全部評價還是預設數量
const defaultPageSize = 5; // 預設每頁顯示 5 筆
const expandedPageSize = 10; // 展開後每頁顯示 10 筆

// 課程評價資料
const reviewList = ref([
  {
    user: {
      name: '小乖',
      date: '2025/06/08 13:23:36'
    },
    rating: 5.0,
    content: '老師講得太清楚了，第一次嘗試做水星餡餅不再那麼可怕！'
  },
  {
    user: {
      name: '正義',
      date: '2025/06/08 13:23:36'
    },
    rating: 5.0,
    content: '這堂課讓我完全改觀！以前總覺得做水星餡餅太難處理，但老師的講解超清楚，搭配有作品集片段教學，這次我終於成功做出新鮮的拖鞋麵包，真的太有成就感了！'
  },
  {
    user: {
      name: 'Mike',
      date: '2025/06/08 13:23:36'
    },
    rating: 5.0,
    content: '跟著步驟做出來的拖鞋麵包，朋友都以為是麵包店買的！'
  },
  {
    user: {
      name: '伊宇',
      date: '2025/06/08 13:23:36'
    },
    rating: 5.0,
    content: '課程不只是學技術，還教會我如何製作麵團的訣竅，老師與學員互動很頻繁，讓我終於搞懂平常常常解釋不清楚的問題，現在每次出爐都有成就感！'
  },
  {
    user: {
      name: '建宏',
      date: '2025/06/08 13:23:36'
    },
    rating: 5.0,
    content: '老師很細心，這會解釋失敗的原因，真的超有收穫！'
  },
  {
    user: {
      name: 'Mike',
      date: '2025/06/08 13:23:36'
    },
    rating: 5.0,
    content: '對於已經有掌握基礎的人來說，部分內容算是入門，但在發酵控制與麵團處理的細節上還是有不少收穫，尤其是講解水星餡餅操作的部分很有幫助。'
  },
  {
    user: {
      name: '正義',
      date: '2025/06/08 13:23:36'
    },
    rating: 5.0,
    content: '這堂課讓我完全改觀！以前總覺得做水星餡餅太難處理，但老師的講解超清楚，搭配有作品集片段教學，這次我終於成功做出新鮮的拖鞋麵包，真的太有成就感了！'
  },
  {
    user: {
      name: 'Mike',
      date: '2025/06/08 13:23:36'
    },
    rating: 5.0,
    content: '跟著步驟做出來的拖鞋麵包，朋友都以為是麵包店買的！'
  },
  {
    user: {
      name: '伊宇',
      date: '2025/06/08 13:23:36'
    },
    rating: 5.0,
    content: '課程不只是學技術，還教會我如何製作麵團的訣竅，老師與學員互動很頻繁，讓我終於搞懂平常常常解釋不清楚的問題，現在每次出爐都有成就感！'
  },
  {
    user: {
      name: '建宏',
      date: '2025/06/08 13:23:36'
    },
    rating: 5.0,
    content: '老師很細心，這會解釋失敗的原因，真的超有收穫！'
  },
  {
    user: {
      name: 'Mike',
      date: '2025/06/08 13:23:36'
    },
    rating: 5.0,
    content: '對於已經有掌握基礎的人來說，部分內容算是入門，但在發酵控制與麵團處理的細節上還是有不少收穫，尤其是講解水星餡餅操作的部分很有幫助。'
  },
]);
</script>

<style scoped>
/* 分頁樣式已移至 ReviewList 元件中 */
</style>
