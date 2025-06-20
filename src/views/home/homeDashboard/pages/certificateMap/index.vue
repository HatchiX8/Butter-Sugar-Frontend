<template>
  <div class="bg-neutral_600 text-white">
    <div class="px-12 py-15 max-w-[1200px] mx-auto">
      <typography variant="h2" font-type="title" underline>輕鬆考證</typography>
      <p class="text-4 leading-tight text-neutral_200 my-6">想考烘焙證照？線上學習，輕鬆通過考試！<br>考證照不用跑補習班！線上學習 + 模擬考試，助你快速通過。</p>

      <!-- tag標籤 -->
      <div class="flex flex-wrap gap-2 mb-16">
        <span
          v-for="tag in tags"
          :key="tag"
          class="px-3 py-1 text-sm rounded-full border-1 border-solid border-white/25% text-primaryDefault"
        >
          #{{ tag }}
        </span>
      </div>

      <!-- 學習地圖卡片 -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <mapCardItem
          v-for="(item, index) in maps"
          :key="index"
          :imageUrl="item.imageUrl"
          :imageAlt="item.imageAlt"
          :title="item.title"
          :description="item.description"
        />
      </div>

      <!-- 按鈕 -->
      <div class="text-right mt-10">
        <router-link :to="{ name: 'CourseInfoList' }">
          <baseButton label="立即加入學習 GO" icon="i-ion:arrow-forward" iconPosition="right" iconClass="w-4 h-4" class="text-white" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import mapCardItem from '@/views/home/homeDashboard/comps/mapCardItem.vue';
import typography from '@/components/layout/typography.vue';
import baseButton from '@/components/layout/baseButton.vue';

const tags = [
  'HD 高清影音',
  '附贈電子講義',
  '課後模擬測驗',
  '烘焙餅乾丙級',
  '烘焙麵包丙級',
  '烘焙西點蛋糕丙級',
  '烘焙乙級'
];

const maps = [
  {
    imageUrl: new URL('@/assets/images/home/map-video.png', import.meta.url).href,
    imageAlt: '播放器 icon',
    title: '基礎理論學習',
    description: '掌握烘焙證照必備知識，涵蓋食品安全、材料特性、烘焙原理，打好扎實基礎'
  },
  {
    imageUrl: new URL('@/assets/images/home/map-tool.png', import.meta.url).href,
    imageAlt: '器具 icon',
    title: '實作技能強化',
    description: '針對證照考試項目，精準教學麵包、蛋糕、餅乾、派塔等必考品項，提升實戰技巧'
  },
  {
    imageUrl: new URL('@/assets/images/home/map-interaction.png', import.meta.url).href,
    imageAlt: '互動 icon',
    title: '真人互動討論',
    description: '分析歷屆考題，重點整理常見失誤與易考題型，與專業烘焙師互動交流'
  },
  {
    imageUrl: new URL('@/assets/images/home/map-exam.png', import.meta.url).href,
    imageAlt: '考題 icon',
    title: '模擬實戰演練',
    description: '講師直播示範，還原考試流程，幫助學生掌握節奏，提升應試能力'
  }
];
</script>

<style scoped>

</style>
