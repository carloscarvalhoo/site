import React from 'react'
import person from 'assets/icons/person.svg'
import facebook from 'assets/icons/facebook.svg'
import instagram from 'assets/icons/instagram.svg'
import location from 'assets/icons/location.svg'

function DiscoverSection() {
  const items = [
    {
      title: 'Atendimento Personalizado',
      icon: person,
    },
    {
      title: 'Conheça nossa página',
      icon: facebook,
    },
    {
      title: 'Nosso Instagram',
      icon: instagram,
    },
    {
      title: 'Nossa loja',
      icon: location,
    },
  ]

  return (
    <section className='flex w-full items-center justify-center bg-white py-8'>
      <div className='my-16 w-11/12 md:w-10/12'>
        <h2 className='mb-6 text-center text-2xl font-bold md:text-4xl'>CONHEÇA TAMBÉM</h2>

        <div className='grid grid-cols-2 gap-8 md:grid-cols-4'>
          {items.map((item, index) => (
            <div
              key={index}
              style={{ borderRadius: '32px 0 32px 0' }}
              className='relative flex h-96 w-96 cursor-pointer flex-col items-center justify-center border-8 border-gray-200 bg-gray-50 p-6 text-center shadow-sm transition-all duration-700 hover:scale-105'
              aria-label={item.title}
            >
              {/* Renderiza o ícone importado */}
              <img src={item.icon} alt={item.title} className='mb-2 h-20 w-20' />

              <h3 className='text-2xl font-semibold text-gray-800'>{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DiscoverSection
