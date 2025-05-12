<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <router-view />
  </n-config-provider>
</template>

<script setup lang="ts">
import { NConfigProvider } from 'naive-ui'

const themeOverrides = {
  common: {
    fontFamily: `'Noto Sans TC', Roboto, 'Helvetica Neue', Arial, sans-serif`,
    fontSize: '14px',
    fontWeightStrong: '400',
  }
}
</script>
