<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <div class="mt-20 pb-4 bg-neutral_600">
      <n-carousel autoplay dot-type="line">
        <carouselHeroItem
          v-for="(item, index) in slides"
          :key="index"
          :imageUrl="item.imageUrl"
          :imageAlt="item.imageAlt"
          :title="item.title"
          :subtitle="item.subtitle"
          :description="item.description"
        />
      </n-carousel>
    </div>
  </n-config-provider>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import carouselHeroItem from '@/views/home/homeDashboard/comps/carouselHeroItem.vue';
import { themeColors } from '@/utils';

const colors = themeColors.colors;
const themeOverrides = {
  Carousel: {
    dotColor: '#D9D9D9',
    dotColorActive: colors.primaryDefault,
    dotLineWidth: '3rem',
    dotLineWidthActive: '3rem',
  }
};

const slides = ref([
    {
        imageUrl: new URL('@/assets/images/home/bg-bread-half-desktop.png',import.meta.url).href,
        imageAlt: '麵包背景圖',
        title: 'Master the Art of Baking',
        subtitle: '專業級烘焙課程，讓你的手藝更精緻',
        description: 'Butter&Sugar 不只是學習平台，更是專業烘焙的殿堂。從經典法式甜點到高端麵包工藝，頂尖講師帶你進入烘焙的藝術世界。',
    },
    {
        imageUrl: new URL('@/assets/images/home/bg-flour-half-desktop.png', import.meta.url).href,
        imageAlt: '麵粉過篩背景圖',
        title: 'Elevate Your Baking Skills',
        subtitle: '從基礎到進階，與大師同行',
        description: '想做出如精品麵包店般的精緻烘焙作品？Butter&Sugar 的課程，由專業主廚授課，拆解技術細節，讓你在家也能打造 Michelin 星級甜點。',
    },
    {
        imageUrl: new URL('@/assets/images/home/bg-dessert-half-desktop.png',import.meta.url).href,
        imageAlt: '精緻甜品背景圖',
        title: 'Baking, A Lifestyle Beyond Taste',
        subtitle: '沉浸式體驗，讓烘焙成為你的品味生活',
        description: '不只是學習，更是品味的堆疊。Butter&Sugar 將烘焙提升為生活藝術，讓每一口甜點都承載匠心工藝。現在就加入，開啟你的高端烘焙之旅。',
    },
]);
</script>

<style scoped></style>
