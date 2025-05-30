<template>
  <BaseModal
    :modelValue="modelValue"
    @update:modelValue="(val) => emit('update:modelValue', val)"
    title="確定移除此課程嗎？"
    :showFooter="true">

  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from '@/components/layout/baseModal.vue';

defineProps<{ modelValue: boolean }>();
const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>();

</script>
