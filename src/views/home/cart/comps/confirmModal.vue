<template>
  <baseModal
    :modelValue="modelValue"
    @update:modelValue="(val) => emit('update:modelValue', val)"
    title="確定移除此課程嗎？"
    :detail="item.course_name"
    :showFooter="true"
    @confirm="handleConfirm"
    >
  </baseModal>
</template>

<script setup lang="ts">
import baseModal from '@/components/layout/baseModal.vue';
import { useCartStore } from '@/stores/models/cart/store';
import { useMessage } from 'naive-ui';

const message = useMessage();

const props = defineProps<{
  modelValue: boolean
  item: {
    cart_item_id?: string
    course_id: string
    course_name: string
  }
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>();

const cartStore = useCartStore();

const handleConfirm = async () => {
  const res = await cartStore.removeItem(props.item.cart_item_id ?? props.item.course_id);
  message[res.success ? 'success' : 'error'](res.message);
};
</script>
