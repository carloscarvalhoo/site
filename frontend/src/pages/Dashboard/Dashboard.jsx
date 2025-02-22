import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import productService from 'services/productService'

function Dashboard() {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProducts, setSelectedProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Bom dia'
    if (hour < 18) return 'Boa tarde'
    return 'Boa noite'
  }

  const greeting = getGreeting()

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'LB STORE - Gerenciador da Loja'
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const data = await productService.getProducts()
      setProducts(data.products)
    } catch (err) {
      setError('Erro ao carregar produtos')
    } finally {
      setLoading(false)
    }
  }

  const handleSelectProduct = (id) => {
    setSelectedProducts((prev) => (prev.includes(id) ? prev.filter((prodId) => prodId !== id) : [...prev, id]))
  }

  const handleSelectAll = () => {
    setSelectedProducts(selectedProducts.length === products.length ? [] : products.map((product) => product.id))
  }

  const handleDeleteBulk = async () => {
    try {
      await productService.deleteProductsBulk(selectedProducts)
      fetchProducts()
      setSelectedProducts([])
    } catch (err) {
      console.error(err)
    }
  }

  const handleToggleStatusBulk = async (isActive) => {
    try {
      await productService.toggleProductStatusBulk(selectedProducts, isActive)
      fetchProducts()
      setSelectedProducts([])
    } catch (err) {
      console.error(err)
    }
  }

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))

  // Função para truncar a descrição
  const truncateText = (text, maxLength = 30) => (text.length > maxLength ? text.slice(0, maxLength) + '...' : text)

  // Função para formatar o preço para exibição (ex: R$ 25,00)
  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price)
  }

  return (
    <main className='relative min-h-screen bg-gray-300 p-8'>
      {/* Boas-vindas */}
      <div className='mb-8 rounded-lg bg-white p-6 shadow-sm'>
        <h2 className='text-2xl font-bold text-gray-900 md:text-3xl'>{`${greeting}, Ligia Branco`}</h2>
        <p className='mt-2 text-gray-600'>Bem-vinda ao painel da LB STORE. Gerencie sua loja aqui.</p>
      </div>

      <div className='mb-8 flex flex-col items-center justify-between md:flex-row'>
        <h1 className='text-3xl font-semibold text-gray-900'>Dashboard de Produtos</h1>
        <div className='flex w-full max-w-md items-center gap-3'>
          <input
            type='text'
            placeholder='Buscar produtos...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full rounded-full border border-gray-300 p-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400'
          />
        </div>
      </div>

      <div className='mb-6 flex flex-col gap-2 md:flex-row md:items-center'>
        <button
          onClick={() => handleToggleStatusBulk(true)}
          disabled={selectedProducts.length === 0}
          className='w-full cursor-pointer rounded-md bg-[#3E4E32] px-4 py-2 text-white transition-opacity duration-500 hover:opacity-75 md:w-auto'
        >
          Ativar
        </button>
        <button
          onClick={() => handleToggleStatusBulk(false)}
          disabled={selectedProducts.length === 0}
          className='w-full cursor-pointer rounded-md bg-[#3E4E32] px-4 py-2 text-white transition-opacity duration-500 hover:opacity-75 md:w-auto'
        >
          Desativar
        </button>
        <button
          onClick={handleDeleteBulk}
          disabled={selectedProducts.length === 0}
          className='w-full cursor-pointer rounded-md bg-[#3E4E32] px-4 py-2 text-white transition-opacity duration-500 hover:opacity-75 md:w-auto'
        >
          Deletar
        </button>
      </div>

      {loading ? (
        <div className='mt-8 text-center text-lg text-gray-700'>Carregando...</div>
      ) : error ? (
        <div className='mt-8 text-center text-red-500'>{error}</div>
      ) : (
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200 rounded-lg bg-white shadow-sm'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='whitespace-nowrap px-6 py-3 text-left text-sm font-semibold text-gray-600'>
                  <input
                    type='checkbox'
                    className='scale-150 hover:cursor-pointer'
                    onChange={handleSelectAll}
                    checked={selectedProducts.length === products.length && products.length > 0}
                  />
                </th>
                <th className='whitespace-nowrap px-6 py-3 text-left text-sm font-semibold text-gray-600'>Nome</th>
                <th className='whitespace-nowrap px-6 py-3 text-left text-sm font-semibold text-gray-600'>Descrição</th>
                <th className='whitespace-nowrap px-6 py-3 text-left text-sm font-semibold text-gray-600'>Preço</th>
                <th className='whitespace-nowrap px-6 py-3 text-left text-sm font-semibold text-gray-600'>Status</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {filteredProducts.map((product) => (
                <tr key={product.id} className='transition-colors hover:bg-gray-100'>
                  <td className='whitespace-nowrap px-6 py-4'>
                    <input
                      type='checkbox'
                      className='scale-150 hover:cursor-pointer'
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => handleSelectProduct(product.id)}
                    />
                  </td>
                  <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-700'>
                    {/* Link para edição do produto */}
                    <Link to={`/product-form/${product.id}`} className='text-[#29430d] hover:underline'>
                      {product.name}
                    </Link>
                  </td>
                  <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-700'>
                    {truncateText(product.description, 40)}
                  </td>
                  <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-700'>
                    {formatPrice(product.price)} {/* Formatação do preço */}
                  </td>
                  <td className='whitespace-nowrap px-6 py-4 text-sm font-medium'>
                    {product.is_active ? (
                      <span className='rounded-full bg-green-100 px-3 py-1 text-green-800'>Ativo</span>
                    ) : (
                      <span className='rounded-full bg-red-100 px-3 py-1 text-red-800'>Inativo</span>
                    )}
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan='5' className='px-6 py-4 text-center text-gray-600'>
                    Nenhum produto encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Botão flutuante para adicionar novo produto */}
      <Link
        to='/product-form'
        className='fixed bottom-8 right-8 flex items-center justify-center rounded-full bg-[#502713] p-4 uppercase text-white shadow-md'
      >
        <span className='text-xl font-bold'>+ Novo Produto</span>
      </Link>
    </main>
  )
}

export default Dashboard
