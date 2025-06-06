<template>
  <div class="course-info-header">
    <typography variant="h2" font-type="title" class="text-white">課程資訊</typography>
  </div>
  <!-- 課程資訊內容 -->
  <div class="course-info-content">
    <div class="info-item">
      <div class="icon-container">
        <div class="i-ion:star text-primary-light"></div>
      </div>
      <div>開課日期 {{ formatDate(courseData?.created_at) || '2025/06/06' }}</div>
    </div>
    <div class="info-item">
      <div class="icon-container">
        <div class="i-ion:calendar-clear-outline text-primary-light"></div>
      </div>
      <div>觀看期限 無限制</div>
    </div>
    <div class="info-item">
      <div class="icon-container">
        <div class="i-ion:time-outline text-primary-light"></div>
      </div>
      <div>課程時數 {{ courseData?.hours || 11 }} 小時</div>
    </div>
    <div class="info-item">
      <div class="icon-container">
        <div class="i-ion:people text-primary-light"></div>
      </div>
      <div>學員人數 {{ formatNumber(courseData?.students || 1308) }} 人</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import typography from '@/components/layout/typography.vue';

const formatNumber = (num: number): string => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const formatDate = (dateString?: string): string => {
  if (!dateString) return '2025/06/06';

  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}/${month}/${day}`;
};

interface CourseData {
  id?: number;
  title?: string;
  teacher?: string;
  description?: string;
  hours?: number;
  students?: number;
  price?: number;
  originPrice?: number;
  is_bookmark?: boolean;
  created_at?: string;
}

defineProps<{
  courseData?: CourseData;
}>();
</script>

<style scoped>
.course-info-header {
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 1rem;
}

.course-info-content {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: white;
  width: calc(50% - 0.5rem);
}

.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
}
</style>
