<template>
  <div>登入成功跳轉中...</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '@/stores/models/index';
import { useCartStore } from '@/stores/models/cart/store';

const cartStore = useCartStore();
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const handleMergeCart = async () => {
  await cartStore.mergeCart();
};

onMounted(async () => {
  // 從網址取得 JWT token
  const token = route.query.token as string;

  // TODO:後續會導入登入失敗提示
  if (!token) {
    return router.replace('/Home');
  }

  userStore.setToken(token);
  router.replace('/Home');

  // 登入後整合購物車
  handleMergeCart();
});
</script>
