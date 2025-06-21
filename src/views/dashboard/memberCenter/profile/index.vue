<template>
  <div class="w-80% max-w-200 mx-auto mb-20">
    <breadcrumbComps
      class="mt-30"
      :items="[
        { label: '教師會員中心', to: '/teacher/memberCenter/revenue' },
        { label: '教師資料管理', to: '/teacher/memberCenter/profile' },
      ]"
    />
    <div class="flex items-center justify-between">
      <typography variant="h2" font-type="title" underline class="my-8 text-white">老師資料管理</typography>
      <baseButton v-if="!isEdit"
        label="編輯資料"
        type="primary"
        @click="isEdit = true"
      />
    </div>
    <!-- 編輯模式 -->
    <baseForm v-if="isEdit" ref="formRef"
      :model="formData"
      :fields="fields"
      submit-label="儲存"
      cancel-label="取消"
      :show-cancel="true"
      @submit="handleSubmit"
      @cancel="handleCancel"
      :fieldProps="fieldProps"
    />
    <!-- 檢視模式 -->
    <baseForm v-else
      :model="formData"
      :fields="fields"
      read-only
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive} from 'vue';
import axios from 'axios';
import { useUserStore } from '@/stores/models/index';
import baseButton from '@/components/layout/baseButton.vue';
import baseForm from '@/components/layout/baseForm.vue';
import typography from '@/components/layout/typography.vue';
import breadcrumbComps from '@/components/layout/breadcrumbComps.vue';
import type { FormField } from '@/components/layout/baseForm.vue';

const fieldProps = {
  profile_image_url: {
    uploadButtonText: '上傳頭像',
    previewAlt: '頭像預覽',
    previewClass: 'mt-2 h-16 w-16 rounded-full object-cover',
  },
};

const options = [
  { label: '玉山銀行', value: 'bank01' },
  { label: '中國信託', value: 'bank02' },
  { label: '國泰世華', value: 'bank03' },
  { label: '第一銀行', value: 'bank04' },
];
const bankNameDefault = ref(options[0].value);

interface TeacherData {
  name: string;
  nickname: string;
  email: string;
  phone: string;
  birthday: number | null; // 使用 timestamp，n-date-picker 綁定必須用 timestamp
  address: string;
  bankName: string;
  bankAccount: string;
  slogan: string;
  aboutMe: string;
  specialty: string;
  profile_image_url: string;
};

const userStore = useUserStore();
const isEdit = ref(false);
const formData = reactive<TeacherData>({
  name: '',
  nickname: '',
  email: '',
  phone: '',
  birthday: null,
  address: '',
  bankName: '',
  bankAccount: '',
  slogan: '',
  aboutMe: '',
  specialty: '',
  profile_image_url: '',
});

const originalData = reactive({ ...formData });

// 讀取老師資料
const fetchData = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users/info`, {
      headers: { Authorization: `Bearer ${userStore.userToken}` },
    });

    // 後端回的 data
    const user = res.data.data;
    formData.name = user.name || '';
    formData.nickname = user.nickname || '';
    formData.email = user.email;
    formData.phone = user.phone || '';
    formData.birthday = user.birthday ? new Date(user.birthday).getTime() : null;
    formData.address = user.address || '';
    formData.bankName = user.bankName || bankNameDefault;
    formData.bankAccount = user.bankAccount || '';
    formData.slogan = user.slogan || '';
    formData.address = user.address || '';
    formData.aboutMe = user.aboutMe || '';
    formData.specialty = user.specialty || '';
    formData.profile_image_url = user.profile_image_url || '';

    // 更新備份
    Object.assign(originalData, formData);
  } catch (err) {
    console.error('取得老師資料失敗', err);
  }
};

// 提交更新老師資料
const handleSubmit = async () => {
  try {
    if (formData.birthday && formData.birthday > Date.now()) {
      alert('生日不能晚於今天');
      return;
    }

    const payload = {
      ...formData,
      birthday: formData.birthday
        ? new Date(formData.birthday).toLocaleDateString('sv-SE')
        : null,
    };
    const res = await axios.patch(`${import.meta.env.VITE_API_URL}/api/v1/users/update`, payload, {
      headers: { Authorization: `Bearer ${userStore.userToken}` },
    });
    console.log('更新成功', res.data);

    isEdit.value = false;
    // 將備份更新為最新
    Object.assign(originalData, formData);
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error('更新失敗', err.response?.status, err.response?.data);
    } else {
      console.error('更新失敗', err);
    }
  }
};

// 取消編輯
const handleCancel = () => {
  isEdit.value = false;
  // 把表單資料還原成備份
  Object.assign(formData, originalData);
};

// onMounted 時先拿一次後端資料
onMounted(() => {
  fetchData();
});

const fields: FormField[] = [
  { label: '', key: 'profile_image_url', type: 'image', span: 2 },
  { label: '真實姓名', key: 'name', type: 'input', placeholder: '請輸入姓名', span: 1  },
  { label: '暱稱/教學名稱', key: 'nickname', type: 'input', placeholder: '請輸入暱稱', span: 1  },
  { label: '電子郵件', key: 'email', type: 'input', disabled: true, span: 1  },
  { label: '電話號碼', key: 'phone', type: 'input', placeholder: '請輸入電話號碼', span: 1  },
  { label: '生日', key: 'birthday', type: 'date', placeholder: '請輸入生日', span: 2  },
  { label: '住址', key: 'address', type: 'input', placeholder: '請輸入住址', span: 2  },
  { label: '銀行名稱', key: 'bankName', type: 'select', placeholder: '請選擇銀行', options , span: 1 },
  { label: '銀行帳號', key: 'bankAccount', type: 'input', placeholder: '請輸入銀行帳號', span: 1  },
  { label: 'Slogan', key: 'slogan', type: 'input', placeholder: '請輸入Slogan', span: 2  },
  { label: '關於我', key: 'aboutMe', type: 'textarea', placeholder: '請輸入自我介紹', span: 2  },
  { label: '領域專長', key: 'specialty', type: 'textarea', placeholder: '請輸入領域專長', span: 2  },
];

const formRef = ref();
</script>

<style scoped>

</style>
