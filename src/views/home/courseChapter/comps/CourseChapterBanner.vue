<template>
  <div class="mx-auto w-full max-w-[1280px] px-4">
    <breadcrumbComps
      class="mt-30"
      :items="[
        { label: '首頁', to: '/' },
        { label: '我的課程', to: '/home/my-course' },
        { label: courseName },
      ]"
    />
    <typography class="mt-10 text-white" variant="h2" font-type="title" underline>
      {{ courseName }}
    </typography>
  </div>
</template>

<script lang="ts" setup>
import breadcrumbComps from '@/components/layout/breadcrumbComps.vue';
import typography from '@/components/layout/typography.vue';

defineProps<{
  courseName: string;
}>();
</script>
