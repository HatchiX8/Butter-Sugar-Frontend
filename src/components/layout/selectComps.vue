<template>
  <n-space vertical>
    <n-select v-model:value="value" :options="options" placeholder="請選擇類別"/>
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

<style scoped>

</style>
