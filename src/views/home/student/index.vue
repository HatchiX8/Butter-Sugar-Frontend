<template>
  <div class="personal-info flex items-center text-white">
    <h2>學生資料</h2>
    <n-button v-if="!isEdit" @click="isEdit = true">編輯</n-button>
  </div>
  <baseForm v-if="isEdit" class="personal-form" ref="formRef"
    :model="formData"
    :fields="fields"
    :rules="rules"
    submit-label="儲存"
    cancel-label="取消"
    :show-cancel="true"
    @submit="handleSubmit"
    @cancel="handleCancel"
  />
  <!-- Removed duplicate v-else block -->

  <div v-else class="personal-info space-y-2 text-white">
    <p>姓名：{{ formData.name }}</p>
    <p>
      頭像：
      <img
        :src="formData.profile_image_url"
        alt="avatar"
        class="h-16 w-16 rounded-full object-cover"
      />
    </p>
    <p>暱稱：{{ formData.nickname }}</p>
    <p>Email：{{ formData.email }}</p>
    <p>生日：{{ birthdayDisplay }}</p>
    <p>電話：{{ formData.phone || '未填' }}</p>
    <p>地址：{{ formData.address || '未填' }}</p>
  </div>
</template>

<script setup lang="ts">
import type { FormRules, FormItemRule } from 'naive-ui';
import { ref, onMounted, reactive, computed } from 'vue';
import axios from 'axios';
import { useUserStore } from '@/stores/models/index';
import baseForm from '@/components/layout/baseForm.vue';
import type { FormField } from '@/components/layout/baseForm.vue';

interface StudentData {
  name: string;
  birthday: number | null; // 使用 timestamp，n-date-picker 綁定必須用 timestamp
  nickname: string;
  email: string;
  phone: string;
  address: string;
  profile_image_url: string;
};

const userStore = useUserStore();
const isEdit = ref(false);
const formData = reactive<StudentData>({
  name: '',
  birthday: null,
  nickname: '',
  email: '',
  phone: '',
  address: '',
  profile_image_url: '',
});

const originalData = reactive({ ...formData });

// ✅ computed 格式化生日顯示
const birthdayDisplay = computed(() => {
  if (formData.birthday) {
    return new Date(formData.birthday).toLocaleDateString('sv-SE');
  }
  return '未填';
});

// 讀取學生資料
const fetchData = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users/info`, {
      headers: { Authorization: `Bearer ${userStore.userToken}` },
    });
    console.log('info', res);

    // 後端回的 data
    const user = res.data.data;
    formData.name = user.name || '';
    formData.nickname = user.nickname || '';
    formData.email = user.email;
    formData.birthday = user.birthday ? new Date(user.birthday).getTime() : null;
    formData.phone = user.phone || '';
    formData.address = user.address || '';
    formData.profile_image_url = user.profile_image_url || '';

    // 更新備份
    Object.assign(originalData, formData);
  } catch (err) {
    console.error('取得學生資料失敗', err);
  }
};

// 提交更新學生資料
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

// 驗證
const rules: FormRules = {
  birthday: {
    validator(_: FormItemRule, value: number) {
      if (!value) return new Error('請選擇生日');
      const today = new Date().setHours(0, 0, 0, 0);
      if (value > today) return new Error('生日不可設定未來日期');
      return true;
    },
    trigger: 'change',
  },
  phone: {
    validator(_: FormItemRule, value: string) {
      if (!value) return new Error('請輸入電話');
      if (!/^09\d{8}$/.test(value)) return new Error('電話格式錯誤，需以09開頭，共10碼');
      return true;
    },
    trigger: ['input', 'blur'],
  },
};

const fields: FormField[] = [
  { label: '姓名', key: 'name', type: 'input', placeholder: '請輸入姓名' },
  { label: '生日', key: 'birthday', type: 'date', placeholder: '請輸入生日' },
  { label: '暱稱', key: 'nickname', type: 'input', placeholder: '請輸入暱稱' },
  { label: '電子郵件', key: 'email', type: 'input', disabled: true },
  { label: '電話號碼', key: 'phone', type: 'input', placeholder: '請輸入電話號碼' },
  { label: '地址', key: 'address', type: 'input', placeholder: '請輸入地址' },
];

const formRef = ref();
</script>
<style>
.personal-info,
.personal-form {
  width: 80%;
  max-width: 800px;
  margin: 80px auto;
}
.personal-info p {
  margin-bottom: 10px;
}
</style>
