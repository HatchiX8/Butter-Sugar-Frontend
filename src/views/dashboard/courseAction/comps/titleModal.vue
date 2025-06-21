<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-modal v-model:show="show" :mask-closable="false" class="max-h-80vh">
      <n-card
        :title="title"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
        closable
        @close="show = false"
        class="w-[80%] my-0 mx-auto md:w-[450px] md:m-auto"
      >
        <div class="text-4 max-h-[60vh] overflow-y-auto leading-normal">
          <slot />
          <div class="mt-2">{{ detail }}</div>
          <baseInput
            v-show="!showSelect"
            placeholder="請輸入標題"
            v-model="inputValue"
            @update:modelValue="emitInput"
          />

          <n-select
            v-show="showSelect"
            v-model:value="selectValue"
            :options="options"
            @update:value="(val: number) => emit('update:type', val)"
            placeholder="請選擇類別"
          />
        </div>
        <template #footer v-if="showFooter">
          <div class="mt-4 flex justify-end gap-2">
            <baseButton :label="cancelText" @click="onCancel" />
            <baseButton
              v-show="!showSelect"
              :label="confirmText"
              type="primary"
              @click="nextSelect"
            />
            <baseButton
              :disabled="!selectValue"
              v-show="showSelect"
              :label="confirmText"
              type="primary"
              @click="onConfirm"
            />
          </div>
        </template>
      </n-card>
    </n-modal>
  </n-config-provider>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { hexToRgba, themeColors } from '@/utils';
import { baseButton, baseInput } from '@/components/index.ts';

// -----------props&emit-----------
interface Props {
  modelValue: boolean;
  title?: string;
  detail?: string;
  showFooter?: boolean;
  confirmText?: string;
  cancelText?: string;
  closable?: boolean;
  onConfirm?: () => void;
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  detail: '',
  showFooter: true,
  confirmText: '確定',
  cancelText: '取消',
  closable: true,
  onConfirm: undefined,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'update:title', value: string): void;
  (e: 'update:type', value: number): void;
  (e: 'confirm'): void;
  (e: 'cancel'): void;
}>();

// --------------------------------

// -----------彈跳視窗-----------
const show = ref(props.modelValue);
const showSelect = ref(false);
// 因為需要內部關閉視窗，所以採用雙監聽方式
watch(
  () => props.modelValue,
  (val) => (show.value = val)
);
// 外部傳進來時 → 同步到內部
watch(show, (val) => emit('update:modelValue', val)); // 內部操作時 → 通知外部更新
// ------------------------------

// -----------內部關閉-----------
const nextSelect = () => {
  showSelect.value = true;
};

const onConfirm = () => {
  props.onConfirm?.();

  show.value = false;
};

const onCancel = () => {
  emit('cancel');
  show.value = false;
};
// ------------------------------

// -----------input-----------
const inputValue = ref('');

const emitInput = (value: string) => {
  emit('update:title', value); // 傳給父層
};

// ----------------------------

// -----------下拉選單-----------
const options = [
  { label: '麵包', value: 1 },
  { label: '蛋糕', value: 2 },
  { label: '餅乾', value: 3 },
];
const selectValue = ref();

// -----------------------------
const colors = themeColors.colors;
const themeOverrides = {
  Card: {
    colorModal: colors.neutral_600,
    titleTextColor: colors.primaryDefault,
    titleFontWeight: '700',
    textColor: colors.white,
    boxShadow: `0 0 10px ${hexToRgba(colors.primaryDefault, 0.8)}`,
  },
};
</script>

<style scoped></style>
