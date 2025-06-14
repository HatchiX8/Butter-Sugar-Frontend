<template>
  <n-space vertical>
    <n-select v-model:value="value" :options="options" placeholder="所有課程" @update:value="handleChange"/>
  </n-space>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const emit = defineEmits<{
  (event: 'change', categoryId: number | null): void
}>()

const options = [
  { label: '所有課程', value: null },
  { label: '麵包', value: 2 },
  { label: '蛋糕', value: 3 },
  { label: '餅乾', value: 4 }
]

const value = ref<number | null>(options[0].value)

// 當選擇變更時觸發事件
const handleChange = (newValue: number | null) => {
  emit('change', newValue)
}

// 初始化時也觸發一次事件
watch(value, (newValue) => {
  emit('change', newValue)
}, { immediate: true })
</script>

<style scoped>

</style>
