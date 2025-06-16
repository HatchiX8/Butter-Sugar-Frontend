<template>
  <n-space vertical>
    <n-select v-model:value="value" :options="options" placeholder="所有課程" @update:value="handleChange"/>
  </n-space>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

// 定義屬性
const props = defineProps<{
  defaultValue?: number | null
}>()

const emit = defineEmits<{
  (event: 'change', value: number | null): void
}>()

const options = [
  { label: '所有課程', value: null },
  { label: '麵包', value: 2 },
  { label: '蛋糕', value: 3 },
  { label: '餅乾', value: 4 }
]

// 初始化為預設值或第一個選項
const value = ref<number | null>(props.defaultValue !== undefined ? props.defaultValue : options[0].value)

// 監聽 props.defaultValue 變化
watch(
  () => props.defaultValue,
  (newValue) => {
    if (newValue !== undefined) {
      value.value = newValue
    }
  }
)

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
