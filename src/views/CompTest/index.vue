<template>
  <div class="p-20 text-white">
    <div class="mb-5">測試元件用頁面</div>

    <div><cartList :cartItems="itemData" :orderDetails="true" :itemCount="itemData.length" /></div>
  </div>
</template>

<script setup lang="ts">
import { cartList } from '@/components/index';

const itemData = [
  {
    course_id: '2220ec97-dff6-46a2-b392-7fd32d2ecd73',
    course_name: '餅乾魔法師養成計畫｜手把手帶你掌握烘烤技巧！',
    price: 1680,
    course_smallimage: 'https://i.postimg.cc/yNzcsK4g/chocolate-donuts.jpg',
  },
  {
    course_id: '4962354d-e16c-4170-8b23-e3d71604f042',
    course_name: '🏆烘焙丙級麵包證照班：必考品項全攻略',
    price: 4800,
    course_smallimage: 'https://i.postimg.cc/c17jSxpY/bread-sliced.jpg',
  },
  {
    course_id: '32a6b423-f2ab-45cb-897d-488caeaa5258',
    course_name: '🏆烘焙丙級蛋糕考照特訓班：超詳細拆解零失敗的秘訣！',
    price: 5500,
    course_smallimage: 'https://i.postimg.cc/KzGT35Ym/cupcake.jpg',
  },
  {
    course_id: 'e24325e5-a753-4016-9227-e6f851a4626c',
    course_name: '巧克力職人班｜溫控、調溫、創意造型全攻略！',
    price: 3600,
    course_smallimage: 'https://i.postimg.cc/fLqVtnFv/japanese-colorful-mochi.jpg',
  },
  {
    course_id: 'db95002f-f2cd-4bd0-8a56-4cf590259a0b',
    course_name: '可頌職人密集班：層次不明顯？吃起來不夠酥？帶你學習黃金折疊技巧',
    price: 1980,
    course_smallimage: 'https://i.postimg.cc/4yKmp2RR/pink-macarons.jpg',
  },
];
</script>
