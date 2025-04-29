<template>
  <div class="flex items-center">
    <h2>學生資料</h2>
    <n-button v-if="!isEdit" @click="isEdit = true">編輯</n-button>
  </div>

  <n-form v-if="isEdit" :model="formData">
    <n-form-item label="姓名">
      <n-input v-model:value="formData.name" />
    </n-form-item>
    <n-form-item label="生日">
      <n-input v-model:value="formData.birthday" />
    </n-form-item>

    <n-space>
      <n-button type="primary" @click="handleSubmit">儲存</n-button>
      <n-button @click="handleCancel">取消</n-button>
    </n-space>
  </n-form>

  <div v-else>
    <p>姓名：{{ formData.name }}</p>
    <p>生日：{{ formData.birthday }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// import { getStudentById, updateStudent } from '@/api/student';

const isEdit = ref(false);
const formData = ref({
  name: '',
  birthday: '',
});

const originalData = ref({ ...formData.value });

// 初始化載入資料
const fetchData = async () => {
  console.log('測試1');
};

const handleSubmit = async () => {
  console.log('測試2');
  isEdit.value = false;
  originalData.value = { ...formData.value };
};

const handleCancel = () => {
  isEdit.value = false;
  formData.value = { ...originalData.value };
};

onMounted(() => {
  fetchData();
});
</script>
