<!-- 結帳資訊頁面 -->
<template>
  <div class="text-white">
    <div class="max-w-6xl mx-auto px-4 py-8">
      <div class="text-white m-b-6">
        <router-link :to="{ name: 'Cart' }"
          class="w-28 cursor-pointer no-underline text-white hover:text-primaryDefault">
          <span class="inline-block align-middle w-3.5 h-3.5 i-ion:arrow-back mx-1"></span>
          <span>回上一步</span>
        </router-link>
      </div>
      <div class="flex gap-6">
        <cartList
          :cartItems="cartItems"
          :itemCount="itemCount"
          :orderDetails="true"
        />
        <!-- 訂單資訊 -->
        <div class="bg-black px-4 py-8 rounded text-4 md:w-1/3 flex-shrink-0 flex flex-col h-1/4 sticky top-24">
          <h3 class="font-['Noto Sans TC'] font-bold mb-4">訂單資訊</h3>
          <div class="mb-4 flex justify-between text-neutral_200 p-b-4 custom-border-bottom cursor-pointer">
            <span>折價券</span>
            <div>
              <span>選擇或輸入</span>
              <span class="inline-block align-middle w-3.5 h-3.5 i-ion:chevron-forward-sharp ml-1"></span>
            </div>
          </div>
          <div class="mb-4 flex justify-between text-neutral_200">
            <span>小計</span>
            <span>{{ formatCurrency(totalPrice) }}</span>
          </div>
          <div class="mb-4 flex justify-between text-neutral_200">
            <span>總計</span>
            <span class="text-white text-5">{{ formatCurrency(totalPrice) }}</span>
          </div>
          <baseButton label="確認送出" type="primary" :disabled="itemCount === 0" class="mt-4 w-full"
          :loading="loading"
          @click="handleCheckout" />
          <div class="font-['Noto Sans TC'] text-3 text-align-center line-height-5 mt-2">
            <span>點擊上方按鈕即表示</span><br>
            <span>您已閱讀並同意</span>
            <span class="text-primaryDefault cursor-pointer" @click="showContractModal = true"> Butter&Sugar 服務契約</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <serviceContractModal v-model="showContractModal" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCartStore } from '@/stores/models/cart/store';
import { storeToRefs } from 'pinia';
import serviceContractModal from '@/views/home/cart/comps/serviceContractModal.vue';
import baseButton from '@/components/layout/baseButton.vue';
import cartList from '@/components/data/cartList.vue';

const showContractModal = ref(false);

const cartStore = useCartStore();

const { cartItems, itemCount, totalPrice, loading } = storeToRefs(cartStore);

const formatCurrency = (value: number, currency = 'NT$'): string => `${currency} ${value.toLocaleString('en-US')}`;

onMounted(() => {
  cartStore.getCart();
});

const handleCheckout = () => {
  // 暫時 折扣券
  cartStore.checkout({
    coupon_id: 'd8fdfcbe-7e78-48e9-9797-6788775c679e',
    coupon: 'buttersugar2025',
    discount_amount: 0,
  });
};
</script>

<style scoped>
.clamped-text {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.custom-border-bottom {
  @apply: border-b-1 border-b-solid border-b-white/20%;
}
</style>
