<template>
  <div class="course-section">
    <!-- 課程資訊區塊 -->
    <div class="course-info-container">
      <courseDetail :course-data="courseData" />
    </div>

    <!-- 購買課程區塊 -->
    <div class="course-purchase-container bg-black">
      <div class="course-price-section">
        <div class="price-label">購買課程</div>
        <div class="price-display">
          <typography variant="h3" font-type="title" class="current-price">NT$ {{ courseData?.price?.toLocaleString() || '4,200' }}</typography>
          <div class="original-price">NT$ {{ courseData?.originPrice?.toLocaleString() || '9,800' }}</div>
        </div>
      </div>

      <div class="action-buttons">
        <n-button type="primary" size="large" class="purchase-button" @click="handlePurchase">
          <div class="button-content">
            <typography variant="paragraph-regular" font-type="content" class="text-neutral-100">立即購課</typography>
            <div class="i-ion:arrow-forward-outline cursor-pointer w-5 h-5"></div>
          </div>
        </n-button>
        <n-button size="large" class="cart-button" @click="handleAddToCart">
          <div class="button-content">
            <typography variant="paragraph-regular" font-type="content" class="text-neutral-100">加入購物車</typography>
            <div class="i-ion:cart cursor-pointer w-5 h-5"></div>
          </div>
        </n-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import courseDetail from './courseDetail.vue';
import typography from '@/components/layout/typography.vue';
import { NButton } from 'naive-ui';

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

const emit = defineEmits(['purchase', 'addToCart']);

const handlePurchase = () => {
  emit('purchase');
};

const handleAddToCart = () => {
  emit('addToCart');
};
</script>

<style scoped>
.course-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 3.75rem;
  max-width: 1280px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .course-section {
    flex-direction: row;
  }
}

.course-info-container, .course-purchase-container {
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1.5rem;
  border-radius: 0.125rem;
}

.course-info-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 845px;
}

.course-purchase-container {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  width: 411px;
}

.course-price-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.price-label {
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.price-display {
  display: flex;
  align-items: baseline;
  gap: 1rem;
}

.current-price {
  color: white;
  font-size: 2rem;
  font-weight: 700;
}

.original-price {
  color: rgba(255, 255, 255, 0.6);
  text-decoration: line-through;
  font-size: 1rem;
}

.action-buttons {
  display: flex;
  gap: 0.75rem;
}

@media (max-width: 767px) {
  .action-buttons {
    flex-direction: column;
  }
}

.purchase-button, .cart-button {
  height: 3rem;
  font-size: 1rem;
  font-weight: 600;
  flex: 1;
}

.purchase-button {
  background-color: #F5A623;
  border: none;
}

.purchase-button:hover {
  background-color: #e69b1f;
}

.cart-button {
  background-color: transparent;
  border: 1px solid white;
  color: white;
}

.button-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}
</style>
