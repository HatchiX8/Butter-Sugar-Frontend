<!-- 結帳資訊頁面 -->
<template>
  <div class="flex gap-6">
    <div class="bg-neutral_600 border-1 border-white/10% rounded-0.5 flex-1 border-solid p-4">
      <div v-if="orderDetails === true" class="mb-4 flex items-center justify-between p-4">
        <div>
          <h2 class="text-6 font-bold">訂單明細</h2>
          <div class="h-0.1 bg-primaryDefault mt-4 w-14"></div>
        </div>
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
            :to="`/home/course/${item.course_id}`"
            class="group flex flex-1 cursor-pointer items-start gap-4 no-underline"
          >
            <!-- 課程圖片 -->
            <div
              class="h-24 w-36 shrink-0 overflow-hidden rounded-md transition-shadow duration-300 group-hover:shadow-lg"
            >
              <img
                :src="item.course_smallimage"
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
                <n-button text @click="showConfirmModal = true">
                  <span class="text-neutral_300 hover:text-primaryDefault">移除</span>
                </n-button>
                <n-button text @click="remove(item.course_id)">
                  <div
                    class="i-ion:trash-outline text-neutral_300 hover:text-primaryDefault h-4 w-4"
                  ></div>
                </n-button>
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
  <confirmModal v-model="showConfirmModal" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import confirmModal from '@/views/home/cart/comps/confirmModal.vue';

const showConfirmModal = ref(false); // 彈跳視窗開關

interface CartItem {
  course_id: string;
  course_name: string;
  course_smallimage: string;
  price: number;
}

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

const emit = defineEmits<{
  (e: 'removeItem', id: string): void;
}>();

// 傳遞emit預刪除ID至父元件
const remove = (id: string) => {
  console.log('回傳刪除ID給父元件', id);

  emit('removeItem', id);
};
// -----------------------------

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
