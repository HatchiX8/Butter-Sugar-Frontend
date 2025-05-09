# Git commit技巧

本地端開發每天不只會commit一次，完成一個小功能或細項就可以commit一次紀錄修改，而修改規則可以依照下方的規則，

### **語意化分類（推薦！）**

- `feat:` 新功能
- `fix:` 修 bug
- `refactor:` 重構
- `docs:` 文件/註解
- `style:` 格式排版
- `chore:` 雜項（升級依賴、調整建置設定）

```bash
feat: 完成場域選擇頁 UI 初稿
fix: 修正登入頁密碼驗證邏輯
refactor: 抽離 header 為共用元件
docs: 補充專案啟動流程說明
```

版本號使用 0.1.0 這種方式，修bug進小版，導新功能進中版，大改就進大版

## **正確流程說明**

1. **本地修 bug**

   在 feature 分支（或 hotfix 分支）**commit** bug 修正。

2. **merge 到 dev**

   合併進 dev，**在 dev 分支測試**、驗證無誤（可多次 commit/merge，不影響正式版）。

3. **測試 OK 後，merge 進 main**
   - 通常只有「發佈」或「線上正式要更新」才 merge 回 main。
   - **這時才會調整版本號**（例如 `1.2.1`，對應 bug fix）。
4. **打上 tag（選擇性）**
   - 發佈新版本時，可以直接在 main 上 `git tag v1.2.1`，方便未來追蹤。
5. **推上線上／正式佈署**
   - main 分支代表目前「線上正式版本」狀態。
