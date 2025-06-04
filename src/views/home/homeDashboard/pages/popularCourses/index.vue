<template>
  <div class="py-15 bg-neutral_600 overflow-x-hidden">
    <div class="mx-auto max-w-[1200px]">
      <!-- 標題 -->
      <div class="mb-8 flex justify-center">
        <typography variant="h2" font-type="title" underline class="headingTitle">熱門課程</typography>
      </div>

      <!-- 副標題 -->
      <h3 class="text-4 text-neutral_200 text-center mb-8 leading-loose max-w-3xl mx-auto">
        精選超人氣課程，無論是學技能、培養興趣，還是專業進修，這裡都有適合你的選擇，快來一起學習吧！
      </h3>

      <!-- 課程卡片 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <courseCardItem
          v-for="(item, index) in courses"
          :key="index"
          :courseImgUrl="item.courseImgUrl"
          :courseImgAlt="item.courseImgAlt"
          :courseTitle="item.courseTitle"
          :courseSubtitle="item.courseSubtitle"
          :courseRank="item.courseRank"
          :courseStudentSum="item.courseStudentSum"
        />
      </div>

      <!-- 按鈕 -->
      <div class="mt-10 text-center md:text-right">
        <n-button>
          <span class="text-white">更多課程</span>
          <span class="inline-block w-4 h-4 ml-1 i-ion:arrow-forward color-white"></span>
        </n-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import courseCardItem from '@/views/home/homeDashboard/comps/courseCardItem.vue';
import typography from '@/components/layout/typography.vue';

interface Course {
  courseImgUrl: string
  courseImgAlt: string
  courseTitle: string
  courseSubtitle: string
  courseRank: number
  courseStudentSum: number
};

const courses = ref<Course[]>([
  {
    courseImgUrl: 'https://i.postimg.cc/yNzcsK4g/chocolate-donuts.jpg',
    courseImgAlt: 'Bread Sliced',
    courseTitle: '現代歐風麵包工藝',
    courseSubtitle: '新手快速上手，家用烤箱輕鬆體驗手作經典歐式麵包的樂趣',
    courseRank: 5,
    courseStudentSum: 1238,
  },
  {
    courseImgUrl: 'https://i.postimg.cc/c17jSxpY/bread-sliced.jpg',
    courseImgAlt: 'Japanese Colorful Mochi',
    courseTitle: '四季和菓子的詩意生活',
    courseSubtitle: '跟隨職人學做12款精緻和菓子，感受每個季節的細膩變化',
    courseRank: 4.8,
    courseStudentSum: 963,
  },
  {
    courseImgUrl: 'https://i.postimg.cc/KzGT35Ym/cupcake.jpg',
    courseImgAlt: 'Pink Macarons',
    courseTitle: '法式經典甜點大師課',
    courseSubtitle: '揭開法式甜點的秘密，學習8款法式甜點，感受每一口的法式風情',
    courseRank: 4.9,
    courseStudentSum: 2849,
  },
]);
</script>

<style scoped>
::v-deep(.headingTitle > span) {
  @apply mx-auto;
}
</style>
