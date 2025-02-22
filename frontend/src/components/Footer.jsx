import React from 'react'
import { Link } from 'react-router-dom'
import instagram from 'assets/icons/instagram.svg'
import facebook from 'assets/icons/facebook.svg'
import whatsapp from 'assets/icons/whatsapp.svg'

function Footer() {
  return (
    <footer className='flex min-h-96 flex-col items-center justify-between bg-[#AD9E8E] text-gray-900'>
      <div className='w-11/12 md:w-9/12 md:p-8'>
        {/* Primeira linha: 4 colunas */}
        <div className='grid grid-cols-1 gap-8 py-8 md:grid-cols-4'>
          {/* 1ª Coluna: ATENDIMENTO */}
          <div>
            <h3 className='mb-4 text-xl font-semibold uppercase'>ATENDIMENTO</h3>
            <div className='space-y-2'>
              <a
                href='https://api.whatsapp.com/send?phone=5543999540770&text=Ol%C3%A1%2C%20Vim%20pelo%20site.'
                target='_blank'
                className='hover:underline'
              >
                (43) 99954-0770
              </a>
              <p href='mailto:atendimento@lbstoreivp.com.br' target='_blank' className='hover:underline'>
                atendimento@ligiabranco.com.br
              </p>
              <p>Segunda a Sexta das 09 às 18 horas</p>
              <a href='https://g.co/kgs/jrBFtpH' target='_blank' className='hover:underline'>
                R. Aparício Bitencourt, 285 - Ivaiporã, PR, 86870-000
              </a>
            </div>
          </div>

          {/* 2ª Coluna: CATEGORIAS */}
          <div>
            <h3 className='mb-4 text-xl font-semibold uppercase'>CATEGORIAS</h3>
            <ul className='space-y-2'>
              <li>
                <Link to='/products?category=1' className='hover:underline'>
                  Anéis
                </Link>
              </li>
              <li>
                <Link to='/products?category=2' className='hover:underline'>
                  Brincos
                </Link>
              </li>
              <li>
                <Link to='/products?category=3' className='hover:underline'>
                  Colares
                </Link>
              </li>
              <li>
                <Link to='/products?category=4' className='hover:underline'>
                  Conjuntos
                </Link>
              </li>
              <li>
                <Link to='/products?category=5' className='hover:underline'>
                  Pulseiras e Braceletes
                </Link>
              </li>
              <li>
                <Link to='/products?category=6' className='hover:underline'>
                  Tornozeleiras
                </Link>
              </li>
            </ul>
          </div>

          {/* 3ª Coluna: NOSSAS POLÍTICAS */}
          <div>
            <h3 className='mb-4 text-xl font-semibold uppercase'>NOSSAS POLÍTICAS</h3>
            <ul className='space-y-2'>
              <li>
                <a href='#' className='hover:underline'>
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline'>
                  Política de Entrega
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline'>
                  Política de Trocas e Devoluções
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline'>
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* 4ª Coluna: SIGA A LIGIA BRANCO */}
          <div>
            <h3 className='mb-4 text-xl font-semibold uppercase'>Siga a Ligia Branco</h3>
            <div className='flex items-center gap-2'>
              <a href='https://www.instagram.com/lb_store_ivaipora/' target='_blank' className='flex items-center'>
                <img
                  src={instagram}
                  alt='Instagram'
                  className='mr-2 h-12 w-12 cursor-pointer transition-all duration-700 hover:scale-110'
                />
              </a>
              <a href='https://www.facebook.com/ligiabranco' target='_blank' className='flex items-center'>
                <img
                  src={facebook}
                  alt='Facebook'
                  className='mr-2 h-12 w-12 cursor-pointer transition-all duration-700 hover:scale-110'
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Rodapé colorido final */}
      <div className='flex w-full flex-col gap-1 bg-white p-2 text-xs md:flex-row md:items-center md:justify-center md:p-3 md:text-base'>
        <a href='https://lbstoreivp.com.br/'>©2025 LB STORE. Todos os direitos reservados.</a>
        <p>
          Desenvolvido por{' '}
          <a href='https://dorac.com.br' target='_blank' className='underline hover:cursor-pointer'>
            Agência Dorac
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
