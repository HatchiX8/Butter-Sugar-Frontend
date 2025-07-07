<template>
  <div class="px-5 text-white mb-15">
    <div class="flex justify-between">
      <typography variant="h4" font-type="title" class="text-white -mt-10 mb-5">
        所有課程
      </typography>
      <p class="text-8"></p>
      <baseButton label="建立新課程" type="primary" @click="goToCourseManage"/>
    </div>
    <n-divider />
    <div class="w-full">
      <n-data-table :columns="columns" :data="data" :pagination :bordered="false"/>
    </div>
  </div>
  <offTheShelfModal
    v-if="itemToOff"
    v-model:modelValue="showOffTheShelfModal"
    :item="itemToOff"
  />
</template>

<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui';
import { NButton, useMessage } from 'naive-ui';
import { h } from 'vue';
import { ref, onMounted } from 'vue';
import typography from '@/components/layout/typography.vue';
import { useInstructorStore } from '@/stores/models/instructor/store';
import offTheShelfModal from '@/views/dashboard/courseAction/comps/offTheShelfModal.vue';
import type { TeacherCourse } from '@/api/instructor/types';
import { useRouter } from 'vue-router';
import { baseButton } from '@/components';
import { useMenuStore } from '@/stores/models/dashboard/uiStore';

const menuStore = useMenuStore();
const router = useRouter();
const instructorStore = useInstructorStore();

const itemToOff = ref<{ course_id: string; course_name: string } | null>(null);
const showOffTheShelfModal = ref(false);
const openOffTheShelfModal = (item: { course_id: string; course_name: string }) => {
  itemToOff.value = item
  showOffTheShelfModal.value = true
};

interface Song {
  no: number;
  course_name: string;
  course_status: string;
  course_id: string;
}

const goToCourseManage = (courseId?: string, currentStep: number = 1) => {
  menuStore.setActiveKey('courseAction/courseManage'); // 同步外層選單
  menuStore.setEditingCourse(!!courseId);

  if (courseId) router.push({ name: 'CourseManage', query: { id: courseId, step: currentStep } });
  else router.push({ name: 'CourseManage' });
};

const message = useMessage();

const edit = (row: Song) => {
  message.info(`編輯 ${row.course_name}`);
  goToCourseManage(row.course_id);
};

const editPrice = (row: Song) => {
  message.info(`編輯 ${row.course_name}`);
  goToCourseManage(row.course_id, 3);
};

const remove = (row: Song) => {
  if (row.course_status !== '上架') return message.error('已上架課程才可下架');
  message.info(`下架 ${row.course_name}`);
  openOffTheShelfModal({ course_id: row.course_id, course_name: row.course_name });
};

const createColumns = (): DataTableColumns<Song> => [
  {
    title: 'No',
    key: 'no',
  },
  {
    title: '課程名稱',
    key: 'course_name',
  },
  {
    title: '狀態',
    key: 'course_status',
  },
  {
    title: '編輯/下架',
    key: 'actions',
    render(row) {
      return h(
        'div',
        { style: 'display: flex; gap: 8px;' }, // 可以加點間距
        [
          h(
            NButton,
            {
              strong: true,
              tertiary: true,
              size: 'small',
              type: 'warning',
              onClick: () => edit(row),
            },
            { default: () => '編輯' }
          ),
          h(
            NButton,
            {
              strong: true,
              tertiary: true,
              size: 'small',
              type: 'error',
              onClick: () => remove(row),
            },
            { default: () => '下架' }
          ),
        ]
      );
    },
  },
  {
    title: '定價&提交審核',
    key: 'actions',
    render(row) {
      return h(
        NButton,
        {
          strong: true,
          tertiary: true,
          size: 'small',
          type: 'warning',
          onClick: () => editPrice(row),
        },
        { default: () => '編輯' }
      );
    },
  },
];

const data = ref<TeacherCourse[]>([]);
const columns = ref(createColumns());
const pagination = false;

onMounted(async () => {
  await instructorStore.fetchTeacherCourses();
  data.value = instructorStore.teacherCourses.map((item, index) => ({
    ...item,
    no: index + 1,
  }));
});
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
