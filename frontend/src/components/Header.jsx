import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom' // Importando useNavigate para navegar pela URL
import Navigation from './Navigation' // Certifique-se de que o caminho esteja correto

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Estado para exibir/esconder a sacola
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Estado para exibir/esconder o campo de busca
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const navigate = useNavigate() // Inicializando useNavigate para navegação programática

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Abre/fecha a barra de busca
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
    if (isSearchOpen) {
      // (Opcional) Limpa o campo quando fecha
      setSearchTerm('')
    }
  }

  // Lida com a mudança no input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  // Lida com o envio do formulário (faz a navegação para a URL com o parâmetro search-term)
  const handleSearchSubmit = (e) => {
    e.preventDefault() // Impede o comportamento padrão do formulário
    if (searchTerm.trim()) {
      // Navega para a URL com o parâmetro "search-term" igual ao valor do input
      navigate(`/products?search-term=${searchTerm.trim()}`)
    }
  }

  // Abre/fecha o menu da sacola
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  return (
    <header
      className={`fixed top-0 z-50 flex w-full flex-col items-center justify-center gap-2 p-4 transition-colors duration-500 ease-in-out ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white shadow-md'
      }`}
    >
      <div className='flex w-full items-center justify-between md:w-10/12'>
        {/* Logo e Menu à Esquerda */}
        <div className='flex items-center justify-center'>
          <div className='flex items-center justify-center gap-4'>
            {/* Logo */}
            <div className='mr-8 text-2xl font-bold'>
              <a href='https://lbstoreivp.com.br'>LB STORE</a>
            </div>

            {/* Menu desktop */}
            <nav className='hidden list-none space-x-6 md:flex'>
              <li>
                <Link to='/products?category=1' className='uppercase text-black/65 hover:underline'>
                  Anéis
                </Link>
              </li>
              <li>
                <Link to='/products?category=2' className='uppercase text-black/65 hover:underline'>
                  Brincos
                </Link>
              </li>
              <li>
                <Link to='/products?category=3' className='uppercase text-black/65 hover:underline'>
                  Colares
                </Link>
              </li>
              <li>
                <Link to='/products?category=4' className='uppercase text-black/65 hover:underline'>
                  Conjuntos
                </Link>
              </li>
              <li>
                <Link to='/products?category=5' className='uppercase text-black/65 hover:underline'>
                  Pulseiras e Braceletes
                </Link>
              </li>
              <li>
                <Link to='/products?category=6' className='uppercase text-black/65 hover:underline'>
                  Tornozeleiras
                </Link>
              </li>
            </nav>
          </div>
        </div>

        {/* Campo de busca */}
        <div className='hidden items-center space-x-4 md:flex'>
          <form onSubmit={handleSearchSubmit} className='relative'>
            <input
              type='text'
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder='Digite sua busca...'
              className='rounded-full border border-gray-300 p-3 px-6 transition-colors focus:border-gray-500 focus:outline-none'
            />
            <button
              type='submit'
              className='absolute right-2 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-gray-600'
              aria-label='Iniciar busca'
            >
              <span className='material-symbols-outlined text-2xl hover:text-[#5D7053]'>search</span>
            </button>
          </form>
        </div>

        {/* Botão menu mobile (hambúrguer) */}
        <button
          className='text-xl focus:outline-none md:hidden'
          onClick={() => setIsMenuOpen(true)}
          aria-label='Abrir Menu'
        >
          <span className='material-symbols-outlined text-4xl'>menu</span>
        </button>
      </div>

      {/* Campo de busca */}
      <div className='flex w-full items-center justify-center space-x-4 md:hidden'>
        <form onSubmit={handleSearchSubmit} className='relative w-full'>
          <input
            type='text'
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder='O que você procura?'
            className='w-10/12 rounded-full border border-gray-300 p-3 px-6 transition-colors focus:border-gray-500 focus:outline-none'
          />
          <button
            type='submit'
            className='absolute right-2 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-gray-600'
            aria-label='Iniciar busca'
          >
            <span className='material-symbols-outlined text-3xl hover:text-[#5D7053]'>search</span>
          </button>
        </form>
      </div>

      {/* Renderiza o componente Navigation para o menu mobile */}
      <Navigation isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  )
}

export default Header
