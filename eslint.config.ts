import { globalIgnores } from 'eslint/config'; //Vue 官方包裝的 defineConfig()，內建支援 .vue + TS
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'; //以及 加上 TypeScript ESLint 的推薦設定
import pluginVue from 'eslint-plugin-vue'; //只啟用 Vue 的基本規則
import prettier from 'eslint-config-prettier';

export default defineConfigWithVueTs(
  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  prettier,

  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
    rules: {
      'vue/multi-word-component-names': 'off',
      'no-console': 'warn',
      'no-eval': 'error',
      'no-unused-vars': 'warn',
    },
  }
);
