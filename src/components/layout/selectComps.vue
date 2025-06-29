<template>
  <n-space vertical>
    <n-select
      v-model:value="value"
      :options="internalOptions"
      :placeholder="internalOptions ? internalOptions[0].label : '所有課程'"
      @update:value="handleChange"
      :loading="loading"
    />
  </n-space>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'

// 定義屬性
const props = defineProps<{
  defaultValue?: number | null,
  // 新增 options 屬性，允許外部傳入選項
  options?: { label: string; value: number | null }[],
  loading?: boolean
}>()

const emit = defineEmits(['change'])

// 預設選項，如果沒有傳入 options 則使用預設選項
const defaultOptions = [
  { label: '所有課程', value: null },
]

// 使用計算屬性處理選項，確保響應式更新
const internalOptions = computed(() => (props.options && props.options.length > 0) ? props.options : defaultOptions)

// 計算當前是否載入中
const loading = computed(() => props.loading ?? false)

// 初始化為預設值或第一個選項
const value = ref<number | null>(props.defaultValue !== undefined ? props.defaultValue : null)

// 監聽 props.defaultValue 變化
watch(
  () => props.defaultValue,
  (newValue) => {
    if (newValue !== undefined) {
      value.value = newValue
    }
  },
  { immediate: true } // 初始化時立即執行一次
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
