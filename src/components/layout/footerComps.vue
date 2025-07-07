<template>
  <footer
    class="font-['Noto Serif TC'] border-t-solid border-t-1 border-t-white/25% flex items-center bg-black px-6 py-25"
  >
    <div class="mx-auto w-full max-w-7xl">
      <div class="flex flex-col items-start space-y-3
                  md:flex-row md:items-center md:justify-between md:space-y-0">
        <!-- Logo -->
        <router-link to="/home">
          <img src="@/assets/logo.png" alt="Butter&Sugar" class="h-8" />
        </router-link>

        <!-- 導覽連結：手機直排，桌機橫排 -->
        <nav class="flex flex-col gap-y-8 py-15
                    md:flex-row md:space-y-0 md:gap-x-12 md:ml-5">
          <router-link to="/home/others/aboutUs" class="aboutStyle">關於我們</router-link>
          <router-link to="/home/others/faq" class="aboutStyle">常見問題</router-link>
          <router-link to="/home/others/terms-of-service" class="aboutStyle">服務條款</router-link>
          <router-link v-if="userStore.role === 'student'" to="/teacher/basicInfo" class="aboutStyle">申請成為講師</router-link>
        </nav>

        <!-- 社群 icon -->
        <div class="flex items-center gap-6">
          <a href="https://www.facebook.com/">
            <img src="/src/assets/icon/FacebookOutlined.svg" alt="Facebook" />
          </a>
          <a href="https://www.youtube.com/">
            <img src="/src/assets/icon/YoutubeOutlined.svg" alt="YouTube" />
          </a>
          <a href="https://www.instagram.com/">
            <img src="/src/assets/icon/InstagramOutlined.svg" alt="Instagram" />
          </a>
        </div>
      </div>

      <!-- ❸ 版權文字放最底，用 margin-top 推開 -->
      <p class="mt-3 text-3.5 text-neutral_200 text-left
                md:mt-1 md:text-center">
        Butter&Sugar © All Rights Reserved
      </p>
    </div>
  </footer>
</template>

<style scoped>
.aboutStyle {
  @apply text-3.5 text-white no-underline hover:text-primaryDefault;
}
</style>

<script setup lang="ts">
import { useUserStore } from '@/stores/models/index';
const userStore = useUserStore();
</script>
