<template>
  <n-button
    :type="type"
    :text="text"
    :disabled="disabled"
    :loading="loading"
    @click="$emit('click')"
  >
    <!-- 左側 icon -->
    <span
      v-if="hasIcon && !isIconRight"
      :class="[icon, iconClass, 'inline-block align-middle transition-colors mr-1']"
    />

    <!-- slot 優先，其次 label -->
    <slot>
      <span :class="[labelClass, 'transition-colors']">{{ label }}</span>
    </slot>

    <!-- 右側 icon -->
    <span
      v-if="hasIcon && isIconRight"
      :class="[icon, iconClass, 'inline-block align-middle transition-colors ml-1']"
    />
  </n-button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = withDefaults(
  defineProps<{
    label?: string
    type?: 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error'
    text?: boolean
    disabled?: boolean
    loading?: boolean
    icon?: string
    iconPosition?: 'left' | 'right'
    iconClass?: string,
    labelClass?: string
  }>(),
  {
    type: 'default',
    text: false,
    disabled: false,
    loading: false,
    iconPosition: 'left',
    iconClass: 'w-3.5 h-3.5 color-white',
    labelClass: ''
  }
);

defineEmits<{
  (e: 'click'): void
}>();

const hasIcon = computed(() => !!props.icon);
const isIconRight = computed(() => props.icon && props.iconPosition === 'right');
</script>
