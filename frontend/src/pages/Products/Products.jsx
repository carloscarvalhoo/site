import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import productService from 'services/productService'
import API_BASE_URL from 'config/apiConfig'
import Header from 'components/Header'
import SupportSection from 'components/SupportSection'
import Footer from 'components/Footer'
import Whatsapp from 'components/Whatsapp'

const API_URL = `${API_BASE_URL}uploads/`

function Products() {
  const [products, setProducts] = useState([])
  const [categoryId, setCategoryId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('asc') // Ordenação dos produtos

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  // Obtém parâmetros da URL
  const categoryParam = queryParams.get('category')
  const searchTermParam = queryParams.get('search-term')

  // Ajusta título e scroll da página ao montar o componente
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'LB STORE - Produtos'
  }, [])

  // Atualiza estados de categoria e busca conforme parâmetros da URL
  useEffect(() => {
    setCategoryId(categoryParam)
    setSearchTerm(searchTermParam || '')
  }, [categoryParam, searchTermParam])

  // Busca e ordena produtos sempre que categoryId, searchTerm ou sortOrder mudar
  useEffect(() => {
    fetchProducts()
  }, [categoryId, searchTerm, sortOrder])

  // Função responsável por buscar produtos da API e aplicar filtros/ordenação
  const fetchProducts = async () => {
    try {
      let response

      if (categoryId) {
        response = await productService.getProductsByCategory(categoryId)
      } else {
        response = await productService.getProducts()
      }

      // Filtra por termo de busca
      if (searchTerm) {
        response.products = response.products.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      }

      // Ordena os produtos com base no preço
      const sortedProducts = response.products.sort((a, b) => {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price
      })

      setProducts(sortedProducts || [])
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  // Formata o valor para duas casas decimais
  const formatPrice = (price) => parseFloat(price).toFixed(2)

  // Filtra somente os produtos ativos
  const filteredProducts = products.filter((product) => product.is_active)

  return (
    <main className='relative flex flex-col'>
      <Header />
      <div className='my-16 flex min-h-[50vh] flex-col items-center justify-between gap-4'>
        <div className='mt-28 flex w-full items-center justify-between md:mt-16'>
          {/* Breadcrumb */}
          <div className='hidden w-full text-center md:block'>
            <nav className='text-lg'>
              {/* Link para Home */}
              <Link to='/' className='text-black hover:underline'>
                Home
              </Link>
              <span className='mx-1'>/</span>
              <Link to='/products' className='text-black hover:underline'>
                Produtos
              </Link>
              {/* Se houver categoria, exibe " / [Categoria]" */}
              {categoryParam && (
                <>
                  <span className='mx-1'>/</span>
                  <span>{categoryParam}</span>
                </>
              )}
              {/* Se houver termo de busca, exibe " / Busca: [Termo]" */}
              {searchTermParam && (
                <>
                  <span className='mx-1'>/</span>
                  <span>{searchTermParam}</span>
                </>
              )}
            </nav>
          </div>

          {/* Filtro de Ordenação - sempre visível */}
          <div className='w-full text-center text-lg md:text-xl'>
            <label htmlFor='sortOrder' className='font-semibold'>
              Ordenar:
            </label>
            <select
              id='sortOrder'
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className='rounded-md bg-transparent p-2 font-semibold'
            >
              <option value='asc'>Menor para Maior</option>
              <option value='desc'>Maior para Menor</option>
            </select>
          </div>
        </div>

        {/* Grade de Produtos */}
        <div className='grid w-11/12 grid-cols-2 gap-2 sm:grid-cols-3 md:w-10/12 md:gap-8 lg:grid-cols-4'>
          {filteredProducts.length === 0 ? (
            <div className='col-span-full text-center text-xl font-semibold text-gray-600'>
              Nenhum produto encontrado
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className='relative mb-20 scale-95 rounded-lg bg-white transition-all duration-1000 hover:scale-100'
              >
                <Link to={`/product/${product.id}`}>
                  <img
                    src={
                      product.product_images && product.product_images.length > 0
                        ? `${API_URL}${product.product_images[0].image_url}`
                        : 'caminho/para/imagem/placeholder.jpg'
                    }
                    alt={product.name}
                    className='h-[90%] w-full cursor-pointer object-cover'
                    loading='lazy'
                  />
                </Link>
                <div className='flex justify-between p-2 text-sm md:text-base'>
                  <div>
                    <h3 className='font-semibold'>
                      <Link to={`/product/${product.id}`} className='hover:underline'>
                        {product.name}
                      </Link>
                    </h3>
                    <p className='mt-1 font-bold text-gray-400'>
                      {`3x sem juros de R$ ${formatPrice(product.price / 3)}`}
                    </p>
                    <p className='mt-1 font-bold text-gray-500'>{`R$ ${formatPrice(product.price)}`}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <SupportSection />
      <Footer />
      <Whatsapp />
    </main>
  )
}

export default Products
