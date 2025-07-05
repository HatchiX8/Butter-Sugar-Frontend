<template>
  <div class="flex min-h-screen flex-1 flex-col" :style="{ backgroundImage: `url(${bgImgUrl})` }">
    <headerComps />
    <div
      class="mx-auto box-border flex w-full max-w-[1280px] flex-col items-start px-4 text-white md:flex-row"
    >
      <div class="mt-20 flex w-full flex-1">
        <!-- 左側選單 -->
        <div
          class="mobile-menu mt-10 w-full md:sticky md:max-h-[calc(100vh-6rem)] md:w-1/5 md:overflow-y-auto"
        >
          <typography variant="h3" font-type="title" class="mb-5 ml-5 text-white" no-underline>
            講師頁面
          </typography>
          <n-config-provider>
            <n-menu
              :root-indent="36"
              :indent="12"
              :options="menuOptions"
              :value="menuStore.activeKey"
              @update:value="handleMenuSelect"
            />
          </n-config-provider>
        </div>
        <!-- 右側內容 -->
        <div class="min-width-0 mobile-content mt-10 w-full flex-1 pt-10 md:w-4/5">
          <router-view />
        </div>
      </div>
    </div>
    <footerComps />
    <!-- 回到最上方按鈕 -->
    <scrollToTop/>
  </div>
</template>
<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { headerComps, footerComps, scrollToTop } from '@/components/index';
import typography from '@/components/layout/typography.vue';
import { useUserStore } from '@/stores/models/index';
import { useMenuStore } from '@/stores/models/dashboard/uiStore';

const bgImgUrl = new URL('@/assets/images/home/bg-grey-wrinkle.png', import.meta.url).href;

const menuStore = useMenuStore();
const router = useRouter();

interface MenuOption {
  label: string;
  key: string;
  roles?: string[]; // 加上這一行
}

const fullMenuOptions: MenuOption[] = [
  {
    label: '基本資訊',
    key: 'BasicInfo',
    roles: ['student', 'teacher', 'admin'],
  },
  {
    label: '課程資訊',
    key: 'CourseInfo',
    roles: ['admin', 'teacher'],
  },
  {
    label: '建立新課程',
    key: 'courseAction/courseManage',
    roles: ['admin', 'teacher'],
  },
];

const menuOptions = computed(() =>
  fullMenuOptions.filter((option) => option.roles?.includes(userStore.role))
  .map((option) => {
      if (option.key === 'courseAction/courseManage' && menuStore.isEditingCourse) {
        return {
          ...option,
          label: '編輯課程',
        };
      }
      return option;
  })
);

const handleMenuSelect = (key: string) => {
  menuStore.setActiveKey(key);

  if (key !== 'courseAction/courseManage') {
    menuStore.setEditingCourse(false);
  }

  router.push(`/Teacher/${key}`);
};

// ----------取得身分----------
const userStore = useUserStore();

onMounted(() => {
  console.log('確認權限', userStore.role);
});
// ---------------------------
</script>

<style scoped>
/* 確保 Flex 項目不因內容限制寬度 */
.min-width-0 {
  min-width: 0;
}

/* 手機版樣式：強制單欄並調整佈局 */
@media (max-width: 767px) {
  .mobile-menu {
    width: 100% !important;
    order: 1;
    margin-top: 20px !important;
    position: static !important;
    max-height: none !important;
  }
  .mobile-content {
    width: 100% !important;
    order: 2 !important;
  }
  /* 強制父容器為單欄 */
  .flex {
    flex-direction: column !important;
  }
  /* 調整手機版 typography 的 margin-top */
  .typography-title {
    margin-top: 10px !important; /* 將 margin-top 從預設的 20px (mt-5) 改為 10px */
  }
}

:deep(.n-menu .n-menu-item-content.n-menu-item-content--selected .n-menu-item-content-header) {
  color: #fff !important;
}
:deep(.n-menu .n-menu-item-content .n-menu-item-content-header) {
  color: rgba(255, 255, 255, 0.7) !important;
}
:deep(
  .n-menu
    .n-menu-item-content:not(
      .n-menu-item-content--disabled
    ).n-menu-item-content--selected:hover::before
) {
  background-color: rgba(214, 142, 57, 0.7) !important;
}
</style>
