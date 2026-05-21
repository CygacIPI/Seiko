// servidor básico para el proyecto seikobs
// Requisitos: npm install express cors dotenv

import fs from 'fs';
import path from 'path';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta dist generada por Vite
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, '..', 'dist');
const indexHtml = path.join(distDir, 'index.html');

if (!fs.existsSync(distDir)) {
	console.warn('Warning: dist directory not found. Run `pnpm build` before starting this server.');
}

app.use(express.static(distDir));

// Ruta de salud
app.get('/health', (req, res) => {
	res.json({ status: 'ok', timestamp: Date.now() });
});

// Ejemplo de API simple
app.get('/api/info', (req, res) => {
	res.json({ name: 'seikobs', env: process.env.NODE_ENV || 'development' });
});

// Fallback: servir index.html desde la build de producción
app.use((req, res, next) => {
	if (!fs.existsSync(indexHtml)) {
		return res.status(404).send('Build not found. Run `pnpm build` and try again.');
	}

	res.sendFile(indexHtml, err => {
		if (err) return next(err);
	});
});

// Manejo de errores
app.use((err, req, res, next) => {
	console.error(err);
	res.status(500).json({ error: 'Server error' });
});

const PORT = parseInt(process.env.PORT, 10) || 3000;
if (process.argv[1] === fileURLToPath(import.meta.url)) {
	app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
}

export default app;
