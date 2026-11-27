# 今晚食乜餸 Kitchen Manager

按屋企現有食材、用餐人數和煮食偏好生成食譜及買餸清單。食材清單支援中文、英文和印尼文，生成的食譜可在中文和印尼文之間切換。

- [使用正式網站](https://kitchen-manager-one.vercel.app/)
- [開發交接、部署來源及實機驗收](./PROJECT.md)

## 本機啟動

使用 Node.js 22.21 或更新的 22.x 版本和 npm，從 repo 根目錄執行：

```sh
npm ci
npm run dev
```

在瀏覽器開啟 `http://localhost:3000`。測試食譜或圖片生成時，先複製 `.env.example` 為 `.env`，在本機填上 `GEMINI_API_KEY`，再重啟伺服器。食材盤點和用餐設定可在沒有金鑰時使用。部署到 Vercel 時，在該項目的伺服器環境變數設定金鑰。

## 檢查及正式模式

```sh
npm run lint
npm run build
npm start
```

`lint` 執行 TypeScript 型別檢查。`build` 產生前端及本機 Express 伺服器檔案。`start` 提供已建置的網頁與相同的 API 路由。先停止開發伺服器，釋出預設的 3000 連接埠。
