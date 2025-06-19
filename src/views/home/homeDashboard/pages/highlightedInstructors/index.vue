<template>
  <div
    class="flex w-full justify-center overflow-x-hidden bg-cover"
    :style="{ backgroundImage: `url(${bgImgUrl})` }"
  >
    <div class="py-15 mx-12 max-w-[1200px]">
      <!-- 標題 -->
      <div class="mb-8 flex justify-center">
        <typography variant="h2" font-type="title" underline class="headingTitle text-white"
          >精選講師</typography
        >
      </div>

      <!-- 副標題 -->
      <h3 class="text-4 text-neutral_200 mx-auto mb-8 max-w-3xl text-center leading-loose">
        從麵糰基礎到創意甜點，和專業烘焙達人一起，揉出更多美味與可能。
      </h3>

      <!-- 講師卡片 -->
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <instructorCardItem
          v-for="(item, index) in instructors"
          :key="index"
          :teacher_id="item.teacher_id"
          :teacherImgUrl="item.teacherImgUrl"
          :teacherImgAlt="item.teacherImgAlt"
          :name="item.teacher_name"
          :slogan="item.teacher_slogan"
          :teacherDesc="item.teacher_specialization"
          :teacherId="item.teacher_id"
          :courseTitle="item.course_name"
          :courseId="item.course_id"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import instructorCardItem from '@/views/home/homeDashboard/comps/instructorCardItem.vue';
import typography from '@/components/layout/typography.vue';
import { useHomeDashboardStore } from '@/stores/models/homeDashboard/store';
import type { TeacherFeatured  } from '@/views/home/homeDashboard/api/types';

const bgImgUrl = new URL('@/assets/images/home/bg-grey-wrinkle.png', import.meta.url).href;

const teachers = ref<TeacherFeatured[]>([]);

// 取得精選講師
const homeDashboardStore = useHomeDashboardStore();
onMounted(async () => {
  await homeDashboardStore.fetchTeacherFeatured();
  teachers.value = homeDashboardStore.highlightedTeachers;
});

// 假資料圖片陣列（順序對應後端回傳的前 4 筆）
const teacherImages = [
  'https://i.postimg.cc/0ygH2LNg/professional-baker-woman.jpg',
  'https://i.postimg.cc/MHTgVRCh/grandpa-chef.jpg',
  'https://i.postimg.cc/d1vYkhtY/chef-girl.jpg',
  'https://i.postimg.cc/VNKx6DTj/professional-man.jpg',
];

// 補上 alt & 合併圖片的 computed 陣列
const instructors = computed(() =>
  teachers.value.map((item, index) => ({
    ...item,
    teacherImgUrl: item.teacher_image_url || teacherImages[index] || '',
    teacherImgAlt: `${item.teacher_name}照片`,
  }))
);
</script>

<style scoped>
::v-deep(.headingTitle > span) {
  @apply mx-auto;
}
</style>
