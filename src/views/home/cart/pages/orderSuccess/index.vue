<!-- 訂購完成頁面 -->
<template>
  <div class="text-white">
    <div class="max-w-6xl mx-auto px-4 py-8">
      <div class="flex flex-col md:flex-row justify-between text-white p-4 gap-4">
        <!-- 訂單資訊 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 flex-1">
          <div v-for="(item, index) in orderInfo" :key="index"
            class="border rounded text-base p-2">
            <span>{{ item.label }}：</span>
            <!-- 顯示多筆課程（多行） -->
            <ul
              v-if="Array.isArray(item.value) && item.value.length > 1"
              class="mt-1 pl-4"
            >
              <li v-for="(course, i) in item.value" :key="i"
                class="relative pl-4 before:content-[''] before:block  before:absolute before:left-0 before:top-1.5 before:w-2 before:h-2 before:rounded-full before:bg-primaryDefault">
                {{ course }}
              </li>
            </ul>
            <!-- 顯示單筆課程 or 一般文字（同行） -->
            <span v-else>
              {{
                Array.isArray(item.value)
                  ? item.value[0] ?? '-'
                  : item.value
              }}
            </span>
          </div>
        </div>
        <!-- 訂單狀態 -->
        <div class="flex items-center md:items-end md:justify-center md:justify-end text-5">
          <span class="inline-block w-5 h-5 i-ion:checkmark-circle mx-1 text-green-600"></span>
          <span>{{ orderStatus }}</span>
        </div>
      </div>
      <cartList
        :cartItems="cartItems"
        :itemCount="itemCount"
        :orderDetails="true"
      />
    </div>
  </div>
<welcomeSection/>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useOrderStore } from '@/stores/models/orders/store';
import welcomeSection from '@/views/home/cart/comps/welcomeSection.vue';
import cartList from '@/components/data/cartList.vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import type { CartItem } from '@/api/cart/types';

const orderStatus = '完成付款';
const route  = useRoute();
const orderStore = useOrderStore();
const { orderItems, itemCount, order } = storeToRefs(orderStore);

// 解析路由 renderData，取得 orderNumber
const renderData = computed(() => {
  const raw = route.query.renderData as string | undefined;
  if (!raw) return null;

  try {
    return JSON.parse(decodeURIComponent(raw));
  } catch (error) {
    console.error('renderData 無法解析', error);
    return null;
  }
});
const orderNumber = computed(() => renderData.value?.order_number ?? '');

// reactive 的 cartItems
const cartItems = computed<CartItem[]>(() =>
  orderItems.value.map(item => ({
    course_id: item.course_id,
    course_name: item.course_name,
    price: item.sell_price,
    course_small_imageurl: item.course_small_imageurl
  }))
);

const formatDatetime = (inputTime: string) => {
  try {
    const formatter = new Intl.DateTimeFormat('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Taipei'
    });

    const formatted = formatter.format(new Date(inputTime)).replace(/\//g, '-'); // 把字串中 所有的 / 字元 換成 -
    return formatted;
  } catch (error) {
    console.warn('時間格式化失敗，回傳原始值：', inputTime, error)
    return inputTime;
  }
};
const formatCurrency = (value: number, currency = 'NT$'): string => `${currency} ${value.toLocaleString('en-US')}`;

// 訂單資訊
const orderInfo = computed(() => order.value
  ? [
      { label: '訂單編號', value: order.value.order_number },
      { label: '訂單日期', value: formatDatetime(order.value.created_at) },
      { label: '付款方式', value: order.value.payway },
      { label: '實付金額', value: formatCurrency(order.value.final_amount) }
    ]
  : []
);

onMounted(async () => {
  if (!orderNumber.value) {
    console.error('renderData 中缺少 order_number');
    return;
  }
  await orderStore.fetchOrder(orderNumber.value);
});
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
