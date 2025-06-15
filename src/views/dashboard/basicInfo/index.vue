<template>
  <div class="line-height-normal px-5 text-white">
    <div class="border-primaryDefault/30% mb-10 border-b border-solid pb-10">
      <typography variant="h4" font-type="title" class="-mt-10 mb-5 text-white" no-underline>
        基本資訊
      </typography>
      <p class="text-primaryDefault fw-bold">
        <span class="i-ion:bookmarks w-4.5 h-4.5 text-primaryDefault mr-2 inline-block"></span>
        講師身分審核須知
      </p>
      <p>
        為確保平台上的課程品質，並維護學員的學習權益，我們需要對講師的身份進行審核。請務必填寫完整的基本資料，這將有助於我們確認您的講師資格，並確保課程內容的專業性與真實性
      </p>
      <br />
      <p>請依照以下步驟填寫您的基本資料。</p>
    </div>
    <div class="">
      <div class="mb-10 flex">
        <img
          src="/src/assets/images/avatar.png"
          alt="avatar"
          class="mr-5 h-16 w-16 rounded-full object-cover"
        />
        <div class="mt-auto">
          <p>圖片要求:</p>
          <p>大頭貼（正面清晰照，建議尺寸 500x500px）</p>
        </div>
      </div>
      <div class="grid w-full grid-cols-2 gap-4">
        <div>
          <p>真實姓名</p>
          <n-input type="text" placeholder="請輸入姓名" class="mt-1 bg-black focus:outline-none" />
        </div>
        <div>
          <p>暱稱</p>
          <n-input type="text" placeholder="請輸入暱稱" class="mt-1 bg-black focus:outline-none" />
        </div>
        <div>
          <p>電子郵件</p>
          <n-input
            type="text"
            placeholder="請輸入電子郵件"
            class="mt-1 bg-black focus:outline-none"
          />
        </div>
        <div>
          <p>電話號碼</p>
          <n-input
            type="text"
            placeholder="請輸入電話號碼"
            class="mt-1 bg-black focus:outline-none"
          />
        </div>
      </div>
    </div>
    <div class="">
      <n-config-provider><n-divider /></n-config-provider>
    </div>
    <div>
      <div class="border-primaryDefault/30% mb-5 border-b border-solid pb-10">
        <p>
          <span class="i-ion:bookmarks w-4.5 h-4.5 text-primaryDefault mr-2 inline-block"></span>
          為了確認您的講師身份，請提供以下身份證明文件。我們將確保您的個人資料安全，不會對外公開。
        </p>
        <br />
        <p>
          <span class="i-ion:bookmarks w-4.5 h-4.5 text-primaryDefault mr-2 inline-block"></span>
          「確保您的收益順利入帳！」
        </p>
        <p>
          如果您希望開設付費課程，請務必提供正確的收款資訊，以確保平台能順利將課程收益支付給您！
        </p>
      </div>

      <div class="mb-5">
        <div class="w-30% mb-5">
          <p>銀行名稱</p>
          <n-space vertical class="mt-1">
            <n-select v-model:value="value" :options="options" placeholder="請選擇類別" />
          </n-space>
        </div>

        <div class="mb-5">
          <p>銀行帳號</p>
          <n-input
            type="text"
            placeholder="請輸入銀行帳號"
            class="mt-1 bg-black focus:outline-none"
          />
        </div>

        <div class="mb-5">
          <typography variant="h5" font-type="title" class="mb-2 mt-5 text-white" no-underline>
            關於我
          </typography>
          <div class="mb-2 flex items-center justify-between">
            <p>slogan</p>
            <n-input
              type="text"
              placeholder="請輸入slogan"
              class="ml-2 mt-1 bg-black focus:outline-none"
            />
          </div>
          <n-input
            type="text"
            placeholder="請輸入自我介紹"
            class="mt-1 bg-black focus:outline-none"
          />
        </div>

        <div>
          <p>領域專長</p>
          <n-input
            type="text"
            placeholder="請輸入您擅長的領域或技術"
            class="mt-1 bg-black focus:outline-none"
          />
        </div>
      </div>
    </div>

    <div class="mb-15">
      <n-button class="mr-2">送出</n-button>
      <n-button type="warning">審核中</n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import typography from '@/components/layout/typography.vue';

const options = [
  { label: '玉山銀行', value: 'bank01' },
  { label: '中國信託', value: 'bank02' },
  { label: '國泰世華', value: 'bank03' },
  { label: '第一銀行', value: 'bank04' },
];
const value = ref(options[0].value);
</script>
<style scoped></style>
