<template>
  <n-form
    ref="formRef"
    :model="formModel"
    :rules="rules"
    label-placement="top"
    class="line-height-normal px-5 text-white"
  >
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
        <img
          v-if="avatarUrl"
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
          <baseButton
            @click="triggerAvatarUpload"
            label="上傳頭像"
            icon="i-ion:cloud-upload-outline"
            iconPosition="right"
            class="m-4"
          />
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
        <div>
          <n-form-item label="生日" path="birthday">
            <n-date-picker
              v-model:value="editableProfile.birthday"
              type="date"
              placeholder="請選擇生日"
              clearable
              @update:value="validateBirthday"
            />
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
            <n-select
              v-model:value="editableProfile.bank_name"
              :options="options"
              placeholder="請選擇銀行名稱"
            />
          </n-form-item>
        </div>

        <div class="mb-5">
          <n-form-item label="銀行帳號" path="bank_account">
            <n-input v-model:value="editableProfile.bank_account" placeholder="請輸入銀行帳號" />
          </n-form-item>
        </div>

        <div class="mb-5">
          <p>
            <span class="i-ion:bookmarks w-4.5 h-4.5 text-primaryDefault mr-2 inline-block"></span>
            為了確認您的講師身份，請提供以下身份證明文件。我們將確保您的個人資料安全，不會對外公開。
          </p>
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

    <span v-if="userStore.role === 'student'">
      <div class="">
        <n-config-provider><n-divider /></n-config-provider>
      </div>

      <div class="mb-5">
        <p>
          <span class="i-ion:bookmarks w-4.5 h-4.5 text-primaryDefault mr-2 inline-block"></span>
          為了讓開課旅程更加順暢，請回溯開課初衷與驅動力，並梳理「教學力」、「專業性」與「影響力」。
        </p>
        <div class="mb-2 flex items-center">
          <n-form-item label="" path="course_name" class="w-full">
            <n-input
              v-model:value="editableApplication.course_name"
              placeholder="欲開課之課程名稱"
              :disabled="status === 'pending'"
            />
          </n-form-item>
        </div>
        <n-form-item label="" path="course_description">
          <n-input
            type="textarea"
            v-model:value="editableApplication.course_description"
            placeholder="請輸入為什麼想申請成為講師的說明"
            :disabled="status === 'pending'"
          />
        </n-form-item>
      </div>
    </span>

    <div class="mb-15">
      <n-button
        v-if="userStore.role === 'teacher'"
        class="mr-2"
        type="primary"
        @click="handleSaveProfile"
        >儲存</n-button
      >
      <n-button
        v-else-if="userStore.role === 'student'"
        class="mr-2"
        type="primary"
        @click="handleSaveProfile"
        >送出審核</n-button
      >

      <n-button
        v-else-if="userStore.role === 'student' || status === 'pending'"
        type="warning"
        @click="handleSaveProfile"
        >審核中，僅修改基本資料</n-button
      >
    </div>
  </n-form>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import type { FormInst } from 'naive-ui';
import typography from '@/components/layout/typography.vue';
import { useUserStore } from '@/stores/models/index';
import { useInstructorStore } from '@/stores/models/instructor/store';
import type { TeacherProfile } from '@/api/instructor/types';
import type { Application } from '@/api/application/type';
import { useApplicationStore } from '@/stores/models/application/store';
import { useMessage } from 'naive-ui';
import type { FormRules } from 'naive-ui';
import baseButton from '@/components/layout/baseButton.vue';

const userStore = useUserStore();
const instructorStore = useInstructorStore();
const applicationStore = useApplicationStore();
const message = useMessage();

// 表單引用
const formRef = ref<FormInst | null>(null);

// 手動驗證生日欄位
const validateBirthday = () => {
  if (formRef.value) {
    // 使用正確的 validate 方法
    formRef.value.validate();
  }
};

const email = ref<string>('');
const selectedFile = ref<File | string | null>(null);
const status = ref<string>('');

// 保持原有的資料結構分離
const editableProfile = ref<TeacherProfile>({
  name: '',
  nickname: '',
  phone: '',
  birthday: null, // 使用 null 以相容 n-date-picker
  address: '',
  profile_image_url: '',
  bank_name: '',
  bank_account: '',
  slogan: '',
  description: '',
  specialization: '',
});

const editableApplication = ref<Application>({
  course_name: '',
  course_description: '',
});

// 建立複合模型供表單使用
const formModel = computed(() => ({
  ...editableProfile.value,
  ...editableApplication.value,
}));

// 驗證規則
const rules: FormRules = {
  name: [{ required: true, message: '姓名為必填', trigger: 'blur' }],
  nickname: [{ required: true, message: '暱稱為必填', trigger: 'blur' }],
  phone: [{ required: true, message: '電話號碼為必填', trigger: 'blur' }],
  birthday: [
    {
      required: true,
      message: '生日為必填',
      trigger: ['change', 'blur', 'input'],
      validator: (rule, value) => value !== null && value !== undefined && value !== '',
    },
  ],
  bank_name: [{ required: true, message: '請選擇銀行名稱', trigger: 'change' }],
  bank_account: [{ required: true, message: '銀行帳號為必填', trigger: 'blur' }],
  slogan: [{ required: true, message: 'slogan 為必填', trigger: 'blur' }],
  description: [{ required: true, message: '自我介紹為必填', trigger: 'blur' }],
  specialization: [{ required: true, message: '領域專長為必填', trigger: 'blur' }],
  course_name: [{ required: true, message: '課程名稱為必填', trigger: 'blur' }],
  course_description: [{ required: true, message: '課程描述為必填', trigger: 'blur' }],
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
const avatarUrl = ref<string>('');
const isAvatarUploaded = ref<boolean>(false);

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
      if (lastBlobUrl) URL.revokeObjectURL(lastBlobUrl);

      const blobUrl = URL.createObjectURL(file.file);
      avatarUrl.value = blobUrl;
      lastBlobUrl = blobUrl;

      selectedFile.value = file.file;
    } else {
      avatarUrl.value = editableProfile.value.profile_image_url || '';
    }
    isAvatarUploaded.value = true;
    onFinish();
  } catch (error) {
    message.error('上傳頭像失敗');
    onError(error as Error);
  }
};

const triggerAvatarUpload = () => {
  if (!avatarUploadRef.value) {
    message.warning('找不到上傳元件');
    return;
  }

  const input = avatarUploadRef.value.$el
    ? (avatarUploadRef.value.$el as HTMLElement).querySelector('input[type=file]')
    : avatarUploadRef.value.querySelector('input[type=file]');

  if (input) {
    input.click();
  } else {
    message.warning('找不到上傳元件');
  }
};

// 送出教師資料
const handleSaveProfile = async () => {
  const missingFields: string[] = [];

  // 檢查基本必填欄位
  const basicRequiredFields = {
    name: '真實姓名',
    nickname: '暱稱',
    phone: '電話號碼',
    birthday: '生日',
    bank_name: '銀行名稱',
    bank_account: '銀行帳號',
    slogan: 'slogan',
    description: '自我介紹',
    specialization: '領域專長',
  };

  for (const [key, label] of Object.entries(basicRequiredFields)) {
    const value = editableProfile.value[key as keyof typeof editableProfile.value];
    if (!value || value.toString().trim() === '') {
      missingFields.push(label);
    }
  }

  // 只有當角色是 student 時，才檢查課程相關欄位
  if (userStore.role === 'student') {
    const studentRequiredFields = {
      course_name: '課程名稱',
      course_description: '課程描述',
    };

    for (const [key, label] of Object.entries(studentRequiredFields)) {
      const value = editableApplication.value[key as keyof typeof editableApplication.value];
      if (!value || value.toString().trim() === '') {
        missingFields.push(label);
      }
    }
  }

  // 如果有欄位為空，顯示錯誤訊息
  if (missingFields.length > 0) {
    message.error(`請填寫以下欄位：${missingFields.join('、')}`);
    return;
  }

  // 執行送出
  const formData = new FormData();

  // 先處理生日欄位，將時間戳轉換為 DATE 格式
  let formattedBirthday: string | null = null;
  if (editableProfile.value.birthday !== null && editableProfile.value.birthday !== undefined) {
    const date = new Date(editableProfile.value.birthday);
    // 確保格式為 yyyy-MM-dd，並補零
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    formattedBirthday = `${year}-${month}-${day}`;
  }

  // 將其他欄位添加到 FormData
  for (const [key, value] of Object.entries(editableProfile.value)) {
    // 跳過生日欄位，因為我們會在下面特別處理
    if (key === 'birthday') continue;
    // 確保只有非空值才添加到 FormData
    if (value !== null && value !== undefined) {
      formData.append(key, String(value));
    }
  }

  // 特別處理生日欄位，確保傳送 DATE 格式的字串
  if (formattedBirthday) {
    formData.append('birthday', formattedBirthday);
  }

  // 處理頭像檔案
  if (selectedFile.value && selectedFile.value instanceof File) {
    formData.append('file', selectedFile.value);
  }

  // 根據角色執行不同操作
  if (userStore.role === 'student' && status.value !== 'pending') {
    // 學生角色：提交審核申請
    const applicationRes = await applicationStore.postApplication(
      editableApplication.value.course_name,
      editableApplication.value.course_description || '' // API 需要 description 參數，但我們的資料結構用 course_description
    );

    if (applicationRes.status) {
      message.success('審核申請已成功提交');

      // 延遲 1.5 秒後重新整理頁面，讓使用者看到成功訊息
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1500);

      return; // 提早返回，避免執行後續的教師資料更新
    } else {
      message.error(applicationRes.message || '審核申請提交失敗');
      return;
    }
  }

  // 生日欄位已在上面處理完成

  // 無論是哪種角色，都更新基本資料
  const res = await instructorStore.saveTeacherProfile(formData);
  if (res.success) {
    message.success(res.message);
    await instructorStore.fetchTeacherProfile();

    Object.assign(editableProfile.value, instructorStore.teacherProfile);
    selectedFile.value = null;
    avatarUrl.value = editableProfile.value.profile_image_url || '';
    isAvatarUploaded.value = false;

    userStore.setProfileImageUrl(editableProfile.value.profile_image_url || '');
    // 教師資料已成功儲存
  } else {
    message.error(res.message);
  }
};

onMounted(async () => {
  if (!userStore.email) {
    await userStore.fetchUser();
    email.value = userStore.email ?? '';
  }

  await instructorStore.fetchTeacherProfile();
  Object.assign(editableProfile.value, instructorStore.teacherProfile);

  if (!editableProfile.value.bank_name) {
    editableProfile.value.bank_name = options[0].value;
  }

  avatarUrl.value = editableProfile.value.profile_image_url || '';

  // 如果是學生角色，獲取教師申請資料
  if (userStore.role === 'student') {
    const res = await applicationStore.getTeacherApplications();
    // console.log('獲取教師申請資料回應:', res.data);

    // 檢查返回的數據結構
    if (res.status && res.data) {
      // 如果是數組，取第一個元素
      if (Array.isArray(res.data) && res.data.length > 0) {
        const application = res.data[0];
        editableApplication.value.course_name = application.course_name;
        editableApplication.value.course_description = application.description;
        status.value = application.status || '';
      }
      // 如果不是數組，直接使用
      else {
        // 將res.data轉換為单個申請對象類型
        const applicationData = res.data as unknown as Application;
        editableApplication.value.course_name = applicationData.course_name;
        editableApplication.value.course_description = applicationData.description;
        status.value = applicationData.status || '';
      }
    }
  }
});
</script>
