<template>
    <router-view />
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useMyCourseStore } from './stores/models/course/myCourseStore';
import { useUserStore } from './stores/models/user/store';

const route = useRoute();
const userStore = useUserStore();
const myCourseStore = useMyCourseStore();

// 在使用者登入時獲取已購買的課程列表
const fetchMyCourses = async () => {
  if (userStore.isLoggedIn) {
    await myCourseStore.fetchMyCourses();
  }
};

// 掛載時初始化
onMounted(async () => {
  await fetchMyCourses();
});

// 當使用者登入狀態改變時，重新獲取課程列表
watch(() => userStore.isLoggedIn, async (newValue) => {
  if (newValue) {
    await fetchMyCourses();
  }
});

// 路由變更時，確保已載入課程資訊
watch(() => route.path, async () => {
  await fetchMyCourses();
}, { immediate: true });
</script>
