<template>
  <div class="flex flex-col gap-4 w-full p-6 rounded-[0.125rem] border border-white/20 bg-black w-full box-border">
    <div class="mb-2">
      <typography variant="h6" font-type="title" class="text-neutral-200">關於講師</typography>
    </div>

    <div class="flex items-center gap-4 mb-4">
      <div class="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center">
        <img src="@/assets/images/course/teacher.jpg" alt="講師照片" class="w-full h-full" style="object-fit: cover; object-position: center;"/>
      </div>
      <div class="flex flex-col gap-2">
        <typography variant="h5" font-type="title" class="text-white">許瑜堂（Yu-Tang Hsu）</typography>
        <typography variant="paragraph-medium" font-type="content" class="text-neutral-100 flex items-center">
          <div class="i-ion:star text-primary-light me-1"></div>
          <typography variant="paragraph-regular" font-type="content" class="text-neutral-100">5.0（123 則評價）</typography>
        </typography>
      </div>
    </div>

    <div class="mb-4">
      <typography variant="h6" font-type="title" class="text-white mb-3">
        「麵糰的語言，就是我的語言。」
      </typography>

      <typography variant="paragraph-regular" font-type="content" class="text-neutral-100">
        許燁堂老師擁有十年以上專業烘焙教學經驗，專精於歐式麵包與天然酵母的研究與實作。曾遠赴法國布雷斯特、東京淺草研習職人級製麵工法，返台後投入教學與產品開發，致力於推廣高水量麵糰的技術與美學。
      </typography>
    </div>

      <n-button size="large" class="px-3 py-6 max-w-164px">
        <div class="flex items-center gap-1">
          <typography variant="paragraph-regular" font-type="content" class="text-neutral-100">前往講師頁面</typography>
          <div class="i-ion:arrow-forward-outline cursor-pointer w-5 h-5"></div>
        </div>
      </n-button>
  </div>
</template>

<script setup lang="ts">
import typography from '@/components/layout/typography.vue';
import { NButton } from 'naive-ui';
</script>
