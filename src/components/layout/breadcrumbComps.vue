<template>
  <n-breadcrumb class="mt-10">
    <n-breadcrumb-item v-for="(item, index) in props.items" :key="item.to || item.label">
      <template v-if="!isLastItem(index) && item.to && !item.disabled">
        <router-link :to="item.to">
          <span class="text-sm font-400 hover:text-primaryDefault text-white">{{ item.label }}</span>
        </router-link>
      </template>
      <template v-else>
        <span :class="[
          'text-sm font-400',
          isLastItem(index) ? 'text-primaryDefault' : 'text-white cursor-default'
        ]">
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
  disabled?: boolean;
}

const props = defineProps<{
  items: BreadcrumbItem[];
}>();

const isLastItem = (index: number) => index === props.items.length - 1;
</script>
