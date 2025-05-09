#Views 資料夾命名與拆分規則

此文件為團隊統一 `src/views` 下頁面資料夾與檔案命名、結構拆分規範，方便多人協作、易讀性與維護性提升。

---

## 📌 第一層：主頁面（對應 route）

每個主功能頁面（例如：登入、首頁、後台）各自建立資料夾，以 route path 為準。

```
src/views/
├── Login/
├── Home/
├── Dashboard/
```

---

## 📌 第二層：主頁 index 與子頁 pages

每個主頁資料夾內應包含：

- `index.vue`：該主頁進入點
- `pages/`：該主頁下的子頁面（通常對應 `router` 的 children）
- `comps/`：該主頁下共用的元件（非全域）

### 範例：Home 頁結構

```
Home/
├── index.vue
├── pages/
│   ├── api
│   │    ├─ deviceStatus
│   │    ├─ realTimeMeasurement
│   │    │   ├─ index.ts
│   │    │   └─ type.ts
│   │    └── index.ts
│   ├── Overview.vue
│   ├── Settings.vue
│   └── Detail/
│       ├── index.vue
│       └── comps/
│           ├── DetailTable.vue
│           └── StatusBadge.vue
└── comps/
    ├── ChartCard.vue
    └── QuickNav.vue
```

---

## 📌 命名慣例

| 類型         | 命名規則                |
| ------------ | ----------------------- |
| 頁面主檔     | 使用 `index.vue`        |
| 子頁資料夾   | 使用 `pages/` 放子頁    |
| 專屬元件     | 使用 `comps/` 放元件    |
| 全域共用元件 | 統一放 `src/components` |

---

## ✅ 拆分判斷原則

- 若子頁面只有單一內容 → 可放在 `pages/Page.vue`
- 若子頁面有自己的元件 → 放在 `pages/Page/index.vue` + `pages/Page/comps/`
- 所有元件請就近放置，不跨頁複用（若需共用再抽出成全域）

---

## 📌 路由設定建議對應

對應頁面結構，router 內可這樣配置：

```
{
  path: '/home',
  component: () => import('@/views/Home/index.vue'),
  children: [
    {
      path: 'overview',
      component: () => import('@/views/Home/pages/Overview.vue')
    },
    {
      path: 'detail',
      component: () => import('@/views/Home/pages/Detail/index.vue')
    }
  ]
}
```

---

## 📘 補充建議

- `comps/` 命名為 components 的簡寫（團隊內部統一使用）
- 結構目的是「可讀、可擴展」，避免混用過多層或元件漂流
- 若未來有國際化或主題切換，可再加 `locales/`、`theme/` 等擴展資料夾

---

如有不清楚可參考實際範例或詢問主要維護人。

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
| ui/       | menu 設定、icon 渲染、欄位工具等              |
| config/   | UnoCSS safelist、權限 config 等               |
| index.ts  | 將常用工具集中 re-export（或按需分批 export） |

## 共用Store資料夾分層

| 分層區塊 | 用意                              |     |
| -------- | --------------------------------- | --- |
| user/    | 用戶登入、個人資訊                |     |
| auth/    | 權限、角色                        |     |
| menu/    | 側邊選單、導航配置                |     |
| layout/  | 版面設定（sidebar收合、主題切換） |     |
| area/    | 場域管理（目前選擇的場域）        |     |
| setting/ | 全站設定（API位置、環境變數）     |     |
| index.ts | 自動匯出所有 modules（集中匯出）  |     |
