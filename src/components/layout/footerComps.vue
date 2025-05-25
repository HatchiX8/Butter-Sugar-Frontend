<template>
  <footer
    class="font-['Noto Serif TC'] border-t-solid border-t-1 border-t-white/25% flex h-72 items-center bg-black px-6"
  >
    <div class="mx-auto flex w-full max-w-7xl items-center justify-between">
      <div>
        <router-link to="/home">
          <img src="@/assets/logo.png" alt="Butter&Sugar" class="h-8" />
        </router-link>
      </div>
      <div class="flex flex-col text-white">
        <div class="w-66 mb-11 flex justify-between p-2">
          <router-link to="/" class="aboutStyle">關於我們</router-link>
          <router-link to="/" class="aboutStyle">常見問題</router-link>
          <router-link to="/" class="aboutStyle">服務條款</router-link>
        </div>
        <div>
          <p class="text-3.5 text-neutral_200 text-center">Butter&Sugar © All Rights Reserved</p>
        </div>
      </div>
      <div class="text-white">測試</div>
    </div>
  </footer>
</template>

<style scoped>
.aboutStyle {
  @apply text-3.5 text-white no-underline;
}
</style>
