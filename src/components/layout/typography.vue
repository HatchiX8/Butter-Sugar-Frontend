<template>
  <component
    :is="computedTag"
    :class="[
      fontClass,
      sizeClass,
      weightClass,
      lineHeightClass,
    ]"
  >
    <slot></slot>

    <!-- 底線元素 -->
    <span
      v-if="underline"
      class="w-18 h-0.25 bg-primaryDefault mt-19px block"
    ></span>
  </component>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

type TypographyVariant =
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'paragraph-medium' | 'paragraph-regular'

type FontType = 'title' | 'content'

export default defineComponent({
  name: 'Typography',

  props: {
    variant: {
      type: String as () => TypographyVariant,
      default: 'h1'
    },
    fontType: {
      type: String as () => FontType,
      default: 'title',
      validator: (value: string) => ['title', 'content'].includes(value)
    },
    tag: {
      type: String,
      default: ''
    },
    underline: {
      type: Boolean,
      default: false
    }
  },

  setup(props) {
    // 動態計算標籤名稱
    const computedTag = computed(() => {
      if (props.tag) return props.tag

      if (props.variant.startsWith('h')) {
        return props.variant
      }
      return 'p'
    })

    // 字體類型
    const fontClass = computed(() => props.fontType === 'title' ? 'font-title' : 'font-content')

    // 文字大小
    const sizeClass = computed(() => {
      const sizeMap = {
        'h1': 'text-[40px]',           // 40px / 2.500rem
        'h2': 'text-[32px]',           // 32px / 2.000rem
        'h3': 'text-[28px]',           // 28px / 1.750rem
        'h4': 'text-[24px]',           // 24px / 1.500rem
        'h5': 'text-[20px]',           // 20px / 1.250rem
        'h6': 'text-[16px]',           // 16px / 1.000rem
        'paragraph-medium': 'text-[14px]',  // 14px / 1.250rem
        'paragraph-regular': 'text-[14px]'  // 14px / 1.250rem
      }
      return sizeMap[props.variant as keyof typeof sizeMap]
    })

    // 字重
    const weightClass = computed(() => {
      const weightMap = {
        'h1': 'font-bold',             // Bold
        'h2': 'font-bold',             // Bold
        'h3': 'font-bold',             // Bold
        'h4': 'font-bold',             // Bold
        'h5': 'font-bold',             // Bold
        'h6': 'font-bold',             // Bold
        'paragraph-medium': 'font-medium',  // Medium
        'paragraph-regular': 'font-normal'  // Regular
      }
      return weightMap[props.variant as keyof typeof weightMap]
    })

    // 行高
    const lineHeightClass = computed(() => {
      if (props.fontType === 'title') {
        return 'leading-[120%]'  // 標題字體 120%
      } else {
        return 'leading-[150%]'  // 內文字體 150%
      }
    })

    return {
      computedTag,
      fontClass,
      sizeClass,
      weightClass,
      lineHeightClass
    }
  }
})
</script>

<style scoped>
.font-title {
  font-family: 'Noto Serif TC', serif;
}

.font-content {
  font-family: 'Noto Sans TC', sans-serif;
}
</style>
