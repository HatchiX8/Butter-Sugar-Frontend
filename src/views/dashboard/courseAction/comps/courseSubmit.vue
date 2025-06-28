<template>
  <div>
    <div>
      <p class="fw-bold text-primaryDefault">「設定合理的價格，讓您的課程既具吸引力，又能為您的專業知識帶來穩定收益！</p>
      <br />
      <p class="py-3">* 如果您要免費提供課程，則影片內容總長度不可超過 1 小時</p>
      <p class="py-3">* 如果您要免費提供課程，金額請填入 0 視為免費</p>
    </div>
    <div class=""><n-divider /></div>
    <div class="flex mb-5">
      <div class="flex flex-wrap gap-4 flex-1">
        <!-- 定價 -->
        <div class="flex items-center gap-2 flex-1 min-w-[200px]">
          <p class="text-white">定價 TWD</p>
          <n-input v-model:value="localOriginPrice" type="text" placeholder="請輸入定價" class="bg-black text-white focus:outline-none flex-1"
          />
        </div>
        <!-- 售價 -->
        <div class="flex items-center gap-2 flex-1 min-w-[200px]">
          <p class="text-white">售價 TWD</p>
          <n-input v-model:value="localSellPrice" type="text" placeholder="請輸入售價" class="bg-black text-white focus:outline-none flex-1"
          />
        </div>
      </div>
      <n-button type="primary" class="bg-primaryDefault text-white border-none rounded-md px-4 py-3 mx-4" @click="emit('save')">儲存</n-button>
    </div>
    <div>
      <n-button class="bg-secondaryDefault text-white border-none rounded-md px-4 py-3 mr-4 mb-5">提交審核</n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  courseData: {
    id: string;
    origin_price: string;
    sell_price: string;
  };
}>();

const emit = defineEmits(['update:originPrice', 'update:sellPrice', 'save']);

// 初始本地 ref（空的）
const localOriginPrice = ref<string>('');
const localSellPrice = ref<string>('');

// 當 props.courseData 改變時，同步本地的價格欄位
watch(
  () => props.courseData,
  (newData) => {
    localOriginPrice.value = newData.origin_price;
    localSellPrice.value = newData.sell_price;
  },
  { immediate: true, deep: true } // 加上 immediate 讓一進來就執行一次，deep 是因為是物件
);

// 同步輸入變更回父層
watch(localOriginPrice, (val) => emit('update:originPrice', val));
watch(localSellPrice, (val) => emit('update:sellPrice', val));
</script>
