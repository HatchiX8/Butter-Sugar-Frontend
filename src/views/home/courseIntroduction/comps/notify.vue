<template>
  <div class="notify-container">
    <div class="notify-header">
      <notifyIcon class="me-2"/>
      <typography variant="h6" font-type="title" class="text-neutral-100">最新公告：</typography>
    </div>
    <div class="notify-content">
      <typography variant="paragraph-medium" font-type="content" class="text-neutral-100">職人級！一次掌握歐式麵包的高水量與發酵秘訣 課程內容已全部上架</typography>
      <typography variant="paragraph-medium" font-type="content" class="text-neutral-100 underline" @click="notify('info')">查看</typography>
    </div>
  </div>
</template>

<script lang="ts">
import type { NotificationType } from 'naive-ui'
import { useNotification } from 'naive-ui'
import { defineComponent } from 'vue'
import notifyIcon from './notifyIcon.vue'
import typography from '@/components/layout/typography.vue'

export default defineComponent({
  components: {
    notifyIcon,
    typography
  },
  setup() {
    const notification = useNotification()
    return {
      notify(type: NotificationType) {
        notification[type]({
          description: '職人級！一次掌握歐式麵包的高水量與發酵秘訣',
          title: '最新公告：',
          content: '課程內容已全部上架',
        })
      }
    }
  }
})
</script>

<style scoped>
.notify-container {
  @apply w-full box-border flex items-start border border-solid border-white/20 bg-white/5 p-6 my-[15px] rounded-[0.125rem];
}

.notify-header {
  @apply flex items-center mr-4;
}

.notify-content {
  @apply flex flex-row items-center flex-wrap gap-2;
}

/* 手機版響應式設計 */
@media (max-width: 768px) {
  .notify-container {
    @apply flex-col p-3 max-h-none;
  }

  .notify-header {
    @apply mr-0 mb-2;
  }

  .notify-content {
    @apply flex-col items-start;
  }
}
</style>
