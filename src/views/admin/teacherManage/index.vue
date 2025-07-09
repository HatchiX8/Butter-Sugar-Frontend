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
import { useApplicationStore } from '@/stores/models/application/store';

interface TeacherApplication {
  no: number;
  uuid: string;
  userUUId: string;
  userName: string;
  course_name: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

const message = useMessage();
const applicationStore = useApplicationStore();
const data = ref<TeacherApplication[]>([]);
const loading = ref(false);
// FIXME: 開發模式Flag，控制退回審核狀態按鈕的顯示
// const devMode = ref(true);
const devMode = ref(false);

// 審核教師申請
const reviewApplication = async (id: string, approve: boolean) => {
  try {
    loading.value = true;
    // 調用 API 審核申請
    const status = approve ? 'approved' : 'rejected';
    const res = await applicationStore.reviewTeacherApplication(id, status);

    if (res.status) {
      // API 調用成功，更新本地狀態
      const index = data.value.findIndex(item => item.uuid === id);
      if (index !== -1) {
        data.value[index].status = status;
      }
      message.success(`已${approve ? '通過' : '拒絕'}申請`);
    } else {
      message.error(res.message || `審核申請失敗`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '操作失敗';
    message.error(`操作失敗: ${errorMessage}`);
  } finally {
    loading.value = false;
  }
};

// 退回審核狀態
const returnToPending = async (id: string) => {
  try {
    loading.value = true;
    // 調用新增的 returnToPendingStatus API 將狀態改為 pending
    const res = await applicationStore.returnToPendingStatus(id);

    if (res.status) {
      // API 調用成功，更新本地狀態
      const index = data.value.findIndex(item => item.uuid === id);
      if (index !== -1) {
        data.value[index].status = 'pending';
      }
      message.success('已退回審核狀態');
    } else {
      message.error(res.message || '退回審核狀態失敗');
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '操作失敗';
    message.error(`操作失敗: ${errorMessage}`);
  } finally {
    loading.value = false;
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
    title: '課程名稱',
    key: 'course_name',
  },
  {
    title: '申請說明',
    key: 'description',
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '申請時間',
    key: 'createdAt',
    render: (row) => row.createdAt ? new Date(row.createdAt).toLocaleString() : '-',
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
      if (row.status !== 'pending') {
        // 如果不是開發模式，顯示「已審核完畢」文字
        if (!devMode.value) {
          return '已審核完畢';
        }
        // 如果是開發模式，顯示退回審核狀態按鈕
        return h(
          NButton,
          {
            size: 'small',
            type: 'warning',
            onClick: () => returnToPending(row.uuid),
            class: 'min-w-24',
          },
          { default: () => '退回審核狀態' }
        );
      }

      return h(
        'div',
        { class: 'flex gap-2' },
        [
          h(
            NButton,
            {
              size: 'small',
              type: 'success',
              onClick: () => reviewApplication(row.uuid, true),
              class: 'min-w-16',
            },
            { default: () => '通過' }
          ),
          h(
            NButton,
            {
              size: 'small',
              type: 'error',
              onClick: () => reviewApplication(row.uuid, false),
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

// 獲取教師申請數據
const fetchApplications = async () => {
  loading.value = true;
  try {
    // 使用 applicationStore 獲取教師申請數據
    const res = await applicationStore.getAdminTeacherApplications(
      pagination.value.page,
      pagination.value.pageSize
    );

    if (res.status && res.data) {
      // 將 API 返回的數據轉換為組件需要的格式
      const applications = applicationStore.adminTeacherApplications.map((item, index) => ({
        no: (pagination.value.page - 1) * pagination.value.pageSize + index + 1,
        uuid: item.id || '',
        userUUId: item.user_id || '',
        userName: item.user_name || '',
        course_name: item.course_name,
        description: item.description || '',
        status: item.status as 'pending' | 'approved' | 'rejected',
        createdAt: item.created_at || '',
        updatedAt: ''
      }));

      // 賦值給 data
      data.value = applications;
      pagination.value.itemCount = applicationStore.totalApplications;
    } else {
      message.error(res.message || '獲取教師申請列表失敗');
    }
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
