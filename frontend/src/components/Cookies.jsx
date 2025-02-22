import React, { useState, useEffect } from 'react'

function Cookies() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Verifica se o usuário já aceitou os cookies
    const cookiesAccepted = localStorage.getItem('cookiesAccepted')
    if (!cookiesAccepted) {
      setShowBanner(true)
    }
  }, [])

  const handleAcceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true')
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <section className='flex w-full items-center justify-center'>
      <div className='fixed bottom-0 z-50 m-8 flex w-11/12 flex-col items-center justify-between rounded-md bg-black px-4 py-2 text-white md:w-2/3 md:flex-row'>
        <p className='text-sm md:w-3/4 md:text-base'>
          Nós usamos cookies e outras tecnologias para proporcionar uma melhor experiência de navegação. Ao continuar a
          navegar, você concorda com a nossa Política de Privacidade.
        </p>
        <button
          onClick={handleAcceptCookies}
          className='mt-2 rounded-lg bg-white px-4 py-2 font-semibold text-black transition-colors hover:bg-gray-200 md:ml-4 md:mt-0'
        >
          Aceitar e Continuar
        </button>
      </div>
    </section>
  )
}

export default Cookies
