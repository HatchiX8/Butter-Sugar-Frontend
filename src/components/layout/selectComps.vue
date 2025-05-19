<template>
  <n-space vertical>
    <n-select v-model:value="value" :options="options" class="text-white" placeholder="請選擇類別"/>
  </n-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const options = [
  { label: '所有課程', value: 'all' },
  { label: '麵包', value: 'bread' },
  { label: '蛋糕', value: 'cake' },
  { label: '餅乾', value: 'cookie' }
]
const value = ref(options[0].value)

</script>

<style>
/* 選單本體（input區） */
.n-select,
.n-base-selection,
.n-base-selection-label {
  background: #111 !important;
  color: #ff !important;
  border-radius: 4px !important;
  border: 1px solid rgba(255, 253, 250, 0.20) !important;
  font-size: 16px;
  font-weight: 700;
  height: 48px;
  min-height: 48px;
  box-sizing: border-box;
}
.n-base-selection-label {
  padding-left: 16px !important;
}
.n-base-selection-input__content {
  color: #fffdfa !important;
}

/* 下拉 icon */
.n-base-selection .n-base-suffix {
  color: #fffdfa !important;
}

/* 下拉選單內容 */
.n-base-select-menu {
  background: #3E382E !important;
  border-radius: 4px !important;
  border: 1px solid rgba(255, 253, 250, 0.25) !important;
  box-shadow: 0 4px 24px rgba(0,0,0,0.16);
  padding: 4px 0;
}

/* 單一選項 */
.n-base-select-option {
  padding: 12px 16px !important;
  border-radius: 4px;
  transition: background 0.2s;
}

/* hover、選中狀態 */
.n-base-select-menu .n-base-select-option:hover,
.n-base-select-menu .n-base-select-option--selected {
  color: #fffdfa !important;
  background: #6e6960 !important;
}

/* 選項文字 */
.n-base-select-option__content {
  color: #fffdfa !important;
  font-size: 14px !important;
  font-weight: 400;
  line-height: 24px !important;
}
</style>
