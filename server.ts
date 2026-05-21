import "dotenv/config";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import app from "./server-app.ts";

const PORT = 3000;

async function startServer() {
  // --- Vite & Production static serving configuration ---
  if (process.env.NODE_ENV !== "production") {
    console.log("Iniciando Vite em modo de desenvolvimento...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Servindo arquivos estáticos em produção...");
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor de desenvolvimento rodando na porta ${PORT}`);
  });
}

startServer();
