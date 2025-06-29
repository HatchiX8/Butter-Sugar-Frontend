<template>
  <baseModal
    :modelValue="modelValue"
    @update:modelValue="(val) => emit('update:modelValue', val)"
    title="確定下架此課程嗎？"
    :detail="item.course_name"
    :showFooter="true"
    @confirm="handleConfirm"
    >
  </baseModal>
</template>

<script setup lang="ts">
import baseModal from '@/components/layout/baseModal.vue';
import { useDashboardStore } from '@/stores/models/dashboard/store';
import { useMessage } from 'naive-ui';

const message = useMessage();

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

const dashboardStore = useDashboardStore();

const handleConfirm = async () => {
  const res = await dashboardStore.changeCourseStatus(props.item.course_id , { course_status: '下架' });
  message[res.success ? 'success' : 'error'](res.message);
};
</script>
