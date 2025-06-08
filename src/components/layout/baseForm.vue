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
    >
      <component
        :is="resolveComponent(field.type)"
        v-model:value="model[field.key]"
        v-bind="generateProps(field)"
      />
    </n-form-item>

    <!-- 表單下方 -->
    <slot name="footer">
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
import { ref, computed } from 'vue';
import baseButton from '@/components/layout/baseButton.vue';
import baseInput from '@/components/layout/baseInput.vue';

type FieldType = 'input' | 'textarea' | 'select' | 'date';

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
  options?: FieldOption[]
};

const props = defineProps<{
  model: Record<string, unknown>
  rules?: Record<string, unknown>
  fields: FormField[]
  submitLabel?: string
  cancelLabel?: string
  showCancel?: boolean
}>();

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

const resolveComponent = (type: FieldType) => {
  switch (type) {
    case 'input':
    case 'textarea':
      return baseInput;
    case 'select':
      return 'n-select';
    case 'date':
      return 'n-date-picker';
    default:
      return baseInput;
  }
};

const generateProps = (field: FormField): Record<string, unknown> => {
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
</script>

<style>
.n-form-item .n-form-item-label {
  color: white;
}
</style>
