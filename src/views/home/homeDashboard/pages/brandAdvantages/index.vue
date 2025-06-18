<template>
  <div class="relative h-[500px] md:h-64vh bg-cover bg-center word-spacing-widest"
    :class="{ 'bg-left-500': isMobile }"
    :style="{ backgroundImage: `url(${bannerBgImgUrl})` }">
    <!-- 背景圖片寫在 div -->
    <!-- 內容 -->
    <div class="absolute inset-0 flex flex-col items-center justify-end text-white py-20">
      <h2 class="text-center font-bold mb-12 text-6 md:text-8">
        專業 ✖︎ 便利 ✖︎ 樂趣，讓烘焙學習更輕鬆！
      </h2>

      <div class="relative rounded-lg bg-neutral_600/80% shadow-md px-4 py-6 w-110 max-w-72
      sm:px-6 sm:py-8 sm:max-w-128">
        <!-- 輪播箭頭 -->
        <button class="carousel-arrow left-[-3.4rem] md:left-[-6rem]" @click="prev">
          <span class="inline-block w-6 h-6 i-ion:arrow-back color-white"></span>
        </button>
        <button class="carousel-arrow right-[-3.4rem] md:right-[-6rem]" @click="next">
          <span class="inline-block w-6 h-6 i-ion:arrow-forward color-white"></span>
        </button>

        <n-carousel
          autoplay
          :show-arrow="false"
          :arrow="false"
          :show-dots="false"
          ref="carouselRef">
          <carouselTextItem
            v-for="(item, index) in slides"
            :key="index"
            :subtitle="item.subtitle"
            :description="item.description"/>
        </n-carousel>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import carouselTextItem from '@/views/home/homeDashboard/comps/carouselTextItem.vue';

const bannerBgImgUrl = new URL('@/assets/images/home/bg-baking-desktop.png', import.meta.url).href;

const carouselRef = ref();

const isMobile = computed(() => window.innerWidth <= 767);

const slides = ref([
    {
        subtitle: '彈性學習，隨時隨地都能開始',
        description: '無論身在何處，只需一台裝置，即可隨時進入課程，告別時間與地點的限制。',
    },
    {
        subtitle: '循序漸進，零基礎也能輕鬆上手',
        description: '從基礎到進階，完整學習路徑，幫助你穩紮穩打，掌握每個烘焙技巧。',
    },
    {
        subtitle: '專業師資，帶你學會核心技法',
        description: '業界專家親自授課，搭配清晰步驟與實作示範，讓學習更有效率。',
    },
    {
        subtitle: '系統化課程，精選內容不再零散',
        description: '精心設計的課程架構，從材料選擇、操作技巧到烘焙秘訣，一站式學習，讓你少走彎路。',
    },
    {
        subtitle: '互動專區，交流分享更有趣',
        description: '加入學員專屬社群，與烘焙愛好者一同交流心得，解決學習過程中的問題。',
    },
    {
        subtitle: '從興趣到專業，開啟你的烘焙之旅',
        description: '無論是興趣使然，還是想提升烘焙技能或是考取烘焙證照，這裡都是你的最佳學習夥伴！',
    },
]);

const prev = () => {
    carouselRef.value?.prev()
};

const next = () => {
    carouselRef.value?.next()
};
</script>

<style scoped>
/* 輪播箭頭按鈕 */
.carousel-arrow {
    @apply absolute top-1/2 -translate-y-1/2 rounded-full b-1 b-solid b-white/25% w-12 h-12 cursor-pointer bg-transparent transition-all duration-300
    hover:(bg-white/10% b-white/50% scale-105);
}
/* 背景圖偏移 */
.bg-left-500 {
    background-position-x: -500px;
}
</style>
