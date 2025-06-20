<template>
  <div class="w-80% max-w-220 mx-auto my-20">
    <div class="flex flex-col sm:flex-row items-center sm:items-start px-8 py-10 gap-6 mt-14 text-white"
    :style="{ backgroundImage: `url(${bgImgUrl})` }">
      <!-- 講師左側 -->
      <div class="flex-shrink-0 w-60 bg-black p-4 text-center">
        <img :src="instructor.avatarUrl" alt="講師頭像" class="w-24 h-24 mx-auto rounded-full object-cover" />
        <p class="text-sm mt-4">精選講師</p>
        <p class="text-lg font-bold mt-2">{{ instructor.nickname }}</p>
        <p class="text-xs mt-2 whitespace-pre-line">{{ instructor.specialty }}</p>
        <div class="mt-2 text-sm">
          <span class="inline-block w-3.5 h-3.5 i-ion:star color-primaryLight"></span>
          <span class="pl-1">{{ formatNumberFixed(instructor.rank) }}</span>
          <span class="pl-1">({{ instructor.rankNum }} 人評價)</span>
        </div>
      </div>
      <!-- 講師右側 -->
      <div class="flex-1 text-sm leading-relaxed">
        <p class="text-lg mb-4">
          {{ instructor.slogan }}
        </p>
        <p class="text-neutral_100">{{ instructor.aboutMe }}</p>
      </div>
    </div>
    <!-- 精選課程 -->
    <typography variant="h3" font-type="title" underline class="my-8 text-white">精選課程</typography>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <courseCard v-for="course in courses" :key="course.id" v-bind="course" />
    </div>
  </div>
</template>

<script setup lang="ts">
import typography from '@/components/layout/typography.vue';
import courseCard from '@/views/home/courseList/comps/courseCard.vue';

const bgImgUrl = new URL('@/assets/images/home/bg-grey-wrinkle.png', import.meta.url).href;

const formatNumberFixed = (value: unknown, fixedNum: number = 1): string => {
  const num = Number(value);
  return isNaN(num) ? '0.0' : num.toFixed(fixedNum);
}; // 確保顯示一位小數

const instructor = {
  avatarUrl: 'https://i.postimg.cc/jqg30M9y/lee-avatar.png',
  nickname: '李芷甄',
  slogan: '「烘焙，從不是精準與繁瑣的限制，而是手心與溫度之間的對話。」',
  aboutMe: `從第一塊奶油麵包的香氣開始，我就知道，這會是我一輩子的熱愛。
我喜歡用雙手感受麵糰的溫度，用時間慢慢發酵出帶著呼吸的麵包。比起花俏的技巧，我更相信穩定的基本功，能帶你走得更遠。
很幸運曾拿過全球百大金麵包獎第3名，但對我來說，比獎項更重要的，是看見第一次做出成功吐司的學員，那個笑容。
如果你也想學會做出香濃柔軟的生吐司、或是用最簡單的材料完成第一個麵包，歡迎來上我的課。
一起讓烘焙，變成生活裡最療癒的時光。`,
  specialty: '全球百大金麵包獎第3名\n現任知名烘焙坊顧問',
  rank: 5.0,
  rankNum: 123,
};

const courses = [
  {
    link: '/home/course/1',
    id: 1,
    img: 'https://i.postimg.cc/VSGjLy7v/french-bread.png',
    title: '法式經典｜酥脆外皮、柔軟內裡的完美法國麵包',
    teacher: '李芷甄',
    rating: 5.0,
    students: 1238,
    hours: 11,
    price: 5800,
    originPrice: 9800,
  },
  {
    link: '/home/course/2',
    id: 2,
    img: 'https://i.postimg.cc/3WDg7c2r/toast.png',
    title: '香濃奶油香氣四溢！手作日式生吐司',
    teacher: '李芷甄',
    rating: 5.0,
    students: 1238,
    hours: 11,
    price: 3600,
    originPrice: 9800,
  },
  {
    link: '/home/course/3',
    id: 3,
    img: 'https://i.postimg.cc/8fWWH7Tf/baking.png',
    title: '手作麵包輕體驗｜零失敗入門免費課',
    teacher: '李芷甄',
    rating: 5.0,
    students: 1238,
    hours: 11,
    price: 4500,
  },
];
</script>

<style scoped>

</style>
