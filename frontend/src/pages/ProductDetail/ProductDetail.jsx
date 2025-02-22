import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import productService from 'services/productService'
import API_BASE_URL from 'config/apiConfig'
import Header from 'components/Header'
import Footer from 'components/Footer'
import Whatsapp from 'components/Whatsapp'

const API_URL = `${API_BASE_URL}uploads/`

function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productService.getProductById(id)
        // Define o produto a partir de data.product, se existir, ou diretamente de data
        const fetchedProduct = data.product || data
        if (fetchedProduct.is_active) {
          setProduct(fetchedProduct)
        } else {
          setError('Produto não disponível')
        }
      } catch (err) {
        console.error('Erro ao buscar o produto:', err)
        setError('Produto não encontrado')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const formatPrice = (price) => parseFloat(price).toFixed(2)
  const whatsappMessage = encodeURIComponent(
    `Olá, vim pelo site e gostaria de saber sobre o produto ${product?.name}. Aqui está o link: ${window.location.href}`,
  )
  const whatsappLink = `https://api.whatsapp.com/send?phone=5543999540770&text=${whatsappMessage}`

  if (loading) {
    return (
      <main className='flex min-h-screen items-center justify-center'>
        <div className='text-xl font-semibold'>Carregando...</div>
      </main>
    )
  }

  if (error || !product) {
    return (
      <main className='flex min-h-screen flex-col items-center justify-center'>
        <Header />
        <div className='text-3xl font-bold'>{error || 'Produto não encontrado'}</div>
        <Link to='/' className='mt-3 text-base hover:underline'>
          Voltar para Home
        </Link>
        <Footer />
      </main>
    )
  }

  return (
    <>
      <Header />
      <main className='flex min-h-svh w-full flex-col items-center justify-center'>
        <div className='mb-20 mt-40 flex min-h-svh w-11/12 flex-col items-center justify-center md:my-28 md:w-10/12 md:flex-row'>
          <div className='flex w-full items-center justify-center'>
            {product.product_images?.length > 0 ? (
              <img
                src={`${API_URL}${product.product_images[0].image_url}`}
                alt={product.name}
                className='m-4 max-h-[100%] max-w-[100%] object-contain shadow-lg md:max-h-[75%] md:max-w-[75%]'
              />
            ) : (
              <div className='flex h-[300px] w-[300px] items-center justify-center rounded-lg bg-gray-200 shadow-lg'>
                <span>Sem imagem disponível</span>
              </div>
            )}
          </div>

          <div className='flex w-full flex-col justify-start px-6'>
            <nav className='text-sm text-gray-500'>
              <Link to='/' className='hover:underline'>
                Home
              </Link>{' '}
              /
              <Link to='/products' className='hover:underline'>
                {' '}
                Produtos
              </Link>{' '}
              /<span> {product.name}</span>
            </nav>

            <h1 className='mt-2 text-3xl font-bold'>{product.name}</h1>
            <p className='mt-2 text-2xl font-semibold text-gray-900'>R$ {formatPrice(product.price)}</p>
            <p className='text-sm text-gray-600'>3x sem juros de R$ {formatPrice(product.price / 3)}</p>

            <p className='mt-4 text-base text-gray-700'>{product.description}</p>

            <a
              href={whatsappLink}
              target='_blank'
              rel='noopener noreferrer'
              className='mt-5 w-full rounded-md bg-[#629579] py-3 text-center text-lg font-semibold text-white transition-all duration-500 hover:opacity-75 md:w-8/12'
            >
              CONSULTAR DISPONIBILIDADE
            </a>

            <a
              href='https://g.co/kgs/S1r69EC'
              target='_blank'
              className='mt-5 w-full rounded-md bg-black py-3 text-center text-lg font-semibold text-white transition-all duration-500 hover:opacity-75 md:w-8/12'
            >
              ENCONTRE NA LOJA MAIS PRÓXIMA
            </a>
          </div>
        </div>
      </main>
      <Footer />
      <Whatsapp />
    </>
  )
}

export default ProductDetail
