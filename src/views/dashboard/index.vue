<template>
  <div class="flex min-h-screen flex-col flex-1" :style="{ backgroundImage: `url(${bgImgUrl})` }">
    <headerComps />
    <div class="w-full max-w-[1280px] mx-auto px-4 flex flex-col items-start box-border text-white">
      <typography variant="h3" font-type="title" class="text-white mt-15 mb-5 ml-5" no-underline>
        講師頁面
      </typography>
      <div class="h-100dvh flex flex-col md:flex-row">
        <div class="w-full md:w-1/4">
          <n-config-provider :theme-overrides="themeOverrides">
            <n-menu
              :root-indent="36"
              :indent="12"
              :options="menuOptions"
              :value="activeKey"
              @update:value="handleMenuSelect"
            />
          </n-config-provider>
        </div>
        <div class="flex-1 overflow-auto"><router-view /></div>
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
:deep(.n-menu .n-menu-item-content.n-menu-item-content--selected .n-menu-item-content-header){
  color: #fff !important;
}
:deep(.n-menu .n-menu-item-content .n-menu-item-content-header){
  color: rgba(255, 255, 255, 0.7) !important;}
:deep(.n-menu .n-menu-item-content:not(.n-menu-item-content--disabled).n-menu-item-content--selected:hover::before){
  background-color: rgba(214, 142, 57, 0.7) !important;
}
</style>