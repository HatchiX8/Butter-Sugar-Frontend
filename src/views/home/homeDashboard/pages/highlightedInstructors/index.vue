<template>
  <div class="w-full bg-cover overflow-x-hidden flex justify-center"
    :style="{ backgroundImage: `url(${bgImgUrl})` }">
    <div class="mx-12 py-15 max-w-[1200px]">
      <!-- 標題 -->
      <div class="mb-8 flex justify-center">
        <typography variant="h2" font-type="title" underline class="headingTitle">精選講師</typography>
      </div>

      <!-- 副標題 -->
      <h3 class="text-4 text-neutral_200 text-center mb-8 leading-loose max-w-3xl mx-auto">
        從麵糰基礎到創意甜點，和專業烘焙達人一起，揉出更多美味與可能。
      </h3>

      <!-- 講師卡片 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <instructorCardItem
          v-for="(item, index) in instructors"
          :key="index"
          :teacherImgUrl="item.teacherImgUrl"
          :teacherImgAlt="item.teacherImgAlt"
          :name="item.name"
          :nickname="item.nickname"
          :teacherDesc="item.teacherDesc"
          :courseTitle="item.courseTitle"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import instructorCardItem from '@/views/home/homeDashboard/comps/instructorCardItem.vue';
import typography from '@/components/layout/typography.vue';

const bgImgUrl = new URL('@/assets/images/home/bg-grey-wrinkle.png', import.meta.url).href;

interface Instructor {
  teacherImgUrl: string
  teacherImgAlt: string
  name: string
  nickname: string
  teacherDesc: string
  courseTitle: string
};

// 原始資料（不含 teacherImgAlt)s
const rawInstructors: Omit<Instructor, 'teacherImgAlt'>[] = [
  {
    teacherImgUrl: "https://i.postimg.cc/0ygH2LNg/professional-baker-woman.jpg",
    name: '林芷茵',
    nickname: '資深麵包師',
    teacherDesc:
      '擅長各式麵糰配方與手感技法，帶你從基礎揉捏到口感升級，掌握鬆軟與酥脆的黃金比例。',
    courseTitle: '打造鬆軟可口的手工麵包',
    imgClass: 'instructor-img rounded-t-lg object-cover',
  },
  {
    teacherImgUrl: "https://i.postimg.cc/MHTgVRCh/grandpa-chef.jpg",
    name: '陳子昂',
    nickname: '甜點主廚',
    teacherDesc:
      '法式甜點專家，結合視覺美感與配方理論，讓每一道甜點都能兼具風味與精緻度。',
    courseTitle: '法式蛋糕與創意裝飾',
  },
  {
    teacherImgUrl: "https://i.postimg.cc/d1vYkhtY/chef-girl.jpg",
    name: '葉梓薇',
    nickname: '巧克力工藝師',
    teacherDesc:
      '深入了解可可原料，掌握溫度與質地的關鍵，帶你創造口感豐富的巧克力甜品與裝飾。',
    courseTitle: '從豆子到甜品的全攻略',
  },
  {
    teacherImgUrl: "https://i.postimg.cc/VNKx6DTj/professional-man.jpg",
    name: '高煜誠',
    nickname: '烘焙科學顧問',
    teacherDesc:
      '從烘焙化學到原料選擇，系統化剖析麵粉、水分、發酵與溫度的細節，扎實打好烘焙基礎。',
    courseTitle: '掌握溫度與配方的精準奧秘',
  },
];

// 加上 teacherImgAlt 屬性
const instructors: Instructor[] = rawInstructors.map((instructor) => ({
  ...instructor,
  teacherImgAlt: `${instructor.name}照片`,
}));
</script>

<style scoped>
::v-deep(.headingTitle > span) {
  @apply mx-auto;
}
</style>
