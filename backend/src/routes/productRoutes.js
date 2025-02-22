const express = require('express');
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  getProductsByCategory,
  getProductsByColor,
  updateProduct,
  toggleProductStatusBulk,   
  deleteProductsBulk         
} = require('../controllers/productController');

// Rotas para Produtos
router.post('/', createProduct);
router.get('/', getProducts);
router.get('/by-category', getProductsByCategory);
router.get('/by-color', getProductsByColor);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.patch('/bulk/status', toggleProductStatusBulk);
router.delete('/bulk', deleteProductsBulk);

module.exports = router;