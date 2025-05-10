# re-exprot集中管理、引入

### re-export可集中管理元件、工具、store等引入。

re-export 不只能用在 utils，**用在元件、store、hook、directive 都超實用**

元件-管理方式

```bash
src/
  comps/
    common/
      NInputWrapper.vue
      Logo.vue
      LoadingSpinner.vue
      index.ts   ← ✅ re-export 用
```

元件-引入方式

```bash
export { default as NInputWrapper } from './NInputWrapper.vue'
export { default as Logo } from './Logo.vue'
export { default as LoadingSpinner } from './LoadingSpinner.vue'
```

元件-使用方式

```bash
import { Logo, LoadingSpinner } from '@/comps/common'
```

Store-管理方式

```bash
src/
  stores/
    userStore.ts
    appStore.ts
    index.ts   ← ✅ re-export 用
```

Store-引入方式

```bash
export * from './userStore'
export * from './appStore'
```

Store-使用方式

```bash
import { useUserStore, useAppStore } from '@/stores'
```

## ✅ ✅ 為什麼這麼做超讚？

| 優點                 | 說明                                                             |
| -------------------- | ---------------------------------------------------------------- |
| ✅ 引用簡單          | 不用記住每個元件在哪，統一從 `@/comps/common` 或 `@/stores` 引入 |
| ✅ 可維護性高        | 加新元件只要加在 `index.ts` 裡就好，不用每次去找                 |
| ✅ 支援 IDE 自動補全 | TypeScript 能正確推斷型別，自動提示函式與元件                    |
| ✅ 檔案乾淨整齊      | 輸出邏輯集中，結構一致，新人也看得懂                             |

## ✳️ 額外小提醒：

- 組件記得用 `PascalCase` 命名（如 `Logo.vue`、`LoadingSpinner.vue`）
- store 函式要以 `useXxxStore` 為命名慣例，便於一眼辨識
- 如果你會設定 alias（像 `@/comps/common`、`@/stores`），那使用起來更爽
