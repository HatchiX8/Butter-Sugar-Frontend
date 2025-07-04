<template>
  <div class="w-80% max-w-200 mx-auto mb-20 text-white">
    <breadcrumbComps
      class="mt-30"
      :items="[
        { label: '首頁', to: '/' },
        { label: '關於我們'},
      ]"
    />
    <typography variant="h2" font-type="title" underline class="mb-8 mt-2 text-white"
      >關於我們
    </typography>
    <div class="p-4 line-height-8">
      <p>我們是 Butter & Sugar 的團隊，成員有 Hatchi、Benny、Emily、Bean、Seris、Cami。</p>
      <p class="mt-5">熱愛烘焙的我們建置了這個烘焙影音平台</p>
      <p>主要是因為疫情之後，大家越來越習慣線上學習，尤其是興趣類型的課程，大家都希望上課的時間、地點更自由。</p>
      <p>再來是，雖然市面上教學資源不少，但實際上，想上的課程常常分散在各大平台，資訊又不夠集中，學習起來很不方便。</p>
      <p class="mt-5">因此，我們團隊希望打造一個資訊集中、操作簡單、氛圍溫馨、專屬於烘焙的影音平台，讓大家能在同一個地方，輕鬆找到適合自己的課程，能輕鬆學習的烘焙。</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import breadcrumbComps from '@/components/layout/breadcrumbComps.vue';
import typography from '@/components/layout/typography.vue';

</script>

<style scoped>

</style>
