<template>
  <div class="p-2 cursor-pointer flex flex-col b-1 b-solid b-white/60 bg-neutral-900 hover:shadow-lg transition-shadow">
    <div class="group relative overflow-hidden aspect-[8/9] transition-shadow duration-300" @click="goToTeacherPage">
      <img
        :src="teacherImgUrl"
        :alt="teacherImgAlt"
        :class="['w-full h-full transition-transform duration-300 group-hover:scale-105']"
      />
      <div class="absolute inset-0 bg-black/50 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none"></div>

      <!-- 講師介紹 -->
      <div class="absolute bottom-0 left-0 right-0 z-20 p-4">
        <h4 class="text-white text-5 font-bold mb-2">
          {{ name }}｜{{ slogan }}
        </h4>
        <p class="text-neutral_100 text-3.5 leading-snug font-normal mb-4 clamped-text-3">
          {{ teacherDesc }}
        </p>
      </div>
    </div>

    <!-- 課程區塊 -->
    <div class="bg-white p-3" @click="goToCoursePage">
      <div class="bg-primaryPestel text-primaryDefault px-2 py-1 text-3 inline-block mb-2 rounded">
        最新課程
      </div>
      <p class="text-3.5 leading-tight text-neutral_400 font-bold clamped-text-1">
        {{ courseTitle }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps<{
  teacherImgUrl: string
  teacherImgAlt: string
  name: string
  slogan: string
  teacherDesc: string
  courseTitle: string
  teacherId: string
  courseId: string
}>();

const router = useRouter();

const goToTeacherPage = () => {
  router.push({ name: 'highlightedInstructor', params: { id: props.teacherId } });
};

const goToCoursePage = () => {
  router.push({ name: 'Course', params: { id: props.courseId } });
};
</script>

<style scoped>
/* 後備樣式，確保 object-fit 生效 */
img {
  object-fit: cover; /* 後備，當 UnoCSS 解析失敗時生效 */
  width: 100%;
  height: 100%;
}

/* 自定義 class 確保一致性 */
.instructor-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.clamped-text-3 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
.clamped-text-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
</style>
