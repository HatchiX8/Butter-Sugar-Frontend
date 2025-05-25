<template>
  <n-breadcrumb class="mt-10">
    <n-breadcrumb-item v-for="(item, index) in props.items" :key="item.to || item.label">
      <template v-if="!isLastItem(index) && item.to">
        <router-link
          :to="item.to"
          class="text-3.5 font-not-italic font-400 lh-6 hover:text-primaryDefault text-white transition-colors"
        >
          {{ item.label }}
        </router-link>
      </template>
      <template v-else>
        <span class="text-primaryDefault text-3.5 font-not-italic font-400 lh-6">
          {{ item.label }}
        </span>
      </template>
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  label: string;
  to?: string;
}

const props = defineProps<{
  items: BreadcrumbItem[];
}>();

const isLastItem = (index: number) => index === props.items.length - 1;
</script>
