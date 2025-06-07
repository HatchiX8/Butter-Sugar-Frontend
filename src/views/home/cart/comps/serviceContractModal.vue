<template>
  <baseModal
    :modelValue="modelValue"
    @update:modelValue="(val) => emit('update:modelValue', val)"
    title="Butter&Sugar 服務契約"
    :showFooter="false"
  >
    <div class="space-y-4 text-sm leading-6 text-left px-4">
      <p>
        歡迎使用本網站（以下簡稱「本平台」）。在使用本平台提供的服務前，請詳細閱讀以下條款。當您使用本平台，即表示您同意遵守本服務契約。
      </p>

      <ol class="pl-4 space-y-3 list-decimal">
        <li v-for="(term, index) in terms" :key="index">
          <p><strong>{{ index + 1 }}. {{ term.title }}</strong></p>
          <div v-if="term.content">
            <p v-if="typeof term.content === 'string'">{{ term.content }}</p>
            <ul v-else class="pl-4">
              <li v-for="(item, i) in term.content" :key="i">· {{ item }}</li>
            </ul>
          </div>
        </li>
      </ol>
    </div>
  </baseModal>
</template>

<script setup lang="ts">
import baseModal from '@/components/layout/baseModal.vue';

defineProps<{ modelValue: boolean }>();
const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>();

type Term = {
  title: string;
  content: string | string[];
};

const terms: Term[] = [
  {
    title: '服務說明：',
    content: '本平台提供烘焙課程的影音內容，您可透過註冊會員並支付相關費用以獲取課程的觀看權限。',
  },
  {
    title: '帳號註冊與安全：',
    content: [
      '您需提供有效的本人正確、最新及完整的資料以完成註冊。',
      '您使用本服務之一切行為必須符合當地或國際相關法令規範；對於用戶的一切行為，您須自行負擔全部責任。',
    ],
  },
  {
    title: '付款與訂閱：',
    content: [
      '本平台提供一次性購買課程的模式。',
      '付款完成後，您將獲得對應課程的觀看權限。',
    ],
  },
  {
    title: '內容使用與智慧財產權：',
    content: [
      '本平台上的所有內容（包括但不限於影片、文字、圖片）均受智慧財產權保護，僅供個人學習使用。',
      '未經許可，不得擅自複製、轉載、分享或商業使用平台內容。',
    ],
  },
  {
    title: '使用本平台時，您不得從事以下行為：',
    content: [
      '未經授權分享或散播課程內容。',
      '嘗試駭入、破壞或干擾平台運作。',
      '提供虛假資訊或冒充他人。',
    ],
  },
  {
    title: '暫停服務之處理：',
    content:
      '本平台針對可預知之軟硬體維護工作，有可能導致系統中斷或是暫停者，將會於該狀況發生前 7 日，於本平台上公告，並以電子郵件通知您。但因臨時性、急迫性或不可歸責於本平台之事由者，不在此限。',
  },
  {
    title: '條款變更：',
    content:
      '本平台保留隨時修改本使用者條款的權利，修改後的條款將公告於本平台。若您對本條款有任何疑問，請聯繫我們的客服團隊。',
  },
];
</script>
