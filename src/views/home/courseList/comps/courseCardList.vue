<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full">
    <courseCard v-for="course in courses" :key="course.id" v-bind="course" />
  </div>
</template>

<script setup lang="ts">
import courseCard from './courseCard.vue';

const courses = [
  {
    id: 1,
    img: '/src/assets/images/course/course1.jpg',
    title: '零基礎也能成功｜手揉麵包入門全攻略',
    teacher: '張文龍',
    rating: 5.0,
    students: 1238,
    hours: 11,
    price: 5800,
    originPrice: 9800,
  },
  {
    id: 2,
    img: '/src/assets/images/course/course1.jpg',
    title: '零基礎也能成功｜手揉麵包入門全攻略',
    teacher: '張文龍',
    rating: 5.0,
    students: 1238,
    hours: 11,
    price: 5800,
    originPrice: 9800,
  },
  {
    id: 3,
    img: '/src/assets/images/course/course1.jpg',
    title: '零基礎也能成功｜手揉麵包入門全攻略',
    teacher: '張文龍',
    rating: 5.0,
    students: 1238,
    hours: 11,
    price: 5800,
    originPrice: 9800,
  },
  {
    id: 4,
    img: '/src/assets/images/course/course1.jpg',
    title: '零基礎也能成功｜手揉麵包入門全攻略',
    teacher: '張文龍',
    rating: 5.0,
    students: 1238,
    hours: 11,
    price: 5800,
    originPrice: 9800,
  },
  {
    id: 5,
    img: '/src/assets/images/course/course1.jpg',
    title: '零基礎也能成功｜手揉麵包入門全攻略',
    teacher: '張文龍',
    rating: 5.0,
    students: 1238,
    hours: 11,
    price: 5800,
    originPrice: 9800,
  },
  // ... 其他課程
]
</script>
