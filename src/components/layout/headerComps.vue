<template>
  <div class="bg-cyan h-16 w-full">
    這是header
    <n-modal v-model:show="showLogin" preset="card" title="登入" style="width: 400px">
      <loginComps @success="onLoginSuccess" />
    </n-modal>
    <n-button @click="showLogin = true">登入/註冊</n-button>
  </div>
</template>

<script setup lang="ts">
import { loginComps } from '@/components/index';
import { ref } from 'vue';

const showLogin = ref(false);

function onLoginSuccess() {
  showLogin.value = false;
}
</script>
