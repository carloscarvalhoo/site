const express = require('express');
const router = express.Router();

// Importar as rotas de recursos
const adminUserRoutes = require('./adminUserRoutes');
const productRoutes = require('./productRoutes');
const categoryRoutes = require('./categoryRoutes');
const colorRoutes = require('./colorRoutes');

router.use('/users', adminUserRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/colors', colorRoutes);

module.exports = router;
