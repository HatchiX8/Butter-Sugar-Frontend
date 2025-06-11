<template>
  <div id="course-info" class="flex flex-col gap-6 w-full">
    <typography variant="h2" font-type="title" class="text-white" underline>課程簡介</typography>

    <div class="intro-content">
      <div class="intro-text">
        <typography variant="paragraph-medium" font-type="content" class="text-white mb-6">在這門課程中，您將深入了解前端開發的各個方面並建立實用的網頁應用，並通過項目實踐掌握：</typography>

        <div class="mb-6">
          <typography variant="h6" font-type="title" class="text-white mb-5">適合對象</typography>
          <typography variant="paragraph-medium" font-type="content" class="text-white mb-1">1.希望提升烘焙技巧的愛好者。</typography>
          <typography variant="paragraph-medium" font-type="content" class="text-white mb-1">2.有志成為專業麵包師傅的人士。</typography>
          <typography variant="paragraph-medium" font-type="content" class="text-white mb-1">3.對高水量麵包製作有興趣的學員。</typography>
        </div>

        <div class="mb-6">
          <typography variant="h6" font-type="title" class="text-white mb-5">課程大綱</typography>
          <typography variant="paragraph-medium" font-type="content" class="text-white mb-1">1.能夠獨立製作高品質的高水量歐式麵包。</typography>
          <typography variant="paragraph-medium" font-type="content" class="text-white mb-1">2.掌握發酵控制與麵糰處理的專業技巧。</typography>
          <typography variant="paragraph-medium" font-type="content" class="text-white mb-1">3.理解免揉麵包的原理並能實踐操作。</typography>
        </div>

        <n-button size="large" class="px-3 py-6 max-w-164px">
          <div class="flex items-center gap-1">
            <typography variant="paragraph-regular" font-type="content" class="text-neutral-100">顯示完整內容</typography>
            <div class="i-ion:arrow-forward-outline cursor-pointer w-5 h-5"></div>
          </div>
        </n-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import typography from '@/components/layout/typography.vue';
</script>
