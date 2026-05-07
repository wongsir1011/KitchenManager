# Plan 檔案 (Project Plan)

此檔案為後續開發活動的 SSOT。基於 2026-05-07 的 SSOT 校準報告所規劃。

## 待辦事項 (To-Do)

### 第一階段：補齊 PRD 遺漏之 UI 元件
- [x] **實作「難度」選擇器**
  - **位置**：`src/components/SettingsPanel.tsx`
  - **細節**：將 `settings.difficulty` 變數拉進 UI，讓使用者可選擇「不拘」、「容易」、「中等」或「困難」（關聯 `DIFFICULTY_OPTIONS`）。
- [x] **實作「傾向煮法」選擇器**
  - **位置**：`src/components/SettingsPanel.tsx`
  - **細節**：將 `settings.cookingMethods` 變數拉進 UI，設計為多選 Tag 或 Checkbox，支援「煎」、「炒」、「煮」、「炸」、「燜」、「燉」、「蒸」、「焗」等（關聯 `COOKING_METHODS`）。

### 第二階段：重構食譜生成語言架構 (雙語無縫切換)
- [x] **調整 AI Prompt (system instructions & JSON schema)**
  - **位置**：`src/services/aiService.ts`
  - **細節**：要求 AI 回傳中印雙語對照的資料結構。將原本的文字擴展為物件格式 `{ zh: string, en?: string, id: string }`。
  - **影響**：食材清單、廚具、備註、營養資訊均改為雙語支援。
- [x] **改寫 RecipeGen UI**
  - **位置**：`src/components/RecipeGen.tsx`
  - **細節**：當收到新的中印對照 JSON，可透過按鈕在畫面上一鍵切換語言。部份內容（如食材名稱、買餸清單等）採用並排對照 (e.g., "蘋果 / Apel")，食譜步驟與營養則依據當前顯示語言無縫切換。

## 未來優化 (Backlog)
- [x] **優化自訂食材**：在自訂新增介面，給予欄位讓使用者自行選擇類別 (Category) 與是否為素食，取代原本的自動推斷。
- [x] **存檔機制**：實作本地端 `localStorage` 存取使用者的預設設定與過去生成的食譜。
- [x] **輔助功能擴展**：
  - 加設「重設 (Reset)」按鈕於食材盤點及用餐設定頁面。
  - 於生成食譜後，加設「複製食譜 (Copy)」及「匯出 PDF (Export PDF)」功能。
