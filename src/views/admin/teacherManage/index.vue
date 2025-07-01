<template>
  <div class="px-5 text-white mb-15">
    <div class="flex justify-between">
      <typography variant="h4" font-type="title" class="text-white -mt-10 mb-5">
        教師申請審核
      </typography>
    </div>
    <n-divider />
    <div class="w-full">
      <n-data-table :columns="columns" :data="data" :pagination :bordered="false"/>
    </div>
  </div>

</template>

<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui';
import { NButton, useMessage } from 'naive-ui';
import { h } from 'vue';
import { ref, onMounted } from 'vue';
import typography from '@/components/layout/typography.vue';

interface TeacherApplication {
  id: string;
  userId: string;
  userName: string;
  email: string;
  applyTime: string;
  status: 'pending' | 'approved' | 'rejected';
  description: string;
  no: number;
}

const message = useMessage();
const data = ref<TeacherApplication[]>([]);
const loading = ref(false);

// 審核教師申請
const reviewApplication = async (id: string, approve: boolean) => {
  try {
    // 更新本地狀態
    const index = data.value.findIndex(item => item.id === id);
    if (index !== -1) {
      // 模擬 API 調用
      await new Promise(resolve => setTimeout(resolve, 500));

      // 更新狀態
      data.value[index].status = approve ? 'approved' : 'rejected';

      message.success(`已${approve ? '通過' : '拒絕'}申請`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '操作失敗';
    message.error(`操作失敗: ${errorMessage}`);
  }
};

const createColumns = (): DataTableColumns<TeacherApplication> => [
  {
    title: 'No',
    key: 'no',
    width: 80,
  },
  {
    title: '申請人',
    key: 'userName',
  },
  {
    title: '電子郵件',
    key: 'email',
  },
  {
    title: '申請時間',
    key: 'applyTime',
    render: (row) => row.applyTime ? new Date(row.applyTime).toLocaleString() : '-',
  },
  {
    title: '申請說明',
    key: 'description',
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '狀態',
    key: 'status',
    render: (row) => {
      const statusMap = {
        'pending': { text: '待審核', type: 'warning' },
        'approved': { text: '已通過', type: 'success' },
        'rejected': { text: '已拒絕', type: 'error' },
      };
      const status = statusMap[row.status] || { text: '未知', type: 'default' };
      return h(
        'n-tag',
        { type: status.type, size: 'small' },
        { default: () => status.text }
      );
    },
  },
  {
    title: '操作',
    key: 'actions',
    width: 200,
    render(row) {
      if (row.status !== 'pending') return '無可用操作';

      return h(
        'div',
        { class: 'flex gap-2' },
        [
          h(
            NButton,
            {
              size: 'small',
              type: 'success',
              onClick: () => reviewApplication(row.id, true),
              class: 'min-w-16',
            },
            { default: () => '通過' }
          ),
          h(
            NButton,
            {
              size: 'small',
              type: 'error',
              onClick: () => reviewApplication(row.id, false),
              class: 'min-w-16',
            },
            { default: () => '拒絕' }
          ),
        ]
      );
    },
  },
];

const columns = ref(createColumns());
interface PaginationConfig {
  page: number;
  pageSize: number;
  showSizePicker: boolean;
  pageSizes: number[];
  itemCount: number;
  onChange: (page: number) => void;
  onUpdatePageSize: (pageSize: number) => void;
}

const pagination = ref<PaginationConfig>({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 20, 50],
  itemCount: 0,
  onChange: (page: number) => {
    pagination.value.page = page;
    fetchApplications();
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.value.pageSize = pageSize;
    pagination.value.page = 1;
    fetchApplications();
  },
});

// 初始化加載數據
onMounted(() => {
  fetchApplications();
});

// 模擬獲取教師申請數據
const fetchApplications = async () => {
  loading.value = true;
  try {
    // TODO: 替換為實際的 API 調用
    // const response = await getTeacherApplications({
    //   page: pagination.value.page,
    //   pageSize: pagination.value.pageSize,
    // });

    // 模擬數據 - 實際使用時請刪除
    const mockData: TeacherApplication[] = [
      {
        id: '1',
        userId: 'user1',
        userName: '張三',
        email: 'teacher1@example.com',
        applyTime: new Date().toISOString(),
        status: 'pending',
        description: '我有豐富的教學經驗，希望能加入貴平台',
        no: 1,
      },
      {
        id: '2',
        userId: 'user2',
        userName: '李四',
        email: 'teacher2@example.com',
        applyTime: new Date(Date.now() - 86400000).toISOString(),
        status: 'pending',
        description: '專長是程式設計與數學',
        no: 2,
      },
    ];

    data.value = mockData;
    // 實際使用時使用以下代碼
    // data.value = response.data.map((item, index) => ({
    //   ...item,
    //   no: (pagination.value.page - 1) * pagination.value.pageSize + index + 1,
    // }));
    // pagination.value.itemCount = response.total;

    // 更新分頁總數
    pagination.value.itemCount = mockData.length;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '未知錯誤';
    message.error(`獲取申請列表失敗: ${errorMessage}`);
  } finally {
    loading.value = false;
  }
};

</script>
<style scoped>
:deep(.n-data-table) {
  width: 100% !important;
  min-width: 0 !important;
}
:deep(.n-data-table th, .n-data-table td) {
  min-width: 0 !important;
  white-space: normal;
  word-break: break-all;
}
:deep(.n-data-table-wrapper) {
  width: 100% !important; /* 確保 wrapper 也填滿 */
}
</style>
