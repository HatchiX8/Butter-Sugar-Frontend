<template>
  <div class="flex flex-col gap-10 w-full">
    <typography variant="h2" font-type="title" class="text-white" underline>課程問答</typography>

    <div class="gap-6">

      <div class="gap-4 border-1 border-solid border-white/20 p-6 bg-neutral_400 mb-6">
        <!-- 問題 -->
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center me-2">
            <img
              class="w-full h-full"
              src="@/assets/images/course/teacher.jpg"
              style="object-fit: cover; object-position: center;"
            />
          </div>

          <div class="flex flex-col">
            <div class="flex items-center gap-2 mb-2">
              <typography variant="h6" font-type="title" class="text-white">小乖貓</typography>
              <typography variant="paragraph-regular" font-type="content" class="text-neutral-200">2025/06/08  13:23:36</typography>
            </div>
            <typography variant="paragraph-regular" font-type="content" class="text-neutral-100">請問，沒有發酵箱，會教其他的替代方案嗎？</typography>
          </div>
        </div>

        <!-- 回答 -->
        <div class="flex flex-col bg-neutral_500 p-3">
          <div class="flex items-center gap-2 mb-2">
            <typography variant="h6" font-type="title" class="text-white">許燁堂</typography>
            <typography variant="paragraph-regular" font-type="content" class="text-neutral-200">2025/06/09 10:29:45</typography>
            <n-button round ghost size="small">
              <typography variant="paragraph-medium" font-type="content" class="text-primaryDefault">授課講師</typography>
            </n-button>
          </div>
          <typography variant="paragraph-regular" font-type="content" class="text-neutral-100">會教簡易的家用發酵方式。</typography>
        </div>

      </div>

      <div class="gap-4 border-1 border-solid border-white/20 p-6 bg-neutral_400 mb-6">
        <!-- 問題 -->
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center me-2">
            <img
              class="w-full h-full"
              src="@/assets/images/course/teacher.jpg"
              style="object-fit: cover; object-position: center;"
            />
          </div>

          <div class="flex flex-col">
            <div class="flex items-center gap-2 mb-2">
              <typography variant="h6" font-type="title" class="text-white">Seris</typography>
              <typography variant="paragraph-regular" font-type="content" class="text-neutral-200">2025/05/14  00:23:36</typography>
            </div>
            <typography variant="paragraph-regular" font-type="content" class="text-neutral-100">請問我可以使用手持攪拌機來打麵糰嗎？</typography>
          </div>
        </div>

        <!-- 回答 -->
        <div class="flex flex-col bg-neutral_500 p-3">
          <div class="flex items-center gap-2 mb-2">
            <typography variant="h6" font-type="title" class="text-white">許燁堂</typography>
            <typography variant="paragraph-regular" font-type="content" class="text-neutral-200">2025/06/09 10:29:45</typography>
            <n-button round ghost size="small">
              <typography variant="paragraph-medium" font-type="content" class="text-primaryDefault">授課講師</typography>
            </n-button>
          </div>
          <typography variant="paragraph-regular" font-type="content" class="text-neutral-100">不建議使用手持攪拌機，課程中會提供手揉靜置的方式，讓沒有攪拌機的同學也能製作麵包。</typography>
        </div>

      </div>

      <n-button size="large" class="px-4 py-6">
          <div class="flex items-center gap-1">
            <typography variant="paragraph-regular" font-type="content" class="text-neutral-100">顯示所有問答</typography>
          </div>
        </n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import typography from '@/components/layout/typography.vue';
import { NButton } from 'naive-ui';
</script>

<style>

</style>
