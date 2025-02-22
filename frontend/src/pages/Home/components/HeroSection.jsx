import React, { Link } from 'react-router-dom'
import Slider from 'react-slick'
import heroSection1 from 'assets/images/heroSection1.png'
import heroSection2 from 'assets/images/heroSection2.png'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

function HeroSection() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
  }

  return (
    <section className='flex w-full items-center justify-center -mb-10'>
      {/* Carrossel de imagens */}
      <Slider {...settings} className='w-full'>
        <Link to='/products'>
          <img
            src={heroSection1}
            alt='HeroSection 1'
            loading='lazy'
            className='max-h-svh mt-36 md:mt-0 md:min-h-svh w-full object-cover'
          />
        </Link>
        <Link to='/products'>
          <img
            src={heroSection2}
            alt='HeroSection 2'
            loading='lazy'
            className='max-h-svh mt-36 md:mt-0 md:min-h-svh w-full object-cover'
          />
        </Link>
      </Slider>
    </section>
  )
}

export default HeroSection
