<template>
  <div class="flex justify-center mt-8 mb-16">
    <n-space :size="[16, 8]">
      <router-link
        v-for="tag in tags"
        :key="tag.value"
        :to="`/courseList?tag=${tag.value}`"
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
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'CourseTag',

  setup() {
    const route = useRoute()
    const currentTag = ref<string | null>(null)

    const tags = [
      { label: '蛋糕', value: 'cake' },
      { label: '餅乾', value: 'cookie' },
    ]

    // 從路由參數中獲取當前選中的標籤
    onMounted(() => {
      currentTag.value = route.query.tag as string || null
    })

    return {
      tags,
      currentTag
    }
  }
})
</script>
