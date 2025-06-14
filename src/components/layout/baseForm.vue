<template>
  <n-form
    ref="formRef"
    :model="model"
    :rules="rules"
    class="grid gap-4"
  >
    <!-- 表單上方 -->
    <slot name="header" />

    <!-- 動態渲染欄位 -->
    <n-form-item
      v-for="field in fields"
      :key="field.key"
      :label="field.label"
      :path="field.key"
      :class="getColSpanClass(field)"
    >
      <component
        :is="resolveComponent(field.type, props.readOnly)"
        v-model:value="model[field.key]"
        :field-type="field.type"
        v-bind="generateProps(field)"
      />
    </n-form-item>

    <!-- 表單下方 唯讀模式省略 -->
    <slot name="footer" v-if="!props.readOnly">
      <n-space>
        <baseButton
          :label="submitLabel"
          type="primary"
          @click="onSubmit"
        />
        <baseButton
          v-if="showCancel"
          :label="cancelLabel"
          @click="$emit('cancel')"
        />
      </n-space>
    </slot>
  </n-form>
</template>

<script setup lang="ts">
import { ref, computed, defineComponent, h } from 'vue';
import baseButton from '@/components/layout/baseButton.vue';
import baseInput from '@/components/layout/baseInput.vue';
import type { FormRules, FormItemRule } from 'naive-ui';

// 預設驗證規則
const defaultRules: FormRules = {
  birthday: {
    validator: (_: FormItemRule, value: number) => {
      if (!value) return new Error('請選擇生日');
      const today = new Date().setHours(0, 0, 0, 0);
      if (value > today) return new Error('生日不可設定未來日期');
      return true;
    },
    trigger: 'change',
  },
  phone: {
    validator: (_: FormItemRule, value: string) => {
      if (!value) return new Error('請輸入電話');
      if (!/^09\d{8}$/.test(value)) return new Error('電話格式錯誤，需以09開頭，共10碼');
      return true;
    },
    trigger: ['input', 'blur'],
  },
};

type FieldType = 'input' | 'textarea' | 'select' | 'date' | 'image';

interface FieldOption {
  label: string
  value: string | number | boolean
};

export interface FormField {
  label: string
  key: string
  type: FieldType
  placeholder?: string
  disabled?: boolean
  options?: FieldOption[] // 下拉的選項
  span?: number // 用來控制 row 佔幾欄
};

// 唯讀欄位元件
const ReadOnlyField  = defineComponent({
  name: 'ReadOnlyField',
  props: {
    value: [String, Number, Boolean, Date],
    fieldType: {
      type: String as () => FieldType,
      default: 'input'
    },
  },
  setup(props) {
    // 先把可能的值轉成可以渲染的字串
    const toDisplayString = (val: unknown) => {
      if (val === null || val === '') return '未填';
      if (val instanceof Date) return val.toLocaleDateString();
      return String(val);
    };

    return () => {
      const val = props.value;

      if (props.fieldType === 'image') {
        return h('img', {
          src: typeof val === 'string' ? val : '',
          alt: 'avatar',
          class: 'h-16 w-16 rounded-full object-cover',
        });
      }

      return h(baseInput, {
        value: toDisplayString(val),
        disabled: true,
      });
    };
  },
});

const props = defineProps<{
  model: Record<string, unknown>
  rules?: FormRules
  fields: FormField[]
  submitLabel?: string
  cancelLabel?: string
  showCancel?: boolean
  readOnly?: boolean
}>();
// defaultRules 合併 props 傳入的 rules
const rules = computed<FormRules>(() => ({
  ...defaultRules,
  ...(props.rules ?? {})
}));

const emit = defineEmits<{
  (e: 'update:modelValue', value: Record<string, unknown>): void
  (e: 'submit', model: Record<string, unknown>): void
  (e: 'cancel'): void
}>();

// 用 computed 包一層代理，允許更新
const model = computed({
  get: () => props.model,
  set: (val) => emit('update:modelValue', val)
});

const formRef = ref();

const onSubmit = () => {
  if (!formRef.value) return
  formRef.value.validate((errors: object | undefined) => {
    if (!errors) emit('submit', props.model)
  })
};

const resolveComponent = (type: FieldType, readOnly = false) => {
  if (readOnly) return ReadOnlyField;
  switch (type) {
    case 'input':
    case 'textarea':
      return baseInput;
    case 'select':
      return 'n-select';
    case 'date':
      return 'n-date-picker';
    case 'image':
      return 'n-upload';
    default:
      return baseInput;
  }
};

const generateProps = (field: FormField): Record<string, unknown> => {
  if (props.readOnly) return {} // 直接交給 ReadOnlyField

  const baseProps: Record<string, unknown> = {
    placeholder: field.placeholder ?? '',
    disabled: field.disabled ?? false
  }

  if (field.type === 'select') {
    baseProps.options = field.options ?? []
  }

  if (field.type === 'textarea') {
    baseProps.type = 'textarea'
  }

  if (field.type === 'date') {
    baseProps.type = 'date'
    baseProps.isDateDisabled = (ts: number) => ts > Date.now()
  }

  return baseProps;
};

const getColSpanClass = (field: FormField) => {
  const span = field.span ?? 1; // 預設佔 1 欄
  switch (span) {
    case 1:
      return `col-span-1`;
    case 2:
      return `col-span-2`;
    case 3:
      return `col-span-3`;
    case 4:
      return `col-span-4`;
    default:
      return `col-span-1`;
  }
};
</script>

<style scoped>
.n-form-item .n-form-item-label {
  color: white;
}
</style>
