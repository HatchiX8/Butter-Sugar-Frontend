<template>
  <div class="flex items-center text-white personal-info">
    <h2>學生資料</h2>
    <n-button v-if="!isEdit" @click="isEdit = true">編輯</n-button>
  </div>

  <n-form v-if="isEdit" :model="formData" class="personal-form">
      <n-form-item label="姓名">
        <n-input v-model:value="formData.name" />
      </n-form-item>
      <n-form-item label="生日">
        <n-date-picker
          v-model:value="formData.birthday"
          type="date"
          placeholder="選擇生日"
        />
      </n-form-item>
      <n-form-item label="暱稱">
        <n-input v-model:value="formData.nickname" />
      </n-form-item>
      <n-form-item label="Email">
        <n-input v-model:value="formData.email" disabled />
      </n-form-item>
      <n-form-item label="電話">
        <n-input v-model:value="formData.phone" />
      </n-form-item>
      <n-form-item label="地址">
        <n-input v-model:value="formData.address" />
      </n-form-item>

      <n-space>
        <n-button type="primary" @click="handleSubmit">儲存</n-button>
        <n-button @click="handleCancel">取消</n-button>
      </n-space>
    </n-form>

    <div v-else class="space-y-2 text-white personal-info">
      <p>姓名：{{ formData.name }}</p>
      <p>頭像：{{ formData.profile_image_url }}</p>
      <p>暱稱：{{ formData.nickname }}</p>
      <p>Email：{{ formData.email }}</p>
      <p>生日：{{ formData.birthday || '未填' }}</p>
      <p>電話：{{ formData.phone || '未填' }}</p>
      <p>地址：{{ formData.address || '未填' }}</p>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios'
import { useUserStore } from '@/stores/models/user/userStore'
import { NButton, NForm, NFormItem, NInput, NSpace, NDatePicker, datePickerProps  } from 'naive-ui'
import type { ExtractPropTypes } from 'vue'
type DatePickerProps = ExtractPropTypes<typeof datePickerProps>
// 接著「挖出」裡面 value 的那個屬性，這就是 v-model:value 要的型別
type DatePickerValue = DatePickerProps['value']
interface StudentData {
  name: string
  birthday: DatePickerValue | null
  nickname: string
  email: string
  phone: string
  address: string
  profile_image_url: string
}

const userStore = useUserStore();
const isEdit = ref(false);
const formData = ref<StudentData>({
  name: '',
  birthday: null,
  nickname: '',
  email: '',
  phone: '',
  address: '',
  profile_image_url: '',
});

const originalData = ref({ ...formData.value });

// 讀取學生資料
const fetchData = async () => {
  try {
    const res = await axios.get(
      `/api/v1/users/${userStore.userId}`,
      {
        headers: { Authorization: `Bearer ${userStore.token}` }
      }
    )
    // 後端回的 data
    const data = res.data
    formData.value = {
      name: data.name || '',
      nickname: data.nickname || '',
      email: data.email,
      birthday: data.birthday || '',
      phone: data.phone || '',
      address: data.address || '',
      profile_image_url: data.profile_image_url || '',
    }
    
    originalData.value = { ...formData.value }
  } catch (err) {
    console.error('取得學生資料失敗', err)
  }
}

// 提交更新學生資料
const handleSubmit = async () => {
  try {
    const res = await axios.put(
      `/api/v1/users/${userStore.userId}`,
      formData.value,
      {
        headers: { Authorization: `Bearer ${userStore.token}` }
      }
    )
    console.log('更新成功', res.data)
    isEdit.value = false
    originalData.value = { ...formData.value }
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error('更新失敗', err.response?.status, err.response?.data)
    } else {
      console.error('更新失敗', err)
    }
  }
}

// 取消編輯
const handleCancel = () => {
  isEdit.value = false
  formData.value = { ...originalData.value }
}

// onMounted 時先拿一次後端資料
onMounted(() => {
  fetchData();
});
</script>
<style>
.personal-info,.personal-form{
  width: 80%;
  max-width: 800px;
  margin: 0 auto;
}
.personal-info p{
  margin-bottom: 10px;
}
.n-form-item .n-form-item-label{
  color: white;
}
</style>