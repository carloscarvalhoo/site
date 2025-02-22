import React from 'react'
import image1 from 'assets/images/image1.png'
import image2 from 'assets/images/image2.png'
import image3 from 'assets/images/image3.png'
import image4 from 'assets/images/image4.png'

function PriceRangeSection() {
  const priceRanges = [{ image: image1 }, { image: image2 }, { image: image3 }, { image: image4 }]

  return (
    <section className='w-full bg-white'>
      <div className='mb-16 flex flex-col items-center justify-center gap-8'>
        {/* <h2 className='mb-6 text-center text-2xl font-bold md:text-4xl'>COMPRE POR FAIXA DE PREÇO</h2> */}
        <div className='grid grid-cols-2 md:grid-cols-4'>
          {priceRanges.map((item, index) => (
            <div key={index}>
              <img src={item.image} alt={`Faixa de preço ${index + 1}`} className='h-auto w-full object-cover' />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PriceRangeSection
