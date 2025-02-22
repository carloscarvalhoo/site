import React from 'react'
import whatsapp from 'assets/icons/whatsapp-fill.svg'

function Whatsapp() {
  const message = 'Olá, Vim pelo site.'
  const phoneNumber = '5543999540770'
  const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`

  return (
    <a
      href={whatsappLink}
      target='_blank'
      className='fixed bottom-4 right-4 z-30 cursor-pointer transition-all duration-700 hover:scale-110 md:bottom-8 md:right-8'
    >
      <picture>
        <img src={whatsapp} alt='WhatsApp' loading='lazy' />
      </picture>
    </a>
  )
}

export default Whatsapp
