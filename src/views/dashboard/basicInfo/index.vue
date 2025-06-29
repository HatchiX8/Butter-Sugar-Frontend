<template>
  <n-form
    ref="formRef"
    :model="editableProfile"
    :rules="rules"
    label-placement="top"
    class="line-height-normal px-5 text-white">
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
    <div>
      <div class="mb-10 flex">
        <img v-if="avatarUrl"
          :src="avatarUrl"
          alt="avatar"
          class="mr-5 h-16 w-16 rounded-full object-cover"
        />
        <div class="mt-auto">
          <p>圖片要求:</p>
          <p>大頭貼（正面清晰照，建議尺寸 500x500px）</p>
            <n-upload
              ref="avatarUploadRef"
              accept="image/*"
              list-type="image-card"
              :max="1"
              :show-file-list="false"
              :show-trigger="false"
              :custom-request="customAvatarUpload"
            >
            </n-upload>
            <baseButton @click="triggerAvatarUpload" label="上傳頭像" icon="i-ion:cloud-upload-outline" iconPosition="right" class="m-4" />
        </div>
      </div>
      <div class="grid w-full grid-cols-2 gap-4">
        <div>
          <n-form-item label="真實姓名" path="name">
            <n-input type="text" v-model:value="editableProfile.name" placeholder="請輸入姓名" />
          </n-form-item>
        </div>
        <div>
          <n-form-item label="暱稱" path="nickname">
            <n-input v-model:value="editableProfile.nickname" placeholder="請輸入暱稱" />
          </n-form-item>
        </div>
        <div>
          <n-form-item label="電子郵件" path="email">
            <n-input v-model:value="email" :disabled="true" placeholder="請輸入電子郵件" />
          </n-form-item>
        </div>
        <div>
          <n-form-item label="電話號碼" path="phone">
            <n-input v-model:value="editableProfile.phone" placeholder="請輸入電話號碼" />
          </n-form-item>
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
          <n-form-item label="銀行名稱" path="bank_name">
            <n-select v-model:value="editableProfile.bank_name" :options="options" placeholder="請選擇銀行名稱" />
          </n-form-item>
        </div>

        <div class="mb-5">
          <n-form-item label="銀行帳號" path="bank_account">
            <n-input v-model:value="editableProfile.bank_account" placeholder="請輸入銀行帳號" />
          </n-form-item>
        </div>

        <div class="mb-5">
          <typography variant="h5" font-type="title" class="mb-2 mt-5 text-white" no-underline>
            關於我
          </typography>
          <div class="mb-2 flex items-center">
            <p class="mr-2">slogan</p>
            <n-form-item label="" path="slogan" class="w-full">
              <n-input v-model:value="editableProfile.slogan" placeholder="請輸入 slogan" />
            </n-form-item>
          </div>
          <n-form-item label="" path="description">
            <n-input
              type="textarea"
              v-model:value="editableProfile.description"
              placeholder="請輸入自我介紹"
            />
          </n-form-item>
        </div>

        <div>
          <n-form-item label="領域專長" path="specialization">
            <n-input
              type="textarea"
              v-model:value="editableProfile.specialization"
              placeholder="請輸入您擅長的領域"
            />
          </n-form-item>
        </div>
      </div>
    </div>

    <div class="mb-15">
      <n-button v-if="userStore.role === 'teacher'" class="mr-2" type="primary" @click="handleSaveProfile">儲存</n-button>
      <n-button v-else-if="userStore.role === 'student'" class="mr-2" type="primary"
        >送出審核</n-button
      >
      <n-button v-else-if="userStore.role === 'student2'" type="warning">審核中</n-button>
    </div>
  </n-form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import typography from '@/components/layout/typography.vue';
import { useUserStore } from '@/stores/models/index';
import { useInstructorStore } from '@/stores/models/instructor/store';
import type { TeacherProfile } from '@/api/instructor/types';
import { useMessage } from 'naive-ui';
import type { FormRules } from 'naive-ui';
import baseButton from '@/components/layout/baseButton.vue';

const message = useMessage();
const instructorStore = useInstructorStore();
// ----------取得身分----------
const userStore = useUserStore();

// ---------------------------

const email = ref<string>('');
const selectedFile = ref<File | string | null>(null);
const editableProfile = ref<TeacherProfile>({
  name: '',
  nickname: '',
  phone: '',
  birthday: '',
  address: '',
  profile_image_url: '',
  bank_name: '',
  bank_account: '',
  slogan: '',
  description: '',
  specialization: '',
});

// 驗證規則
const rules: FormRules = {
  name: [{ required: true, message: '姓名為必填', trigger: 'blur' }],
  nickname: [{ required: true, message: '暱稱為必填', trigger: 'blur' }],
  phone: [{ required: true, message: '電話號碼為必填', trigger: 'blur' }],
  bank_name: [{ required: true, message: '請選擇銀行名稱', trigger: 'change' }],
  bank_account: [{ required: true, message: '銀行帳號為必填', trigger: 'blur' }],
  slogan: [{ required: true, message: 'slogan 為必填', trigger: 'blur' }],
  description: [{ required: true, message: '自我介紹為必填', trigger: 'blur' }],
  specialization: [{ required: true, message: '領域專長為必填', trigger: 'blur' }],
};

const options = [
  { label: '004 台灣銀行', value: '004 台灣銀行' },
  { label: '008 華南銀行', value: '008 華南銀行' },
  { label: '012 台北富邦銀行', value: '012 台北富邦銀行' },
  { label: '700 中華郵政', value: '700 中華郵政' },
  { label: '822 中國信託', value: '822 中國信託' },
];

// 預覽圖片用
const avatarUploadRef = ref();
const avatarUrl = ref<string>(''); // 預覽圖片 URL
const isAvatarUploaded = ref<boolean>(false);  // 是否已上傳成功

// 上傳成功後的回傳網址
let lastBlobUrl: string | null = null;
const customAvatarUpload = async ({
  file,
  onFinish,
  onError,
}: {
  file: { file: File } | null;
  onFinish: () => void;
  onError: (err: Error) => void;
}) => {
  try {
    if (file && file.file) {
      // 釋放之前的 blob URL
      if (lastBlobUrl) URL.revokeObjectURL(lastBlobUrl);

      // 有上傳新圖片，使用 blob URL
      const blobUrl = URL.createObjectURL(file.file);
      avatarUrl.value = blobUrl;
      lastBlobUrl = blobUrl; // 保存新 blob URL

      selectedFile.value = file.file; // 保存上傳的檔案
    } else {
      // 沒有上傳圖片，顯示舊資料 URL
      avatarUrl.value = editableProfile.value.profile_image_url || '';
    }
    isAvatarUploaded.value = true;
    onFinish(); // 通知 n-upload 完成
  } catch (err) {
    message.error('上傳頭像失敗');
    onError(err as Error); // 通知失敗
  }
};
// 上傳頭像按鈕
const triggerAvatarUpload = () => {
  if (!avatarUploadRef.value) {
    console.warn('找不到 n-upload 元件實例');
    return;
  }
  // 找到內部 input[type=file] 元素，呼叫 click()
  const input = avatarUploadRef.value.$el
    ? (avatarUploadRef.value.$el as HTMLElement).querySelector('input[type=file]')
    : avatarUploadRef.value.querySelector('input[type=file]');

  if (input) {
    input.click();
  } else {
    console.warn('找不到 input[type=file]');
  }
};

// 所有必填欄位的 key 與對應中文名稱
const requiredFields = {
  name: '真實姓名',
  nickname: '暱稱',
  phone: '電話號碼',
  bank_name: '銀行名稱',
  bank_account: '銀行帳號',
  slogan: 'slogan',
  description: '自我介紹',
  specialization: '領域專長',
};

// 送出教師資料
const handleSaveProfile = async () => {
  const missingFields: string[] = []

  // 檢查必填欄位是否為空
  for (const [key, label] of Object.entries(requiredFields)) {
    const value = editableProfile.value[key as keyof typeof editableProfile.value];
    if (!value || value.toString().trim() === '') {
      missingFields.push(label);
    }
  }

  // 如果有欄位為空，顯示錯誤訊息
  if (missingFields.length > 0) {
    message.error(`請填寫以下欄位：${missingFields.join('、')}`);
    return;
  }

  // 執行送出
  const formData = new FormData();

  for (const [key, value] of Object.entries(editableProfile.value)) {
    formData.append(key, value);
  }

  // 處理頭像檔案
  if (selectedFile.value && selectedFile.value instanceof File) {
    formData.append('file', selectedFile.value);
  }

  const res = await instructorStore.saveTeacherProfile(formData);
  if (res.success) {
    message.success(res.message);
    await instructorStore.fetchTeacherProfile(); // 重新獲取最新資料

    Object.assign(editableProfile.value, instructorStore.teacherProfile); // 更新 editableProfile 為最新資料
    selectedFile.value = null; // 清除上傳的檔案
    avatarUrl.value = editableProfile.value.profile_image_url || ''; // 清除頭像預覽 URL
    isAvatarUploaded.value = false; // 重置上傳狀態

    // 同步更新 userStore 的頭像
    userStore.setProfileImageUrl(editableProfile.value.profile_image_url || '');
    console.log('教師資料已成功儲存');
    console.log('最新教師資料:', editableProfile.value);
    console.log('最新頭像 URL:', avatarUrl.value);
    console.log('最新Header使用者頭像 URL:', userStore.profileImageUrl);
  } else {
    message.error(res.message);
  }
};

onMounted(async () => {
  if (!userStore.email) {
    await userStore.fetchUser();
    email.value = userStore.email ?? '';
  }

  // 初始化時從 store 獲取講師資料
  await instructorStore.fetchTeacherProfile();

  // 用 Object.assign 把 store 資料複製進 ref 中
  Object.assign(editableProfile.value, instructorStore.teacherProfile);

  // 如果 bank_name 是空的，就預設第一筆銀行名稱
  if (!editableProfile.value.bank_name) {
    editableProfile.value.bank_name = options[0].value;
  }

  // 頭像圖片預覽
  avatarUrl.value = editableProfile.value.profile_image_url || '';
});
</script>
<style scoped></style>
