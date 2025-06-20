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
import type { CartItem } from '@/api/cart/types';

interface CourseData {
  link: string;
  id: number;
  uuid: string;
  img: string;
  title: string;
  teacher: string;
  description: string;
  rating: number;
  students: number;
  hours: number;
  price: number;
  originPrice: number;
  is_bookmark: boolean;
  created_at: string;
  course_description: string | null;
  suitable_for: string | null;
  course_goal: string | null;
  course_description_imageUrl: string | null;
  course_small_imageUrl: string | null;
  teacher_id: string;
}

const props = defineProps<{
  courseData?: CourseData;
}>();

const emit = defineEmits(['purchase', 'add-to-cart']);

const cartItem: CartItem = {
  course_id: props.courseData?.uuid ?? '',
  course_name: props.courseData?.title ?? '',
  price: props.courseData?.price ?? 0,
  course_small_imageurl: props.courseData?.course_small_imageUrl ?? ''
}

const handlePurchase = () => {
  emit('purchase', cartItem);
};

const handleAddToCart = () => {
  emit('add-to-cart', cartItem)
};
</script>

<style scoped>

</style>
