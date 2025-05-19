<template>
<n-breadcrumb separator="|">
  <n-breadcrumb-item v-for="item in props.items" :key="item.value">
    <div
      :class="[
        'text-3.5 font-not-italic font-400 lh-6',
        item.value === props.active
          ? 'text-primaryDefault font-700'
          : 'text-white hover:text-primaryDefault transition-colors'
      ]"
    >
      {{ item.label }}
    </div>
  </n-breadcrumb-item>
</n-breadcrumb>
</template>

<script setup lang="ts">
const props = defineProps({
  items: {
    type: Array,
    default: () => [
      { label: '最熱門', value: 'hot' },
      { label: '依時間', value: 'time' }
    ],
  },
  active: {
    type: String,
    default: 'hot'
  }
})

</script>
