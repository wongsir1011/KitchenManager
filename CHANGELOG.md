# Changelog

## [2026-05-07 14:30 HKT] - Bug Fix: Local Storage Safety Patch

### 交付內容 (Delivered Items)
- ✅ **安全的存檔讀取 (Safe Parsing)**：在 `App.tsx` 與 `RecipeGen.tsx` 中，為所有存取 `localStorage` 與 `JSON.parse` 的邏輯加上 `try...catch` 區塊與 `Array.isArray` 檢查。

### 決定與原因 (Decisions & Rationale)
- **決定**：強制要求本機存儲的讀取過程必須涵蓋例外處理 (Exception Handling)。
- **原因**：為了防止無聲故障 (Silent Failures) 或是當使用者原本的 Cookie/localStorage 遭到外部污染、改寫成不合法的 JSON 格式時，造成 App 整個崩潰白畫面。透過加入 `try...catch`，就算解析失敗也能優雅降級回報預設值，保障了應用程式的穩定性與魯棒性 (Robustness)。

## [2026-05-07 11:35 HKT] - Feature: Local Storage Persistence

### 交付內容 (Delivered Items)
- ✅ **狀態存檔 (State Persistence)**：於 `App.tsx` 與 `RecipeGen.tsx` 中實作基於 `localStorage` 的狀態存儲機制。
- ✅ **持久化資料範圍**：包含使用者設定 (`settings`)、自選庫存食材清單 (`selectedIngredients`)、手動新增的自訂食材 (`customIngredients`)，以及「生成之食譜結果」與「買餸紙打剔狀態」。

### 決定與原因 (Decisions & Rationale)
- **決定**：於各主要狀態加上 `localStorage` 持久化，並在初次渲染時進行回復。
- **原因**：為了減輕使用者每次重新進入網頁都要重新設定偏好和選擇食材的負擔（減少摩擦力）；同時留存生成的食譜，避免重新載入網頁導致食譜結果消失而須重新耗費 AI Token，不僅提升體驗，更符合實用層面的存檔需求。

## [2026-05-07 10:35 HKT] - Enhancement: Custom Ingredient Optimization

### 交付內容 (Delivered Items)
- ✅ **優化自訂食材表單**：重構 `Inventory.tsx` 的自訂食材新增介面，將單一輸入框升級為包含名稱、分類 (Category)、及素食選項 (蛋奶素/純素) 的完整表單。
- ✅ **智能預設值綁定**：新增的食材表單會根據當前所選的左側分類及使用者的全域素食設定自動帶入預設值。

### 決定與原因 (Decisions & Rationale)
- **決定**：提供使用者手動選擇分類及素食屬性的能力。
- **原因**：原本系統遇到自訂食材時會一律沿用當下設定檔的素食屬性及隱含的左側分類，容易造成誤判與不便。給予彈性的表單控制權能確保生成演算法及過濾機制的精準性，這是 PRD 未來優化清單中的一環，符合使用者對自訂屬性的實質需求。

## [2026-05-07 10:27 HKT] - Bug Fix: Persistent Tab Navigation

### 交付內容 (Delivered Items)
- ✅ **修復分頁狀態丟失**：將 `App.tsx` 內的分頁邏輯由「條件渲染 (Conditional Rendering)」改為純 CSS 的 `display: none` / `display: block` 隱藏顯示。

### 決定與原因 (Decisions & Rationale)
- **決定**：使用 CSS 隱藏非作用中的分頁元件，而非將它們從 DOM 中卸載 (Unmount)。
- **原因**：先前的寫法會在使用者切換分頁（例如返回盤點冰箱）時，觸發 `RecipeGen` 元件的銷毀。當使用者切回食譜頁時，已生成的 API 回傳資料會被完全清空，導致需耗費額外時間與 API 成本重新生成，造成嚴重毀滅性的體驗中斷。改為使用 CSS 控制顯示後，元件的狀態將持續保存在 DOM 中，完美保證了進度在應用程式生命週期內不流失，且做法輕量不牽連全域狀態的額外建構。

## [2026-05-07 09:41 HKT] - Completion of Phase 2 (Seamless Bilingual Support)

### 交付內容 (Delivered Items)
- ✅ **AI 多語生成架構**：將 `GenerationResponse` 的資料結構全面轉移為 `MultiLangText` 物件，確保由 AI 產生的菜名、難度、煮法、營養及步驟均內建「繁體中文、英文、印尼文」的三語對照本體。
- ✅ **無縫語言切換 UI**：升級 `RecipeGen` 顯示元件，加入直覺的語言切換按鈕 (中文 / Bahasa / EN)。使用狀態 `displayLang` 在本地控制輸出語言，無需再次呼叫 AI API 重繪。
- ✅ **並排顯示優化**：針對實體名詞（如食材名稱、買餸清單等），採用「主語言 / 外傭語言」並排顯示模式（例如 "蘋果 / Apel"）；針對長文（步驟、營養），採用單一語言動態切換方式，確保閱讀體驗的連貫性。

### 決定與原因 (Decisions & Rationale)
- **決定**：強制要求 AI 同時輸出中、英、印三種語言的 JSON 資料結構，放棄依賴 User Settings 在生成時鎖死單一語言。
- **原因**：為了真正符合 PRD 中「外傭溝通工具」與「無縫切換語言」的核心價值觀。這項重構消除了重新呼叫 AI API 造成的時間與 Token 成本浪費，為使用者帶來順滑的切換體驗。
- **決定**：部份內容並排顯示（BilingualText），部份內容單一切換。
- **原因**：讓雇主與外傭在核對購物清單 (Shopping List) 和食材項目時，可各自看到熟悉的語言，防呆零誤差；但對於太長的「作法步驟」，雙語並排可能造成視覺極度混亂，因此僅切換單一選擇的語言，維持專注度。

## [2026-05-07 02:44 HKT] - Completion of Phase 1 (UI Component Polish)

### 交付內容 (Delivered Items)
- ✅ **補齊「難度」選擇器**：在 `SettingsPanel` 中將 `DIFFICULTY_OPTIONS` 選項顯示在設定列表中供使用者選擇目標難度。
- ✅ **補齊「傾向煮法」選擇器**：在 `SettingsPanel` 中實作 `COOKING_METHODS` 選項，作為多選標籤 (pills) 供使用者過濾特定的煮法。

### 決定與原因 (Decisions & Rationale)
- **決定**：將「難度」放置在第一區塊中，與「用餐人數」和「菜式數量」在邏輯上的相近群組，以便能統整地定義整體期望與基本規格；並將「傾向煮法」放置於第二區塊的「家中爐具」旁，這兩者有很強的操作與限制關聯。
- **原因**：根據設定項目的操作與物理心智模型分類，這能最大化使用者的直覺和認知效率。

## [2026-05-07 02:41 HKT] - Architecture & State Decisions

### 交付內容 (Delivered Items)
- ✅ **客製化食材清單的素食同步處理**：新增自訂食材時，現在會透過判斷 `settings.vegetarianLevel` 自動賦予適當的 `isVegetarian` 與 `isVegan` 屬性。
- ✅ **提取所選食材邏輯的強化**：`getSelectedIngredientObjects()` 新增了依據 `vegetarianLevel` 過濾的處理方法，以確保傳遞至 AI 生成的食材嚴守用家的素食設置。此功能防止了使用者在調高素食級別後（例如從「無」改為「純素」），過往所選的葷食仍然被送往 AI 進行生成。

### 決定與原因 (Decisions & Rationale)
- **決定**：在自訂食材被加入時，如果當下素食設定不為「無」，則預設視為該自訂食材具備素食/純素屬性。
  - **原因**：使用者新增食材時若無法顯示（因被當時的素食設定過濾），會導致體驗混亂。此預設邏輯保證了在特定飲食視角下的順暢體驗。
- **決定**：於 `getSelectedIngredientObjects` 層進行過濾，而非強行移除 Set 內的 ID。
  - **原因**：保留使用者的選擇紀錄（Set），允許他們隨意切換素食級別並找回原本圈選的項目，但送交 AI 之前再次作為閘門過濾出合規的實體，達到 UI 操作與資料處理的鬆耦合。

## [2026-05-07 02:37 HKT] - Initial Build & SSOT Calibration

### SSOT 校準報告 (相對於 PRD)

**1. 程式碼是否符合 PRD 中的每一項？**
- ✅ **設定用餐條件**：用餐人數、菜式數量、是否要湯、素食級別、食材生成模式、家中爐具皆已實作。
- ❌ **遺漏設定 UI**：「難度」與「傾向煮法」雖然已在 `types.ts` 定義並實作於 AI Prompt，但在 `SettingsPanel.tsx` 介面上漏了將它們渲染出來（相關變數 `DIFFICULTY_OPTIONS` 和 `COOKING_METHODS` 宣告了但未被使用）。
- ✅ **盤點食材**：內建中/英/印三語清單、手動新增功能皆正常運作；素食過濾器能成功隱藏不合規的食材。
- ✅ **生成食譜**：AI 成功產出包含人均營養數據、步驟、提示及買餸紙的 JSON 格式。
- ⚠️ **切換語言協作**：目前提供「食譜步驟語言」的選項讓開發者與外傭溝通，但**切換語言需要重新生成**，並非一鍵無縫在 UI 之間切換雙語（PRD 所暗示體驗）。

**2. 程式碼中是否有任何功能「不」在 PRD 中？**
- 增加了一個「搜尋功能 (Search)」於盤點食材介面，提升 UX（不違背 PRD，但屬延伸實作）。

**3. 是否有任何重複的狀態、平行數據，或是有超過一個權威歸屬的數據？**
- 狀態設計合理，`App.tsx` 掌管 `settings`、`selectedIngredients` (Set) 和 `customIngredients` (Array)。唯一需要注意的是新增自訂食材時，它會同時寫入 `customIngredients` 和 `selectedIngredients`。這屬於操作同步，未構成破壞性的平行數據，但這意味著 Custom Item 的本體存在於 App Level。
- `INGREDIENTS_DATA` 扮演著純粹的靜態 SSOT，不會被修改。

**4. PRD 中是否還有任何部分尚未建構？**
- **「難度」選擇器** 缺席。
- **「傾向煮法」選擇器** 缺席。
- 若要達到最完美的「切換語言分享給外傭」，AI Output JSON 需要同時返回中、印兩種語言的步驟，而不是現時單憑改變 Prompt 的 Language Setting 進行重繪。
