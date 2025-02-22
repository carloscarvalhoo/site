import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import productService from 'services/productService'
import API_BASE_URL from 'config/apiConfig'
import Header from 'components/Header'
import Footer from 'components/Footer'

const API_URL = `${API_BASE_URL}uploads/`

function LatestProductsSection() {
  const [products, setProducts] = useState([])

  // Fetch the latest products (limited to the last 4)
  useEffect(() => {
    fetchProducts() // Fetch the latest products initially
  }, [])

  // Fetch products from API and limit to the last 4 products
  const fetchProducts = async () => {
    try {
      let response = await productService.getProducts()
      const limitedProducts = response.products.slice(-4) // Get the last 4 products
      setProducts(limitedProducts || [])
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  // Format price to two decimal places
  const formatPrice = (price) => parseFloat(price).toFixed(2)

  return (
    <main className='flex min-h-svh w-full flex-col items-center justify-center'>
      {/* Section Title */}
      <div className='mb-4 w-full text-center'>
        <h2 className='text-center text-3xl font-bold md:text-5xl'>Novidades</h2>
      </div>

      {/* Product Grid */}
      <div className='grid w-11/12 grid-cols-2 gap-2 sm:grid-cols-3 md:w-10/12 lg:grid-cols-4'>
        {products
          .filter((product) => product.is_active)
          .map((product) => (
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
              <div className='flex justify-between p-2 text-sm'>
                <div>
                  <h3 className='font-semibold'>
                    <Link to={`/product/${product.id}`} className='hover:underline'>
                      {product.name}
                    </Link>
                  </h3>
                  <p className='mt-1 font-bold text-gray-400'>{`3x sem juros de R$ ${formatPrice(product.price / 3)}`}</p>
                  <p className='mt-1 font-bold text-gray-500'>{`R$ ${formatPrice(product.price)}`}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </main>
  )
}

export default LatestProductsSection
