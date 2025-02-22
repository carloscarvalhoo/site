require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const apiRoutes = require('./routes');

const app = express();

// Habilita o CORS para todas as rotas
app.use(cors());

// Configura o Multer para armazenar arquivos na memória
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Diretório onde as imagens serão salvas
const UPLOAD_DIR = path.join(__dirname, './uploads');

// Serve arquivos estáticos da pasta 'uploads'
app.use('/api/uploads', express.static(UPLOAD_DIR));

// Configura os middlewares para tratar JSON e dados URL-encoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para lidar com uploads de arquivos
app.use(upload.any());

// Rotas da API ficam em /api
app.use('/api', apiRoutes);

// ========================================
// A partir daqui, servimos o frontend build
// ========================================

// Diretório onde estará o build do frontend (copiado em processo de build)
const buildPath = path.join(__dirname, './build');

// Serve os arquivos estáticos do build do frontend
app.use(express.static(buildPath));

// Qualquer rota que não seja /api cai aqui e serve o index.html do React
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// ========================================

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
