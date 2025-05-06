<template>
  <a @click="onGoogleLogin">
    登入
  </a>
</template>

<script setup lang="ts">
const API_BASE = import.meta.env.VITE_API_URL 

function onGoogleLogin() {
  // 1. 直接跳轉到後端 OAuth 啟動端點
  window.location.href = `${API_BASE}/api/v1/users/auth/google`
}
</script>

