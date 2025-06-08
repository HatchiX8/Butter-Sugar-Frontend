<template>
  <n-input
    v-model:value="mergedValue"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    :input-props="inputAttrs"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

interface Props {
  modelValue?: string
  type?: 'text' | 'textarea'
  placeholder?: string
  disabled?: boolean
  inputProps?: Record<string, string | number | boolean>
};

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>();

const localValue = ref('');

// 合併內外值（v-model 優先）
const mergedValue = computed({
  get() {
    return props.modelValue !== undefined ? props.modelValue : localValue.value
  },
  set(val: string) {
    if (props.modelValue !== undefined) {
      emit('update:modelValue', val)
    } else {
      localValue.value = val
    }
  },
});

const inputAttrs = computed(() => props.inputProps ?? {});
</script>
