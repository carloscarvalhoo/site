const { PrismaClient } = require('@prisma/client');
const { isValidNumber, isValidString, isValidDecimal } = require('../utils/validator');
const { uploadImages, deleteImages } = require('../utils/image');
const prisma = new PrismaClient();

// Cria um produto
async function createProduct(req, res) {
  try {
    console.info('[createProduct] Iniciando criação do produto');
    const { name, description, price, category_id, color_id, is_active } = req.body;
    const imageFiles = req.files;

    console.info('[createProduct] Dados recebidos:', { name, description, price, category_id, color_id, is_active });

    if (!isValidString(name)) {
      console.warn('[createProduct] Nome inválido ou ausente');
      return res.status(400).json({ error: 'Nome é obrigatório.' });
    }
    if (!isValidDecimal(price)) {
      console.warn('[createProduct] Preço inválido:', price);
      return res.status(400).json({ error: 'Preço inválido.' });
    }

    const numericCategoryId = parseInt(category_id, 10);
    if (!isValidNumber(numericCategoryId)) {
      console.warn('[createProduct] ID da categoria inválido:', category_id);
      return res.status(400).json({ error: 'ID da categoria inválido.' });
    }

    let numericColorId = null;
    if (color_id !== undefined) {
      numericColorId = parseInt(color_id, 10);
      if (!isValidNumber(numericColorId)) {
        console.warn('[createProduct] ID da cor inválido:', color_id);
        return res.status(400).json({ error: 'ID da cor inválido.' });
      }
    }

    const numericPrice = parseFloat(price);
    let uploadedImageNames = [];
    if (imageFiles && imageFiles.length > 0) {
      console.info('[createProduct] Iniciando upload de imagens');
      uploadedImageNames = await uploadImages(imageFiles);
      console.info('[createProduct] Imagens enviadas:', uploadedImageNames);
    }

    // Converter is_active para booleano: se for "1", 1 ou true, será true; caso contrário, false.
    const convertedIsActive = is_active !== undefined 
      ? (is_active === '1' || is_active === 1 || is_active === true)
      : true;

    const product = await prisma.products.create({
      data: {
        name,
        description,
        price: numericPrice,
        is_active: convertedIsActive,
        category_id: numericCategoryId,
        color_id: numericColorId,
        product_images: {
          create: uploadedImageNames.map(imageName => ({
            image_url: imageName
          }))
        }
      },
      include: {
        product_images: true,
        categories: true,
        colors: true
      }
    });

    console.info('[createProduct] Produto criado com sucesso:', product);
    res.status(201).json(product);
  } catch (error) {
    console.error('[createProduct] Erro ao criar produto:', error);
    res.status(500).json({ error: error.message });
  }
}

// Obtém todos os produtos com paginação
async function getProducts(req, res) {
  try {
    console.info('[getProducts] Buscando produtos');
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const skip = (page - 1) * limit;

    const [products, totalCount] = await Promise.all([
      prisma.products.findMany({
        skip,
        take: limit,
        include: {
          product_images: true,
          categories: true,
          colors: true
        }
      }),
      prisma.products.count()
    ]);

    const totalPages = Math.ceil(totalCount / limit);
    const formattedProducts = products.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      is_active: product.is_active,
      created_at: product.created_at,
      product_images: product.product_images,
      category: product.categories,
      color: product.colors
    }));

    console.info(`[getProducts] Produtos encontrados: ${products.length}`);
    res.status(200).json({
      products: formattedProducts,
      currentPage: page,
      totalPages,
      totalCount
    });
  } catch (error) {
    console.error('[getProducts] Erro:', error);
    res.status(500).json({ error: error.message });
  }
}

// Obtém um produto por ID
async function getProductById(req, res) {
  try {
    console.info('[getProductById] Buscando produto com ID:', req.params.id);
    const { id } = req.params;
    const numericId = parseInt(id, 10);
    if (!isValidNumber(numericId)) {
      console.warn('[getProductById] ID do produto inválido:', id);
      return res.status(400).json({ error: 'ID do produto inválido.' });
    }

    const product = await prisma.products.findUnique({
      where: { id: numericId },
      include: {
        product_images: true,
        categories: true,
        colors: true
      }
    });

    if (!product) {
      console.warn('[getProductById] Produto não encontrado para o ID:', numericId);
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }

    const formattedProduct = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      is_active: product.is_active,
      created_at: product.created_at,
      product_images: product.product_images,
      category: product.categories,
      color: product.colors
    };

    console.info('[getProductById] Produto encontrado:', formattedProduct);
    res.status(200).json(formattedProduct);
  } catch (error) {
    console.error('[getProductById] Erro:', error);
    res.status(500).json({ error: error.message });
  }
}

// Busca produtos por categoria com paginação
async function getProductsByCategory(req, res) {
  try {
    console.info('[getProductsByCategory] Buscando produtos para categoria:', req.query.category_id);
    const { category_id, page, limit } = req.query;
    const numericCategoryId = parseInt(category_id, 10);
    if (!isValidNumber(numericCategoryId)) {
      console.warn('[getProductsByCategory] ID da categoria inválido:', category_id);
      return res.status(400).json({ error: 'ID da categoria inválido.' });
    }
    const currentPage = parseInt(page, 10) || 1;
    const itemsPerPage = parseInt(limit, 10) || 20;
    const skip = (currentPage - 1) * itemsPerPage;

    const [products, totalCount] = await Promise.all([
      prisma.products.findMany({
        where: { category_id: numericCategoryId },
        skip,
        take: itemsPerPage,
        include: {
          product_images: true,
          categories: true,
          colors: true
        }
      }),
      prisma.products.count({
        where: { category_id: numericCategoryId }
      })
    ]);

    const totalPages = Math.ceil(totalCount / itemsPerPage);
    const formattedProducts = products.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      is_active: product.is_active,
      created_at: product.created_at,
      product_images: product.product_images,
      category: product.categories,
      color: product.colors
    }));

    console.info(`[getProductsByCategory] Produtos encontrados: ${products.length}`);
    res.status(200).json({
      products: formattedProducts,
      currentPage,
      totalPages,
      totalCount
    });
  } catch (error) {
    console.error('[getProductsByCategory] Erro:', error);
    res.status(500).json({ error: error.message });
  }
}

// Busca produtos por cor com paginação
async function getProductsByColor(req, res) {
  try {
    console.info('[getProductsByColor] Buscando produtos para cor:', req.query.color_id);
    const { color_id, page, limit } = req.query;
    const numericColorId = parseInt(color_id, 10);
    if (!isValidNumber(numericColorId)) {
      console.warn('[getProductsByColor] ID da cor inválido:', color_id);
      return res.status(400).json({ error: 'ID da cor inválido.' });
    }
    const currentPage = parseInt(page, 10) || 1;
    const itemsPerPage = parseInt(limit, 10) || 20;
    const skip = (currentPage - 1) * itemsPerPage;

    const [products, totalCount] = await Promise.all([
      prisma.products.findMany({
        where: { color_id: numericColorId },
        skip,
        take: itemsPerPage,
        include: {
          product_images: true,
          categories: true,
          colors: true
        }
      }),
      prisma.products.count({
        where: { color_id: numericColorId }
      })
    ]);

    const totalPages = Math.ceil(totalCount / itemsPerPage);
    const formattedProducts = products.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      is_active: product.is_active,
      created_at: product.created_at,
      product_images: product.product_images,
      category: product.categories,
      color: product.colors
    }));

    console.info(`[getProductsByColor] Produtos encontrados: ${products.length}`);
    res.status(200).json({
      products: formattedProducts,
      currentPage,
      totalPages,
      totalCount
    });
  } catch (error) {
    console.error('[getProductsByColor] Erro:', error);
    res.status(500).json({ error: error.message });
  }
}

// Atualiza um produto
async function updateProduct(req, res) {
  try {
    console.info('[updateProduct] Atualizando produto com dados:', req.body);
    const { id, name, description, price, category_id, color_id, is_active } = req.body;
    const imageFiles = req.files;
    const numericId = parseInt(id, 10);
    if (!isValidNumber(numericId)) {
      console.warn('[updateProduct] ID do produto inválido:', id);
      return res.status(400).json({ error: 'ID do produto inválido.' });
    }
    if (name && !isValidString(name)) {
      console.warn('[updateProduct] Nome inválido:', name);
      return res.status(400).json({ error: 'Nome inválido.' });
    }
    if (price && !isValidDecimal(price)) {
      console.warn('[updateProduct] Preço inválido:', price);
      return res.status(400).json({ error: 'Preço inválido.' });
    }

    const numericPrice = price ? parseFloat(price) : undefined;
    const numericCategoryId = category_id ? parseInt(category_id, 10) : undefined;
    if (category_id && !isValidNumber(numericCategoryId)) {
      console.warn('[updateProduct] ID da categoria inválido:', category_id);
      return res.status(400).json({ error: 'ID da categoria inválido.' });
    }
    const numericColorId = color_id ? parseInt(color_id, 10) : undefined;
    if (color_id && !isValidNumber(numericColorId)) {
      console.warn('[updateProduct] ID da cor inválido:', color_id);
      return res.status(400).json({ error: 'ID da cor inválido.' });
    }

    let uploadedImageNames = [];
    if (imageFiles && imageFiles.length > 0) {
      console.info('[updateProduct] Iniciando upload de novas imagens');
      uploadedImageNames = await uploadImages(imageFiles);
      console.info('[updateProduct] Novas imagens enviadas:', uploadedImageNames);
    }

    const existingProduct = await prisma.products.findUnique({
      where: { id: numericId },
      include: { product_images: true }
    });
    if (!existingProduct) {
      console.warn('[updateProduct] Produto não encontrado para o ID:', numericId);
      return res.status(404).json({ error: 'Produto não encontrado.' });
    }
    const currentImageNames = existingProduct.product_images.map(img => img.image_url);
    const imagesToRemove = currentImageNames.filter(imgName => !uploadedImageNames.includes(imgName));

    console.info('[updateProduct] Atualizando produto...');
    const updatedProduct = await prisma.products.update({
      where: { id: numericId },
      data: {
        name,
        description,
        price: numericPrice,
        // Converter is_active para booleano, se fornecido
        is_active: is_active !== undefined 
          ? (is_active === '1' || is_active === 1 || is_active === true)
          : undefined,
        category_id: numericCategoryId,
        color_id: numericColorId,
        product_images: {
          deleteMany: { image_url: { in: imagesToRemove } },
          create: uploadedImageNames.map(imageName => ({ image_url: imageName }))
        }
      },
      include: {
        product_images: true,
        categories: true,
        colors: true
      }
    });

    console.info('[updateProduct] Produto atualizado:', updatedProduct);
    await deleteImages(imagesToRemove);
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('[updateProduct] Erro:', error);
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Produto não encontrado.' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
}

// Alterna o status (ativo/inativo) de vários produtos (bulk)
async function toggleProductStatusBulk(req, res) {
  try {
    console.info('[toggleProductStatusBulk] Alterando status dos produtos:', req.body);
    let { productIds, is_active } = req.body;
    if (!Array.isArray(productIds) || productIds.length === 0) {
      console.warn('[toggleProductStatusBulk] Array de IDs de produto vazio');
      return res.status(400).json({ error: 'Array de IDs de produto é obrigatório.' });
    }
    const numericIds = productIds.map(id => parseInt(id, 10));
    if (numericIds.some(id => !isValidNumber(id))) {
      console.warn('[toggleProductStatusBulk] Um ou mais IDs de produto são inválidos:', numericIds);
      return res.status(400).json({ error: 'Um ou mais IDs de produto são inválidos.' });
    }

    if (typeof is_active === 'string') {
      is_active = parseInt(is_active.trim(), 10);
    }
    if (typeof is_active === 'number') {
      if (is_active !== 0 && is_active !== 1) {
        console.warn('[toggleProductStatusBulk] Status inválido:', is_active);
        return res.status(400).json({ error: 'Status inválido. Use 0 ou 1.' });
      }
      is_active = is_active === 1;
    } else if (typeof is_active !== 'boolean') {
      console.warn('[toggleProductStatusBulk] Tipo de status inválido:', typeof is_active);
      return res.status(400).json({ error: 'Status inválido.' });
    }

    const result = await prisma.products.updateMany({
      where: { id: { in: numericIds } },
      data: { is_active }
    });

    console.info('[toggleProductStatusBulk] Produtos atualizados:', result.count);
    res.status(200).json({ message: 'Produtos atualizados com sucesso.', count: result.count });
  } catch (error) {
    console.error('[toggleProductStatusBulk] Erro:', error);
    res.status(500).json({ error: error.message });
  }
}

// Deleta vários produtos (bulk)
async function deleteProductsBulk(req, res) {
  try {
    console.info('[deleteProductsBulk] Deletando produtos:', req.body);
    const { productIds } = req.body;
    if (!Array.isArray(productIds) || productIds.length === 0) {
      console.warn('[deleteProductsBulk] Array de IDs de produto vazio');
      return res.status(400).json({ error: 'Array de IDs de produto é obrigatório.' });
    }
    const numericIds = productIds.map(id => parseInt(id, 10));
    if (numericIds.some(id => !isValidNumber(id))) {
      console.warn('[deleteProductsBulk] Um ou mais IDs de produto são inválidos:', numericIds);
      return res.status(400).json({ error: 'Um ou mais IDs de produto são inválidos.' });
    }

    const productsToDelete = await prisma.products.findMany({
      where: { id: { in: numericIds } },
      include: { product_images: true }
    });
    if (productsToDelete.length === 0) {
      console.warn('[deleteProductsBulk] Nenhum produto encontrado para os IDs fornecidos');
      return res.status(404).json({ error: 'Nenhum produto encontrado para os IDs fornecidos.' });
    }

    let allImageNames = [];
    productsToDelete.forEach(product => {
      if (product.product_images && product.product_images.length > 0) {
        product.product_images.forEach(img => {
          allImageNames.push(img.image_url);
        });
      }
    });

    const result = await prisma.products.deleteMany({
      where: { id: { in: numericIds } }
    });

    await deleteImages(allImageNames);
    console.info('[deleteProductsBulk] Produtos deletados com sucesso:', result.count);
    res.status(200).json({ message: 'Produtos deletados com sucesso.', count: result.count });
  } catch (error) {
    console.error('[deleteProductsBulk] Erro:', error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  getProductsByCategory,
  getProductsByColor,
  toggleProductStatusBulk,
  updateProduct,
  deleteProductsBulk
};