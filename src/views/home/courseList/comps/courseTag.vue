<template>
  <div class="flex justify-center mt-8 mb-16">
    <n-space :size="[16, 8]">
      <router-link
        v-for="tag in tags"
        :key="tag.value"
        :to="`../home/course-info?category_id=${tag.value}`"
        class="no-underline"
      >
        <n-tag
          size="large"
          :bordered="true"
          class="px-6 py-3 text-sm font-medium rounded-25 cursor-pointer transition-colors"
          :class="[currentTag === tag.value ? 'bg-primaryDefault text-white' : 'bg-neutral_600 text-white hover:bg-neutral_500']"
        >
          # {{ tag.label }}
        </n-tag>
      </router-link>
    </n-space>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCategoryStore } from '@/stores/models/course/categoryStore'
import type { Category } from '../api/type'

export default defineComponent({
  name: 'CourseTag',

  setup() {
    const route = useRoute()
    const currentTag = ref<string | null>(null)
    const categoryStore = useCategoryStore()

    // 從 store 計算得到標籤數據
    const tags = computed(() => categoryStore.categories.map((category: Category) => ({
      label: category.name,
      value: String(category.id)
    })))

    // 獲取課程分類數據
    const fetchCategories = async () => {
      await categoryStore.fetchCategories()
    }

    // 從路由參數中獲取當前選中的標籤
    onMounted(() => {
      currentTag.value = route.query.tag as string || null
      fetchCategories() // 組件掛載時獲取分類數據
    })

    return {
      tags,
      currentTag,
      loading: computed(() => categoryStore.loading)
    }
  }
})
</script>
