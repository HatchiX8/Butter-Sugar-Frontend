<template>
  <div class="course-section">
    <!-- 課程資訊區塊 (左欄) -->
    <div class="course-info-container border-solid border-white/10 order-last md:order-first gap-25">
      <courseDetail :course-data="courseData" />
      <courseIntro />
      <courseChapter />
      <faq />
    </div>

    <!-- 右欄內容：購買課程和講師介紹 -->
    <div class="right-column order-first md:order-last">
      <!-- 購買課程區塊 -->
      <coursePurchase
        :course-data="courseData"
        @purchase="handlePurchase"
        @add-to-cart="handleAddToCart"
      />

      <!-- 講師介紹區塊 -->
      <teacherIntro class="mt-6" />
    </div>
  </div>
</template>

<script setup lang="ts">
import courseDetail from './courseDetail.vue';
import teacherIntro from './teacherIntro.vue';
import coursePurchase from './coursePurchase.vue';
import courseIntro from './courseIntro.vue';
import courseChapter from './courseChapter.vue';
import faq from './faq.vue';

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
  @apply w-full flex flex-col gap-6 mt-[3.75rem] max-w-[1280px] mx-auto items-center box-border;
}

@media (min-width: 768px) {
  .course-section {
    @apply flex-row items-start justify-center;
  }
}

.right-column {
  @apply flex flex-col w-full max-w-full;
}

@media (min-width: 768px) {
  .right-column {
    @apply w-[411px];
  }
}

.course-info-container, .course-purchase-container {
  @apply border border-white/20 p-6 rounded-[0.125rem];
}

@media (max-width: 768px) {
  .course-info-container, .course-purchase-container {
    @apply p-3 w-full;
  }
}

.course-info-container {
  @apply flex flex-col gap-6 w-full box-border;
}

.course-purchase-container {
  @apply flex flex-col gap-6 w-full bg-black mb-6 box-border;
}

@media (min-width: 768px) {
  .course-info-container {
    @apply w-[845px];
  }

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
