import express from 'express';
import cors from 'cors';
import path from 'path';
import { createServer as createViteServer } from 'vite';

import generateRecipesHandler from './api/generate-recipes.js';
import generateImageHandler from './api/generate-image.js';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Use JSON middleware
  app.use(express.json());
  app.use(cors());

  // API Route: Generate Recipes
  app.post('/api/generate-recipes', async (req, res) => {
    await generateRecipesHandler(req, res);
  });

  // API Route: Generate Image
  app.post('/api/generate-image', async (req, res) => {
    await generateImageHandler(req, res);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
