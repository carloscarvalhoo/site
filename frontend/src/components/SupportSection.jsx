import React from 'react'
import whatsapp from 'assets/icons/whatsapp-fill.svg'

function SupportSection() {
  return (
    <section className='flex min-h-96 w-full items-center justify-center bg-[#E5E7EB]'>
      <div className='grid w-11/12 grid-cols-1 items-center justify-center gap-3 md:w-8/12 md:grid-cols-2 md:gap-8'>
        {/* Lado Esquerdo: Ícone + Título */}
        <div className='flex flex-col items-center gap-2 md:flex-row'>
          {/* Substitua a imagem abaixo pela do WhatsApp ou use um ícone do Google */}
          <a
            href='https://api.whatsapp.com/send?phone=5543999540770&text=Ol%C3%A1%2C%20Vim%20pelo%20site.'
            target='_blank'
          >
            <img
              src={whatsapp}
              alt='Ícone WhatsApp'
              className='h-20 w-20 cursor-pointer transition-all duration-700 hover:scale-110'
            />
          </a>

          {/* Texto Principal */}
          <h2 className='w-full text-center text-xl font-bold md:text-3xl'>
            ATENDIMENTO PERSONALIZADO PARA SUA COMPRA
          </h2>
        </div>

        {/* Lado Direito: Descrição + Botão */}
        <div className='flex flex-col items-center justify-center gap-4'>
          <p className='w-full text-center text-xl font-medium text-gray-900 md:text-3xl'>
            Garanta um atendimento humanizado e personalizado dedicado a você!
          </p>
          {/* Botão de ação */}
          <button
            className='rounded-full bg-[#367952] p-4 text-xl font-semibold text-white transition-opacity duration-500 hover:opacity-75'
            onClick={() =>
              window.open(
                'https://api.whatsapp.com/send?phone=5543999540770&text=Ol%C3%A1%2C%20Vim%20pelo%20site.',
                '_blank',
              )
            }
          >
            FALE COM NOSSO TIME
          </button>
        </div>
      </div>
    </section>
  )
}

export default SupportSection
