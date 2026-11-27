# Kitchen Manager 交接紀錄

## 來源與部署

| 項目 | 記錄 |
| --- | --- |
| 原始碼 | 公開 [wongsir1011/KitchenManager](https://github.com/wongsir1011/KitchenManager)，預設分支為 `main`。 |
| 正式網站 | [kitchen-manager-one.vercel.app](https://kitchen-manager-one.vercel.app/)。 |
| 部署快照 | 2026-11-28 香港時間在 [Vercel 部署詳情](https://vercel.com/wongsir1011s-projects/kitchen-manager/H7xav5VxvMYM8nM31LNWCLwmKYU1) 核實為 Ready、Production、Current，來源為 [main 的 `a84e0a8`](https://github.com/wongsir1011/KitchenManager/commit/a84e0a81d63334f31ec4acfddf48ea882d6101c8)。正式站首頁及用餐設定頁已載入。最新已核實提交見 [中央項目總表](https://github.com/wongsir1011/andrew-project-registry)。 |
| 版本 | `package.json` 為 `0.0.0`，穩定產品版本待驗收。盤點時沒有 tag 或 GitHub Release。網站供瀏覽器使用，PWA 安裝待手機驗收。 |
| 授權 | 部分原始碼標示 Apache-2.0。根目錄未有 `LICENSE`，全專案授權待擁有人確認。 |
| 分支治理 | 盤點時 `main` 未受保護及未設定 ruleset。日常改動經工作分支、PR 和 GitHub Actions 檢查。 |

## 現行架構

- React／Vite 前端經同站 API 生成食譜或菜式圖片，食材盤點和用餐設定儲存在瀏覽器的 `localStorage`。
- Vercel 使用 `api/` 的 Functions，本機 Express 伺服器掛載同一組 handlers。Gemini 金鑰由兩個伺服器環境的 `GEMINI_API_KEY` 提供。歷史變更紀錄提過舊有 AI Studio 前端模式，其獨立網址和部署來源未核實。
- [README](./README.md) 列出 Node.js、安裝及啟動指令。GitHub Actions 使用 Node.js 22，在 PR 及 `main` 檢查鎖檔安裝、型別、PWA 建置與正式模式啟動，毋須真實金鑰。
- Vercel 合併後核對正式網域的 Current 部署、來源 branch 及完整 SHA，驗證首頁可載入，再更新中央項目總表。

## 實機驗收

| 操作 | 預期結果 |
| --- | --- |
| 在手機選食材和用餐設定，再重開網站 | 食材與設定仍保留。改選素食模式後，只顯示符合條件的食材。 |
| 在 Preview 用虛構食材生成中印雙語食譜 | 可切換語言，步驟和買餸清單完整。嚴格食材模式的結果符合所選食材和爐具。 |
| 生成一張菜式圖、複製食譜及匯出 PDF | 圖片和食譜相符。複製內容完整，長食譜的 PDF 能正確分頁。 |
| 用 iPhone／Android 試 PWA 及煮飯模式 | 可加入主畫面，步驟在手機清楚顯示。支援螢幕喚醒鎖定的瀏覽器可保持畫面亮著。 |

目前已確認正式站能開啟食材及用餐設定頁。真實 Gemini 食譜、圖片、PDF 及手機 PWA 待實機驗收。
