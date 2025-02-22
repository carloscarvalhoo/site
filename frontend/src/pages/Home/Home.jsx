// react
import React, { useEffect } from 'react'

// global components
import Header from 'components/Header'
import Footer from 'components/Footer'
import Whatsapp from 'components/Whatsapp'
import Cookies from 'components/Cookies'
import SupportSection from 'components/SupportSection'

// local components
import HeroSection from './components/HeroSection'
import PriceRangeSection from './components/PriceRangeSection'
import LatestProductsSection from './components/LatestProductsSection'

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'LB STORE - Semijoias'
  }, [])

  return (
    <main className='overflow-x-hidden'>
      <Header />
      <HeroSection />
      <PriceRangeSection />
      <LatestProductsSection />
      <SupportSection />
      <Footer />
      <Cookies />
      <Whatsapp />
    </main>
  )
}

export default Home
