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
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  margin: 15px 0;
  border-radius: 0.125rem;
}

.notify-header {
  display: flex;
  align-items: center;
  margin-right: 1rem;
}

.notify-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

/* 手機版響應式設計 */
@media (max-width: 768px) {
  .notify-container {
    flex-direction: column;
    padding: 0.75rem;
    max-height: none;
  }

  .notify-header {
    margin-right: 0;
    margin-bottom: 0.5rem;
  }

  .notify-content {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
