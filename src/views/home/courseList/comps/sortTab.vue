<template>
  <n-breadcrumb separator="|">
    <n-breadcrumb-item v-for="item in props.items" :key="item.value">
      <div
        :class="[
          'text-3.5 font-not-italic font-400 lh-6',
          item.value === props.active
            ? 'text-primaryDefault font-700'
            : 'hover:text-primaryDefault text-white transition-colors',
        ]"
      >
        {{ item.label }}
      </div>
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script setup lang="ts">
interface SortTabItem {
  label: string;
  value: string;
}

const props = defineProps<{
  items: SortTabItem[];
  active: string;
}>();
</script>
