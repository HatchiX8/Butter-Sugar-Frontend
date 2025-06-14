<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-modal
      v-model:show="show"
      :mask-closable="true"
      class="max-h-80vh"
    >
      <n-card
        :title="title"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
        closable
        @close="show = false"
        class="w-150"
      >
        <div class="overflow-y-auto max-h-[60vh] text-4 leading-normal">
          <slot />
          <div class="mt-2">{{ detail }}</div>
        </div>
        <template #footer v-if="showFooter">
          <div class="flex justify-end gap-2 mt-4">
            <baseButton :label="cancelText" @click="onCancel" />
            <baseButton :label="confirmText" type="primary" @click="onConfirm" />
          </div>
        </template>
      </n-card>
    </n-modal>
  </n-config-provider>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { hexToRgba, themeColors } from '@/utils';
import baseButton from '@/components/layout/baseButton.vue';

interface Props {
  modelValue: boolean
  title?: string
  detail?: string
  showFooter?: boolean
  confirmText?: string
  cancelText?: string
  closable?: boolean
};

const props = withDefaults(defineProps<Props>(), {
  title: '',
  detail: '',
  showFooter: true,
  confirmText: '確定',
  cancelText: '取消',
  closable: true,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
}>();

const show = ref(props.modelValue);

watch(() => props.modelValue, (val) => (show.value = val)); // 外部傳進來時 → 同步到內部
watch(show, (val) => emit('update:modelValue', val)); // 內部操作時 → 通知外部更新

const onConfirm = () => {
  emit('confirm')
  show.value = false
};

const onCancel = () => {
  emit('cancel')
  show.value = false
};

const colors = themeColors.colors;
const themeOverrides = {
  Card: {
    colorModal: colors.neutral_600,
    titleTextColor: colors.primaryDefault,
    titleFontWeight: '700',
    textColor: colors.white,
    boxShadow: `0 0 10px ${hexToRgba(colors.primaryDefault, 0.8)}`,
  }
};
</script>

<style scoped>

</style>
