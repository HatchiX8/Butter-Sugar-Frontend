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
            管理者頁面
          </typography>
          <n-config-provider>
            <n-menu
              :root-indent="36"
              :indent="12"
              :options="menuOptions"
              :value="activeKey"
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
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import headerComps from '@/components/layout/headerComps.vue';
import footerComps from '@/components/layout/footerComps.vue';
import typography from '@/components/layout/typography.vue';
import { useUserStore } from '@/stores/models/index';

const bgImgUrl = new URL('@/assets/images/home/bg-grey-wrinkle.png', import.meta.url).href;

const router = useRouter();
const activeKey = ref<string>('teacherManage');

// 監聽路由變化，更新 activeKey
watch(
  () => router.currentRoute.value.path,
  (path) => {
    // 使用不區分大小寫的比對，並移除路徑中的 /admin/ 前綴
    const match = path.match(/\/(?:admin|Admin)\/([^/]+)/i);
    if (match && match[1]) {
      activeKey.value = match[1];
    }
  },
  { immediate: true } // 立即執行一次以處理初始路由
);

interface MenuOption {
  label: string;
  key: string;
  roles?: string[]; // 加上這一行
}

const fullMenuOptions: MenuOption[] = [
  {
    label: '教師管理',
    key: 'teacherManage',
    roles: ['admin'],
  },
];

const menuOptions = computed(() =>
  fullMenuOptions.filter((option) => option.roles?.includes(userStore.role))
);

const handleMenuSelect = (key: string) => {
  activeKey.value = key;
  router.push(`/Admin/${key}`);
};

// ----------取得身分----------
const userStore = useUserStore();

onMounted(() => {
  console.log('確認權限', userStore.role);
  // 確保初始路由正確設置 activeKey
  const path = router.currentRoute.value.path;
  // 使用不區分大小寫的比對，並移除路徑中的 /admin/ 前綴
  const match = path.match(/\/(?:admin|Admin)\/([^/]+)/i);
  if (match && match[1]) {
    activeKey.value = match[1];
  }
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
