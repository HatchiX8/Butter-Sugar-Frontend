<template>
  <div class="w-320 container mx-auto flex flex-col items-start">
    <breadcrumbComps
      :items="[
        { label: '首頁', to: '/' },
        { label: '探索課程', to: '/explore' },
        { label: '所有課程' },
      ]"
    />

    <h1 class="text-8 font-not-italic font-700 lh-9.6 tracking-0.32 mt-25 text-center text-white">
      所有課程
    </h1>
    <span class="w-18 h-0.25 bg-primaryDefault mt-19px"></span>

    <div class="mt-10 flex items-center justify-between self-stretch">
      <selectComps class="w-50 h-12 px-3 py-4" />
      <sortTab
        :items="[
          { label: '最熱門', value: 'hot' },
          { label: '依時間', value: 'time' },
        ]"
        active="hot"
      />
    </div>

    <courseCardList />
  </div>
</template>

<script setup lang="ts">
import breadcrumbComps from '@/components/layout/breadcrumbComps.vue';
import selectComps from '@/components/layout/selectComps.vue';
import sortTab from './comps/sortTab.vue';
import courseCardList from './comps/courseCardList.vue';
</script>
