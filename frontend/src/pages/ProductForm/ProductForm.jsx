import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import API_BASE_URL from 'config/apiConfig'
import productService from 'services/productService'
import categoryService from 'services/categoryService'
import colorService from 'services/colorService'

const API_URL = `${API_BASE_URL}uploads/`

function ProductForm() {
  const { id } = useParams() // Captura o 'id' da URL
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('') // Armazenando o preço digitado
  const [categoryId, setCategoryId] = useState('')
  const [colorId, setColorId] = useState('')
  const [images, setImages] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [categories, setCategories] = useState([])
  const [colors, setColors] = useState([])

  useEffect(() => {
    // Fetch categories
    categoryService.getCategories().then(setCategories).catch(console.error)
    // Fetch colors
    colorService.getColors().then(setColors).catch(console.error)

    if (id) {
      productService
        .getProductById(id)
        .then((product) => {
          setName(product.name)
          setDescription(product.description)
          setPrice(product.price)
          setCategoryId(product.category?.id || '')
          setColorId(product.color?.id || '')
          if (product.product_images?.length > 0) {
            setImagePreviews(product.product_images.map((img) => img.image_url))
          }
        })
        .catch(() => setError('Erro ao carregar os dados do produto.'))
    }
  }, [id])

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    setImages(files)
    const previews = files.map((file) => URL.createObjectURL(file))
    setImagePreviews((prev) => [...prev, ...previews])
  }

  // Função para formatar o preço para o formato brasileiro
  const formatPrice = (value) => {
    const numberValue = value.replace(/\D/g, '') // Remove tudo que não é número
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(numberValue / 100) // Divide por 100 porque o valor vai ser em centavos
  }

  // Atualiza o preço sem formatação para ser enviado à API
  const handlePriceChange = (e) => {
    // Remove tudo que não for número e guarda esse valor
    const value = e.target.value.replace(/\D/g, '')
    setPrice(value) // Armazenando o valor limpo
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const productData = {
      id, // Passando o 'id' quando atualizando
      name,
      description,
      price: parseFloat(price) / 100, // Preço sem formatação, dividido por 100 para enviar como valor numérico
      category_id: categoryId,
      color_id: colorId,
      is_active: 1, // Always active
    }

    try {
      if (id) {
        // Atualizar produto
        await productService.updateProduct(id, productData, images)
      } else {
        // Criar novo produto
        await productService.createProduct(productData, images)
      }
      navigate('/dashboard')
    } catch (err) {
      setError('Erro ao salvar o produto.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className='flex min-h-screen items-center justify-center bg-[#502713] p-8'>
      <div className='w-full max-w-2xl rounded-lg bg-white/80 p-8 shadow-lg'>
        <h2 className='mb-6 text-2xl font-bold uppercase text-[#29430d] md:text-3xl'>
          {id ? 'Editar Produto' : 'Cadastrar Produto'}
        </h2>
        {error && <div className='mb-4 text-red-500'>{error}</div>}
        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Product Name */}
          <div>
            <label htmlFor='name' className='block text-[#29430d]'>
              Nome
            </label>
            <input
              type='text'
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='mt-1 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-[#29430d]'
              required
            />
          </div>

          {/* Product Description */}
          <div>
            <label htmlFor='description' className='block text-[#29430d]'>
              Descrição
            </label>
            <textarea
              id='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='mt-1 h-36 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-[#29430d]'
              required
            ></textarea>
          </div>

          {/* Product Price */}
          <div>
            <label htmlFor='price' className='block text-[#29430d]'>
              Preço
            </label>
            <input
              type='text'
              id='price'
              value={formatPrice(price)} // Exibindo com formatação
              onChange={handlePriceChange} // Atualizando o valor limpo
              className='mt-1 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-[#29430d]'
              required
            />
          </div>

          {/* Category and Color */}
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            {/* Category */}
            <div>
              <label htmlFor='category' className='block text-[#29430d]'>
                Categoria
              </label>
              <select
                id='category'
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className='mt-1 w-full cursor-pointer rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-[#29430d]'
                required
              >
                <option value=''>Selecione uma categoria</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Color */}
            <div>
              <label htmlFor='color' className='block text-[#29430d]'>
                Cor
              </label>
              <select
                id='color'
                value={colorId}
                onChange={(e) => setColorId(e.target.value)}
                className='mt-1 w-full cursor-pointer rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-[#29430d]'
                required
              >
                <option value=''>Selecione uma cor</option>
                {colors.map((col) => (
                  <option className='cursor-pointer' key={col.id} value={col.id}>
                    {col.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label htmlFor='images' className='block text-[#29430d]'>
              Imagens
            </label>
            <label className='mt-2 flex h-36 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#29430d] p-4 text-center'>
              <p className='mb-2 text-gray-500'>
                Arraste ou selecione suas imagens. Formato JPG ou PNG, dimensão recomendada: 1080x1350px.
              </p>
              <input
                type='file'
                id='images'
                onChange={handleImageChange}
                className='hidden w-full'
                accept='image/*'
                multiple
              />
            </label>

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className='mt-4 grid grid-cols-2 gap-4'>
                {imagePreviews.map((src, index) => (
                  <img
                    key={index}
                    src={`${API_URL}${src}`}
                    alt={`Preview ${index + 1}`}
                    className='h-full w-full rounded-lg object-cover'
                  />
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            disabled={loading}
            className='w-full rounded-lg bg-[#29430d] p-4 text-lg font-semibold uppercase text-white transition-colors hover:bg-[#1e2b0c]'
          >
            {loading ? 'Salvando...' : id ? 'Atualizar Produto' : 'Cadastrar Produto'}
          </button>
        </form>
      </div>
    </main>
  )
}

export default ProductForm
