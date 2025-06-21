<!-- 結帳資訊頁面 -->
<template>
  <div v-if="itemCount !== 0" class="flex gap-6">
    <div class="bg-neutral_600 border-1 border-white/10% rounded-0.5 flex-1 border-solid p-4">
      <div class="mb-4 flex items-center justify-between px-4">
        <typography variant="h4" font-type="title" underline>{{ headerTitle }}</typography>
        <div class="font-['Noto Sans TC'] text-primaryDefault text-4 text-right">
          總共 {{ itemCount }} 件
        </div>
      </div>
      <div v-for="(item, index) in visibleItems" :key="item.course_id" class="p-4">
        <div
          class="flex items-start gap-4 pb-4"
          :class="{ 'custom-border-bottom': index !== visibleItems.length - 1 }"
        >
          <router-link
            :to="{ name: 'Course', params: { id: item.course_id } }"
            class="group flex flex-1 cursor-pointer items-start gap-4 no-underline"
          >
            <!-- 課程圖片 -->
            <div
              class="h-24 w-36 shrink-0 overflow-hidden rounded-md transition-shadow duration-300 group-hover:shadow-lg"
            >
              <img
                :src="item.course_small_imageurl"
                alt="課程小圖"
                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <!-- 課程名稱 -->
            <div class="clamped-text text-base font-bold leading-snug text-white">
              {{ item.course_name }}
            </div>
          </router-link>
          <div>
            <div class="w-21 min-w-28 text-right">
              <div class="mb-3 text-lg font-bold text-white">
                {{ formatCurrency(item.price) }}
              </div>
              <div v-if="orderDetails === false" class="flex items-center justify-end gap-2">
                <baseButton text label="移除" @click="openConfirmModal(item)" icon="i-ion:trash-outline" iconPosition="right" iconClass="w-4 h-4 text-neutral_200 hover:text-primaryDefault" labelClass="text-neutral_200 hover:text-primaryDefault" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="cartItems.length > 2 && orderDetails === true"
        class="mt-4 flex cursor-pointer justify-center"
        @click="toggleExpanded"
      >
        <span>{{ expanded ? '收合內容' : '查看更多' }}</span>
        <span
          class="inline-block h-3.5 w-3.5 align-middle"
          :class="[expanded ? 'i-ion:chevron-up' : 'i-ion:chevron-down']"
        ></span>
      </div>
    </div>
  </div>
  <confirmModal
    v-if="itemToDelete"
    v-model:modelValue="showConfirmModal"
    :item="itemToDelete"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import confirmModal from '@/views/home/cart/comps/confirmModal.vue';
import baseButton from '@/components/layout/baseButton.vue';
import typography from '@/components/layout/typography.vue';
import type { CartItem } from '@/api/cart/types';

// 移除課程彈窗
const itemToDelete = ref<{ cart_item_id?: string; course_id: string; course_name: string } | null>(null);
const showConfirmModal = ref(false);
const openConfirmModal = (item: { cart_item_id?: string; course_id: string; course_name: string }) => {
  itemToDelete.value = item
  showConfirmModal.value = true
};

// 標題顯示
const headerTitle = computed(() =>
  props.orderDetails ? '訂單明細' : '購物車',
);

// ----------props & emit----------
const props = withDefaults(
  defineProps<{
    cartItems?: CartItem[];
    itemCount?: number;
    orderDetails?: boolean;
  }>(),
  {
    cartItems: () => [],
    itemCount: 0,
    orderDetails: false,
  }
);

const formatCurrency = (value: number, currency = 'NT$'): string =>
  `${currency} ${value.toLocaleString('en-US')}`;

// 控制展開明細
const expanded = ref(false);

const visibleItems = computed(() => {
  // 如果是購物車清單會顯示全部項目，訂單明細會顯示前兩個項目
  if (props.orderDetails === true) {
    return expanded.value ? props.cartItems : props.cartItems.slice(0, 2);
  }
  return props.cartItems;
});

const toggleExpanded = () => {
  expanded.value = !expanded.value;
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
