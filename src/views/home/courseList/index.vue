<template>
  <div>課程列表</div>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue';
import { getUser } from '@/api/user/user';
import type { User } from '@/api/user/types';

const user = ref<User | null>(null);

const getUserFunction = async () => {
  try {
    const res = await getUser();
    user.value = res;
    console.log(res);
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};

onMounted(() => {
  getUserFunction();
});
</script>
