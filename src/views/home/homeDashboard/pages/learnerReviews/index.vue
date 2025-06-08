<template>
  <div class="bg-no-repeat bg-center"
    :class="bgClass"
    :style="{ backgroundImage: `url(${currentBgImg})` }">
    <div class="px-12 pt-15 max-w-[1200px] mx-auto  text-white">
      <typography variant="h2" font-type="title" underline class="mb-8">學員推薦</typography>

      <!-- 學員卡片 -->
      <div class="grid gap-3 justify-center grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        <learnerCardItem
          v-for="(item, index) in learners"
          :key="index"
          :avatar="item.avatar"
          :avatarAlt="item.avatarAlt"
          :name="item.name"
          :courseTitle="item.courseTitle"
          :review="item.review"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import type { Ref } from 'vue';
import learnerCardItem from '@/views/home/homeDashboard/comps/learnerCardItem.vue';
import typography from '@/components/layout/typography.vue';

interface Learner {
  avatar: string
  avatarAlt: string
  name: string
  courseTitle: string
  review: string
};

const rawLearners: Omit<Learner, 'avatarAlt'>[] = [
  {
    avatar: "https://i.postimg.cc/bJ14R3MS/baker-bread-man.jpg",
    name: 'baking_lily95',
    courseTitle: '一次學會五款基礎麵包，打好烘焙基本功！',
    review: '超適合烘焙新手！！老師真的教得很細，連手感什麼時候該轉折都有說明，跟著做五款麵包一次學會，整個超有成就感！',
  },
  {
    avatar: "https://i.postimg.cc/vHYCW7vD/berry-snacks.jpg",
    name: 'wildyeast_小魏',
    courseTitle: '健康新選擇！無麩質天然酵母麵包',
    review: '一開始是因為朋友麩質過敏，想試試看這類麵包，沒想到這堂課意外地好吃又有知識點！',
  },
  {
    avatar: "https://i.postimg.cc/02VFZ6tn/fresh-moon-cake.jpg",
    name: 'glutenfree_gaga',
    courseTitle: '職人級！一次掌握歐式麵包的高水量與發酵秘訣',
    review: '這堂課讓我對「歐式麵包」徹底改觀。原來高水量的麵糰需要掌握正確的摺疊與發酵技巧，才能烤出外酥內Q的完美口感。',
  },
  {
    avatar: "https://i.postimg.cc/Hnpv9HXF/cup-berry-dessert.jpg",
    name: '新手烘焙人_阿欣',
    courseTitle: '手作麵包輕體驗｜零失敗入門免費課',
    review: '免費的還這麼佛心！！完全是為新手設計的，有夠簡單明確，照著做根本零失敗。',
  },
  {
    avatar: "https://i.postimg.cc/2S3JtzMD/snowflake-cookies.jpg",
    name: 'dailybread_momo',
    courseTitle: '法式經典｜酥脆外皮、柔軟內裡的完美法﻿國麵包',
    review: '就是想做出外酥內軟的法國麵包才報的，結果超值～ 老師真的把溫控、水分、時間講得超細，連割線的角度都有教。',
  },
  {
    avatar: "https://i.postimg.cc/TPDsRtTN/chocolate-pudding-Three.jpg",
    name: '奶油控小P',
    courseTitle: '秒殺人氣商品！學會製作超鬆軟爆漿奶油捲',
    review: '這堂課真的太犯規！學完之後我做的奶油捲立刻在家人朋友間瘋狂被搶完，每一口都爆漿，口感超級鬆軟。',
  },
];

// 加上 avatarAlt 屬性
const learners: Learner[] = rawLearners.map((learner) => ({
  ...learner,
  avatarAlt: `${learner.name}頭像`,
}));

// 背景圖片
const bgImgUrlDesktop = new URL('@/assets/images/home/bg-plain-desktop.png', import.meta.url).href;
const bgImgUrlMobile = new URL('@/assets/images/home/bg-plain-mobile.png', import.meta.url).href;

// 監聽視窗寬度
const useWindowWidth: () => Ref<number> = () => {
  const windowWidth = ref<number>(window.innerWidth);
  const updateWidth = () => {
    windowWidth.value = window.innerWidth
  };
  onMounted(() => {
    window.addEventListener('resize', updateWidth)
  });
  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateWidth)
  });
  return windowWidth;
};

// 響應式背景圖
const windowWidth = useWindowWidth();

const isMobile = computed(() => windowWidth.value < 1248);
const currentBgImg = computed(() => isMobile.value ? bgImgUrlMobile : bgImgUrlDesktop);
const bgClass = computed(() =>
  isMobile.value ? 'bg-[length:100%_auto]' : 'bg-contain'
);
</script>

<style scoped>

</style>
