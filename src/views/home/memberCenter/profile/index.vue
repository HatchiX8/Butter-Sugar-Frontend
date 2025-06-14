<template>
  <div class="w-80% max-w-200 mx-auto mb-20">
    <breadcrumbComps
      class="mt-30"
      :items="[
        { label: '學生會員中心', to: '/home/memberCenter/profile' },
        { label: '學生資料管理' },
      ]"
    />
    <div class="flex items-center justify-between text-white">
      <typography variant="h2" font-type="title" underline class="mb-8">學生資料管理</typography>
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
import { ref, onMounted, reactive } from 'vue';
import axios from 'axios';
import { useUserStore } from '@/stores/models/index';
import baseButton from '@/components/layout/baseButton.vue';
import baseForm from '@/components/layout/baseForm.vue';
import breadcrumbComps from '@/components/layout/breadcrumbComps.vue';
import typography from '@/components/layout/typography.vue';
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

const fields: FormField[] = [
  { label: '', key: 'profile_image_url', type: 'image', span: 2 },
  { label: '真實姓名', key: 'name', type: 'input', placeholder: '請輸入姓名', span: 1 },
  { label: '暱稱', key: 'nickname', type: 'input', placeholder: '請輸入暱稱', span: 1 },
  { label: '電子郵件', key: 'email', type: 'input', disabled: true, span: 1 },
  { label: '電話號碼', key: 'phone', type: 'input', placeholder: '請輸入電話號碼', span: 1 },
  { label: '生日', key: 'birthday', type: 'date', placeholder: '請輸入生日', span: 2 },
  { label: '地址', key: 'address', type: 'input', placeholder: '請輸入地址', span: 2 },
];

const formRef = ref();
</script>

<style scoped>

</style>
