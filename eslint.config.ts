import { globalIgnores } from 'eslint/config'; // Vue 官方包裝的 defineConfig()，內建支援 .vue + TS
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'; // 以及 加上 TypeScript ESLint 的推薦設定
import pluginVue from 'eslint-plugin-vue'; // 只啟用 Vue 的基本規則

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
      // Vue
      'vue/multi-word-component-names': 'off',

      // JS基本風格
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      'no-eval': 'error',
      'spaced-comment': ['warn', 'always'],
      eqeqeq: ['error', 'always'],
      'prefer-const': 'error',
      'no-var': 'error',
      'no-empty': 'warn',
      'object-shorthand': ['error', 'always'],
      'arrow-body-style': ['error', 'as-needed'],
      'prefer-arrow-callback': 'error',
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'consistent-return': 'warn',
      'no-debugger': 'error',
      'default-case': 'warn',

      'func-names': ['error', 'always'], // 不接受匿名函式
      // 'max-depth': ['warn', 3], // 先關閉(禁用巢狀結構)
      // 'no-magic-numbers': ['warn', { ignore: [0, 1, -1], ignoreArrayIndexes: true }], // 先關閉(禁用魔法數字)
    },
  }
);
