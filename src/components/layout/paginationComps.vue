<template>
  <div class="w-full flex justify-center">
    <n-pagination
      v-bind="$attrs"
      :page="modelValue"
      :page-count="totalPages"
      :page-slot="7"
      @update:page="handlePageChange"
      class="custom-pagination"
      :class="{
        'text-white border border-white bg-neutral_500': true,
        'hover:border-primaryDefault hover:text-primaryDefault': true
      }"
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
  background-color: var(--neutral_600, #1d1810);
}

:deep(.custom-pagination .n-pagination-item) {
  width: 2.5rem;
  height: 2.5rem;
  margin-left: 0.25rem;
  margin-right: 0.25rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--white, #fffdfa);
  border: 1px solid var(--white, #fffdfa);
  background-color: var(--neutral_500, #27231b);
  transition: all 0.2s;
}

:deep(.custom-pagination .n-pagination-item:not(.n-pagination-item--disabled):hover) {
  border-color: var(--primaryDefault, #d68e39);
  color: var(--primaryDefault, #d68e39);
  background-color: var(--neutral_500, #27231b);
}

:deep(.custom-pagination .n-pagination-item.n-pagination-item--active) {
  background-color: var(--primaryDefault, #d68e39);
  color: var(--white, #fffdfa);
  border-color: var(--primaryDefault, #d68e39);
}

:deep(.custom-pagination .n-pagination-item.n-pagination-item--button:first-child) {
  background-color: var(--neutral_600, #1d1810);
  color: var(--white, #fffdfa);
  border: none;
}

:deep(.custom-pagination .n-pagination-item.n-pagination-item--button:last-child) {
  background-color: var(--neutral_600, #1d1810);
  color: var(--white, #fffdfa);
  border: none;
}

:deep(.custom-pagination .n-pagination-item.n-pagination-item--button.n-pagination-item--disabled) {
  background-color: var(--neutral_600, #1d1810);
  color: var(--neutral_300, #575656);
}
</style>
