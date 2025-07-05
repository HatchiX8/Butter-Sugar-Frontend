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
        class="mx-auto my-0 w-[80%] md:m-auto md:w-[450px]"
      >
        <div class="text-4 max-h-[60vh] overflow-y-auto leading-normal">
          <slot />
          <div class="mt-2">{{ detail }}</div>
          <baseInput v-show="!showSelect" placeholder="請輸入標題" v-model="inputValue" />

          <n-select
            v-show="showSelect"
            v-model:value="selectValue"
            :options="options"
            placeholder="請選擇類別"
          />
        </div>
        <template #footer v-if="showFooter">
          <div class="mt-4 flex justify-end gap-2">
            <baseButton :label="cancelText" @click="() => emit('update:modelValue', false)" />
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
              @click="submitType"
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
  isFirst?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  detail: '',
  showFooter: true,
  confirmText: '確定',
  cancelText: '取消',
  closable: true,
  isFirst: true,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'update:title', value: string): void;
  (e: 'update:type', value: number): void;
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
  // 輸入標題後傳出更新標題訊號並且切換顯示下拉選單
  console.log('觸發', inputValue.value);

  emit('update:title', inputValue.value);
  showSelect.value = true;
};

const submitType = () => {
  // 傳出select訊號並關閉彈窗
  emit('update:type', selectValue.value);
  emit('update:modelValue', false);
};
// ------------------------------

// -----------input-----------
const inputValue = ref('');

// const emitInput = (value: string) => {
//   emit('update:title', value); // 傳給父層
// };

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
