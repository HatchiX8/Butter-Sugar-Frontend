<template>
  <!-- 購買課程區塊 -->
  <div class="course-purchase-container">
    <div class="course-price-section">
      <typography variant="h6" font-type="title" class="text-neutral-200">購買課程</typography>
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
</template>

<script setup lang="ts">
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
.course-purchase-container {
  @apply flex flex-col gap-6 w-full bg-black mb-6 box-border border border-white/20 p-6 rounded-[0.125rem];
}

@media (max-width: 768px) {
  .course-purchase-container {
    @apply p-3 w-full;
  }
}

@media (min-width: 768px) {
  .course-purchase-container {
    @apply w-[411px];
  }
}

.course-price-section {
  @apply flex flex-col items-start;
}

.price-label {
  @apply text-white text-xl font-semibold mb-2;
}

.price-display {
  @apply flex items-baseline gap-4;
}

.current-price {
  @apply text-white text-2xl font-bold;
}

.original-price {
  @apply text-white/60 line-through text-base;
}

.action-buttons {
  @apply flex gap-3;
}

@media (max-width: 767px) {
  .action-buttons {
    @apply flex-col;
  }
}

.purchase-button, .cart-button {
  @apply text-base font-semibold flex-1 p-6 max-h-12;
}

.purchase-button {
  @apply bg-primaryDefault border-none;
}

.purchase-button:hover {
  @apply bg-primaryLight;
}

.cart-button {
  @apply bg-transparent border border-white text-white;
}

.button-content {
  @apply flex items-center justify-center gap-2;
}
</style>
