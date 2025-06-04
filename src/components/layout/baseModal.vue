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
        class="w-150">
        <div class="overflow-y-auto max-h-[60vh] leading-6 text-sm">
          <slot />
        </div>

        <template #footer v-if="showFooter">
          <div class="flex justify-end gap-2 mt-4">
            <n-button @click="onCancel">{{ cancelText }}</n-button>
            <n-button type="primary" @click="onConfirm">{{ confirmText }}</n-button>
          </div>
        </template>
      </n-card>
    </n-modal>
  </n-config-provider>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

interface Props {
  modelValue: boolean
  title?: string
  showFooter?: boolean
  confirmText?: string
  cancelText?: string
  closable?: boolean
};
const props = withDefaults(defineProps<Props>(), {
  title: '',
  showFooter: true,
  confirmText: '確定',
  cancelText: '取消',
  closable: true
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
}>();

const show = ref(props.modelValue);
// 外部傳進來時 → 同步到內部
watch(() => props.modelValue, (val) => (show.value = val));
// 內部操作時 → 通知外部更新
watch(show, (val) => emit('update:modelValue', val));

const onConfirm = () => {
  emit('confirm');
  show.value = false;
};
const onCancel = ()=> {
  emit('cancel');
  show.value = false;
};

const themeOverrides = {
  Card: {
    colorModal: '#1D1810',
    titleTextColor: '#D68E39',
    titleFontWeight: '700',
    textColor: '#FFFDFA',
    boxShadow: '0 0 10px #D68E39CC',
  },
};
</script>

<style scoped>

</style>
