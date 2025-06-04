<template>
  <footer
    class="font-['Noto Serif TC'] border-t-solid border-t-1 border-t-white/25% flex h-72 items-center bg-black px-6"
  >
    <div class="mx-auto flex w-full max-w-7xl flex-col">
      <div class="mb-6 flex items-center justify-between">
        <div>
          <router-link to="/home">
            <img src="@/assets/logo.png" alt="Butter&Sugar" class="h-8" />
          </router-link>
        </div>
        <div class="relative flex flex-col items-center justify-center">
          <div class="w-66 flex justify-between">
            <router-link to="/" class="aboutStyle">關於我們</router-link>
            <router-link to="/" class="aboutStyle">常見問題</router-link>
            <router-link to="/" class="aboutStyle">服務條款</router-link>
          </div>
          <div class="absolute -bottom-12 mt-6">
            <p class="text-3.5 text-neutral_200">Butter&Sugar © All Rights Reserved</p>
          </div>
        </div>

        <div class="flex items-center gap-6">
          <a href="https://www.facebook.com/"
            ><img src="/src/assets/icon/FacebookOutlined.svg" alt=""
          /></a>
          <a href="https://www.youtube.com/"
            ><img src="/src/assets/icon/YoutubeOutlined.svg" alt=""
          /></a>
          <a href="https://www.instagram.com/"
            ><img src="/src/assets/icon/InstagramOutlined.svg" alt=""
          /></a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.aboutStyle {
  @apply text-3.5 text-white no-underline;
}
</style>
