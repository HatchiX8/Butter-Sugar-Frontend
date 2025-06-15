<template>
  <div class="flex min-h-screen flex-col flex-1" :style="{ backgroundImage: `url(${bgImgUrl})` }">
    <headerComps />
    <div class="w-full max-w-[1280px] mx-auto px-4 flex flex-col md:flex-row items-start box-border text-white">
      <div class="flex flex-1 w-full mt-20">
        <!-- 左側選單 -->
        <div class="w-full md:w-1/5 md:sticky md:max-h-[calc(100vh-6rem)] md:overflow-y-auto mobile-menu">
          <typography variant="h3" font-type="title" class="text-white mb-5 ml-5" no-underline>
            講師頁面
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
        <div class="w-full md:w-4/5 flex-1 px-5 mt-10 min-width-0 mobile-content">
          <router-view />
        </div>
      </div>
    </div>
    <footerComps />
  </div>
</template>
<script setup lang="ts">
import type { MenuOption } from 'naive-ui';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import headerComps from '@/components/layout/headerComps.vue';
import footerComps from '@/components/layout/footerComps.vue';
import typography from '@/components/layout/typography.vue';

const bgImgUrl = new URL('@/assets/images/home/bg-grey-wrinkle.png', import.meta.url).href;

const router = useRouter();
const activeKey = ref<string>('BasicInfo');

const menuOptions: MenuOption[] = [
  {
    label: '基本資訊',
    key: 'BasicInfo',
  },
  {
    label: '課程資訊',
    key: 'CourseInfo',
  },
  {
    label: '建立新課程',
    key: 'courseAction/addCourse',
  },
];

const handleMenuSelect = (key: string) => {
  activeKey.value = key;
  router.push(`/Teacher/${key}`);
};
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
:deep(.n-menu .n-menu-item-content:not(.n-menu-item-content--disabled).n-menu-item-content--selected:hover::before) {
  background-color: rgba(214, 142, 57, 0.7) !important;
}
</style>