<template>
  <div class="border-b border-neutral-700 p-4">
    <div class="flex items-start gap-4 pb-4">
      <!-- 課程圖片 -->
      <div class="shrink-0">
        <img
          src="@/assets/images/cart/8fc588efdbb79272a54f5e9b7a2ed0ea694a6e74.jpg"
          alt="課程小圖"
          class="h-24 w-36 rounded-md object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <!-- 課程資訊 -->
      <div class="flex w-full items-start justify-between">
        <!-- 課程名稱 -->
        <div class="clamped-text pr-4 text-base font-bold leading-snug text-white">
          香濃奶油香氣四溢！手作日式生吐司
        </div>
        <div class="min-w-30 text-right">
          <div class="mb-3 text-xl font-bold text-white">NT$ 500</div>
          <!-- 移除按鈕 -->
          <div class="flex items-center justify-end gap-2">
            <n-button text>
              <span class="hover:text-primaryDefault text-neutral-300">移除</span>
            </n-button>
            <n-button text>
              <div
                class="i-ion:trash-outline hover:text-primaryDefault h-4 w-4 text-neutral-300"
              ></div>
            </n-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { useCartStore } from '@/stores/models/cart/store';
// import { storeToRefs } from 'pinia';

// const cartStore = useCartStore();

// const { cartItems } = storeToRefs(cartStore);

// const formatCurrency = (value: number, currency = 'NT$'): string =>
//   `${currency} ${value.toLocaleString('en-US')}`;
</script>

<style scoped>
.clamped-text {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>
