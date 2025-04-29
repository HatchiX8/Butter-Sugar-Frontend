# ButterSugarFrontend

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

所有檔名皆用小駝峰命名

## 共用元件資料夾分層

| 分層區塊  | 用意                                                   |
| --------- | ------------------------------------------------------ |
| base/     | 最基礎的原子級元件，常用又需要統一樣式的（按鈕、輸入） |
| layout/   | 關於版面排版的大型區塊，像 navbar、sidebar             |
| feedback/ | 跟使用者互動、訊息回饋有關的                           |
| form/     | 跟表單處理有關的複合元件                               |
| data/     | 主要是拿來呈現資料的容器或元件                         |
| misc/     | 特殊用，暫時分類不到其他類別的共用元件                 |

## 共用工具資料夾分層

| 分層區塊  | 用意                                          |
| --------- | --------------------------------------------- |
| format/   | 格式處理（時間、數字、字串）                  |
| dom/      | DOM 相關操作工具                              |
| api/      | API 輔助函式                                  |
| validate/ | 驗證工具（如 email、手機格式等）              |
| file/     | 檔案處理（下載、轉 blob）                     |
| index.ts  | 將常用工具集中 re-export（或按需分批 export） |

## 共用Store資料夾分層

| 分層區塊 | 用意                              |
| -------- | --------------------------------- |
| user/    | 用戶登入、個人資訊                |
| auth/    | 權限、角色                        |
| menu/    | 側邊選單、導航配置                |
| layout/  | 版面設定（sidebar收合、主題切換） |
| area/    | 場域管理（目前選擇的場域）        |
| setting/ | 全站設定（API位置、環境變數）     |
| index.ts | 自動匯出所有 modules（集中匯出）  |
