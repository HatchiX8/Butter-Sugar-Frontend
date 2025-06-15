<template>
  <n-breadcrumb separator="|" class="mb-10 md:mb-0">
    <n-breadcrumb-item
      v-for="item in props.items"
      :key="item.value"
      @click="handleClick(item.value)"
    >
      <div
        :class="[
          'text-3.5 font-not-italic font-400 lh-6 cursor-pointer',
          item.value === props.active
            ? 'text-primaryDefault font-700'
            : 'hover:text-primaryDefault text-white transition-colors',
        ]"
        style="white-space: nowrap"
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

const emit = defineEmits<{
  (e: 'update:active', value: string): void;
  (e: 'change', value: string): void;
}>();

const handleClick = (value: string) => {
  if (value !== props.active) {
    emit('update:active', value);
    emit('change', value);
  }
};
</script>
