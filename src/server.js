// servidor básico para el proyecto seikobs
// Requisitos: npm install express cors dotenv

const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta public (si existe)
const publicDir = path.join(__dirname, '..', 'public');
app.use(express.static(publicDir));

// Ruta de salud
app.get('/health', (req, res) => {
	res.json({ status: 'ok', timestamp: Date.now() });
});

// Ejemplo de API simple
app.get('/api/info', (req, res) => {
	res.json({ name: 'seikobs', env: process.env.NODE_ENV || 'development' });
});

// Fallback: servir index.html para SPA si existe
app.get('*', (req, res, next) => {
	const index = path.join(publicDir, 'index.html');
	res.sendFile(index, err => {
		if (err) return next();
		// enviado correctamente
	});
});

// Manejo de errores
app.use((err, req, res, next) => {
	console.error(err);
	res.status(500).json({ error: 'Server error' });
});

const PORT = parseInt(process.env.PORT, 10) || 3000;
if (require.main === module) {
	app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}

module.exports = app;
