<template>
  <!-- 購買課程區塊 -->
  <div class="flex flex-col gap-6 w-full bg-black mb-6 box-border border border-white/20 p-6 rounded-[0.125rem] p-3 w-full md:w-[411px]">
    <div>
      <typography variant="h6" font-type="title" class="text-neutral-200">購買課程</typography>
      <div class="flex items-baseline gap-4">
        <typography variant="h3" font-type="title" class="text-white text-2xl font-bold">NT$ {{ courseData?.price?.toLocaleString() || '4,200' }}</typography>
        <div class="text-white/60 line-through text-base">NT$ {{ courseData?.originPrice?.toLocaleString() || '9,800' }}</div>
      </div>
    </div>

    <div class="flex gap-3">
      <n-button type="primary" size="large" class="text-base font-semibold flex-1 p-6 max-h-12 max-w-132px bg-primaryDefault border-none hover:bg-primaryLight" @click="handlePurchase">
        <div class="flex items-center justify-center gap-2">
          <typography variant="paragraph-regular" font-type="content" class="text-neutral-100">立即購課</typography>
          <div class="i-ion:arrow-forward-outline cursor-pointer w-5 h-5"></div>
        </div>
      </n-button>

      <n-button size="large" class="text-base font-semibold flex-1 p-6 max-h-12 bg-transparent border border-white text-white max-w-146px" @click="handleAddToCart">
        <div class="flex items-center justify-center gap-2">
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

</style>
