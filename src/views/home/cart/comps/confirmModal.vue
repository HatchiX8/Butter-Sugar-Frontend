<template>
  <baseModal
    :modelValue="modelValue"
    @update:modelValue="(val) => emit('update:modelValue', val)"
    title="確定移除此課程嗎？"
    :detail="item.course_name"
    :showFooter="true"
    :onConfirm="handleConfirm"
    >
  </baseModal>
</template>

<script setup lang="ts">
import baseModal from '@/components/layout/baseModal.vue';
import { useCartStore } from '@/stores/models/cart/store';

const props = defineProps<{
  modelValue: boolean
  item: {
    course_id: string
    course_name: string
  }
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>();

const cartStore = useCartStore();

const handleConfirm = () => {
  cartStore.removeItem(props.item.course_id)
};
</script>
