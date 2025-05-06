🧾 Pull Request 審核指南（PR Review Guide）
本指南為團隊進行 Pull Request（PR）審核時的統一標準，請依照以下項目逐一檢查與回饋，確保專案品質與可維護性。

✅ 1. 元件放置位置（Component Structure）
元件是否放在適當的資料夾中？

頁面專用元件放置於對應頁面資料夾

共用元件應放置於 comps/ 或 comps/common/

命名是否具語意、簡潔清楚？

是否拆分重複使用的元件，避免重複程式碼？

✅ 2. 邏輯與流程正確性（Logic Correctness）
功能是否如預期運作？流程是否清晰？

是否有處理例外狀況（錯誤處理、Loading 狀態、空資料等）？

邏輯是否耦合過高？是否可以抽成 composable、hooks 或 utils？

✅ 3. 元件共用性與可維護性（Reusability）
該元件是否有重複使用的潛力？若有，是否有以通用元件方式設計？

傳入的 props 是否具可擴展性？

是否不必要地寫死樣式或資料處理邏輯？

✅ 4. Utility Class 使用規範（UnoCSS / Tailwind）
是否優先使用 UnoCSS / Tailwind 的 utility class？

是否有無意義或重複的自定義 class 名稱？（例如：login-box-custom-style）

自定義 class 僅用於下列情境：

複雜樣式（如動畫、深層樣式控制）

需與設計稿命名一致的全域樣式

實在無法以 utility class 表達時

✅ 推薦的 utility class 使用方式範例：

html
複製
編輯

<!-- 好的寫法 -->
<div class="w-full p-4 text-center text-gray-500"></div>

<!-- 不推薦的寫法 -->
<div class="login-wrapper-style"></div> <!-- 要去查樣式內容，不利閱讀與維護 -->
✅ 5. UI 一致性與樣式處理
 是否符合 UI 設計規範（Spacing、顏色、字體等）？

是否避免重複樣式、過多 inline style？

是否有設計與開發一致的規則遵循（如斑馬紋表格、暗色模式支援等）？

✅ 6. 其他技術檢查項
是否清除多餘的 console.log、debugger、註解？

是否通過 ESLint / Prettier 檢查？

是否更新對應的 README / API 文件 / Changelog（如有需要）？

💡 PR 審核建議方式：
✅ 請針對具體問題提供建議（例如：「這段邏輯建議拆成 composable」、「這段樣式可用 utility class 實作」）

⚠️ 嚴重錯誤請標註「需要修改」，其餘可用「optional」標示為建議項

✅ 提醒隊友每次 push 上來後需手動建立 PR，push 不會自動建立 PR

如需自動化規則提示，可搭配：

UnoCSS 插件

VS Code + ESLint + Prettier 格式化統一
