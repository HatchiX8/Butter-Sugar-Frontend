# 共用元件拆分與pinia使用須知

### 本文件主要定義pinia使用時機以及共用元件拆分條件

## ✅Pinia

### 1.統一使用 Composition API 寫法

```tsx
// ✅ 推薦這樣寫
export const useUserStore = defineStore('user', () => {
  const name = ref('');
  const setName = (val: string) => {
    name.value = val;
  };
  return { name, setName };
});
```

### 2. **每個 store 限定單一用途，不要混多個邏輯**

例如一個 `userStore` 就只負責登入使用者的資料，不要同時寫進 UI 控制或列表狀態。

### 3. **與 API 配合的寫法**

- 所有呼叫 API 的行為要包成 `async function` 寫在 store 裡
- 不直接在頁面中處理資料轉換或設定

```tsx
// ✅ 推薦這樣：封裝 API 行為
const fetchUserInfo = async () => {
  const res = await getApiFunction();
  name.value = res.data.name;
};
```

### 4. **store 命名與 import 統一風格**

```tsx
// 統一這樣命名與使用
import { useUserStore } from '@/stores/index';
const userStore = useUserStore();
```

## ✅ 元件拆分規範

### 1. **Page 元件 vs 共用元件**

- **Page 元件**（頁面用）放在 `/views/home/homeDashborad`中，只處理當頁邏輯
- **共用元件** 放在 `/comps/`
  - 可分為：
    - `base/`：通用原子元件（如 `BaseButton.vue`, `BaseInput.vue`）
    - `layout/`：關於版面排版的大型區塊（如 `headerComp.vue`、`.vue`）

### 2. **可重用就拆**

- 同一個 UI 結構在 2 個以上頁面出現，就應該抽出成元件
- 不要複製貼上相似 UI，容易造成維護成本倍增

### 3. **不直接耦合頁面邏輯**

- 共用元件的資料要透過 `props` 傳入、透過 `emit` 傳出
- 不應該自己呼叫 API 或抓 store（除非是封裝好的 UI 控制元件）

### 4. **UI 框架元件包裝時也應抽離**

例如使用 Naive UI 的 `<n-form> + <n-form-item> + <n-input>` 形成一個複雜欄位：

👉 就可以包成一個 `BaseFormInput.vue`

📁 結構參考（components 目錄）

components/
├─ base/
│ ├─ BaseButton.vue
│ └─ BaseInput.vue
├─ layout/
│ ├─ headerComp.vue
│ └─ .vue
