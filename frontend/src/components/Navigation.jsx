import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

function Navigation({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleClose = () => {
    onClose()
  }

  const handleLinkClick = () => {
    handleClose()
  }

  const overlayClass = isOpen ? 'opacity-80' : 'opacity-0 pointer-events-none'
  const translateClass = isOpen ? 'translate-x-0' : 'translate-x-full'

  return (
    <section id='nav' className='transition-all'>
      <div className={`fixed inset-0 z-30 bg-black ${overlayClass} duration-500 ease-in-out`} onClick={handleClose} />
      <nav
        className={`fixed inset-y-0 right-0 z-40 flex w-10/12 flex-col justify-center gap-8 bg-[#5D7053] p-8 font-semibold text-white shadow-lg duration-1000 ease-in-out md:w-1/3 ${translateClass}`}
      >
        <ul className='flex flex-col gap-6'>
          <li className='text-2xl' onClick={handleLinkClick}>
            <Link to='/products?category=1' className='uppercase hover:underline'>
              Anéis
            </Link>
          </li>
          <li className='text-2xl' onClick={handleLinkClick}>
            <Link to='/products?category=2' className='uppercase hover:underline'>
              Brincos
            </Link>
          </li>
          <li className='text-2xl' onClick={handleLinkClick}>
            <Link to='/products?category=3' className='uppercase hover:underline'>
              Colares
            </Link>
          </li>
          <li className='text-2xl' onClick={handleLinkClick}>
            <Link to='/products?category=4' className='uppercase hover:underline'>
              Conjuntos
            </Link>
          </li>
          <li className='text-2xl' onClick={handleLinkClick}>
            <Link to='/products?category=5' className='uppercase hover:underline'>
              Pulseiras e Braceletes
            </Link>
          </li>
          <li className='text-2xl' onClick={handleLinkClick}>
            <Link to='/products?category=6' className='uppercase hover:underline'>
              Tornozeleiras
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  )
}

export default Navigation
