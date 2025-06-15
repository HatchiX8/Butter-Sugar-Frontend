<template>
  <div class="w-full flex justify-center">
    <n-pagination
      v-bind="$attrs"
      :page="modelValue"
      :page-count="totalPages"
      :page-slot="7"
      @update:page="handlePageChange"
      class="custom-pagination"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PaginationComps',

  props: {
    totalPages: {
      type: Number,
      required: true,
      default: 1
    },
    modelValue: {
      type: Number,
      required: true,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 12
    },
    totalItems: {
      type: Number,
      default: 0
    }
  },

  emits: ['update:modelValue', 'page-change'],

  setup(props, { emit }) {
    const handlePageChange = (page: number) => {
      emit('update:modelValue', page)
      emit('page-change', page)
    }

    return {
      handlePageChange
    }
  }
})
</script>

<style scoped>
:deep(.custom-pagination) {
  @apply bg-neutral_600;
}

:deep(.custom-pagination .n-pagination-item) {
  @apply w-10 h-10 mx-1 rounded-lg text-sm font-medium  text-white border border-white bg-neutral_500 transition-all duration-200;
}

:deep(.custom-pagination .n-pagination-item:not(.n-pagination-item--disabled):hover),
:deep(.custom-pagination .n-pagination-item.n-pagination-item--hover) {
  @apply border-primaryDefault text-primaryDefault bg-neutral_500;
}

:deep(.custom-pagination .n-pagination-item.n-pagination-item--active) {
  @apply bg-primaryDefault text-white border-primaryDefault;
}

:deep(.custom-pagination .n-pagination-item.n-pagination-item--button:first-child),
:deep(.custom-pagination .n-pagination-item.n-pagination-item--button:last-child) {
  @apply bg-neutral_600 text-white border-none;
}

:deep(.custom-pagination .n-pagination-item.n-pagination-item--button.n-pagination-item--disabled) {
  @apply bg-neutral_600 text-neutral_300;
}
</style>
