import React, { useState, useEffect } from 'react'

function Cart({ isOpen, onClose }) {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      fetchCartItems()
    } else {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const fetchCartItems = async () => {
    const products = await getCartProducts()
    setCartItems(products)
    setLoading(false)
  }

  const handleClose = () => {
    onClose()
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
  }

  return (
    <section id='cart' className='transition-all'>
      <div
        className={`fixed inset-0 z-30 bg-black opacity-80 backdrop-blur-xl backdrop-filter duration-500 ease-in-out`}
        onClick={handleClose}
      />
      <div
        className={`fixed inset-y-0 right-0 z-40 flex flex-col justify-start bg-white p-6 font-semibold text-black shadow-lg duration-1000 ease-in-out`}
      >
        <button onClick={handleClose} className='mb-6 text-xl font-bold text-gray-600'>
          X
        </button>
        <h2 className='mb-6 text-2xl font-semibold'>Sua Sacola</h2>

        {/* Carregando estado */}
        {loading ? (
          <p>Carregando sua sacola...</p>
        ) : (
          <div className='flex-1 overflow-auto'>
            {cartItems.length === 0 ? (
              <p>Não há itens na sua sacola.</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className='mb-4 flex items-center justify-between'>
                  <div className='flex items-center'>
                    <img src={item.imageUrl} alt={item.name} className='mr-4 h-12 w-12 rounded-md object-cover' />
                    <span className='text-lg'>{item.name}</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <button className='text-lg'>-</button>
                    <span>{item.quantity}</span>
                    <button className='text-lg'>+</button>
                  </div>
                  <span className='text-lg'>{`R$ ${item.price.toFixed(2)}`}</span>
                </div>
              ))
            )}
          </div>
        )}

        <div className='mt-4 flex items-center justify-between'>
          <span className='text-lg font-bold'>Total:</span>
          <span className='text-lg font-semibold'>{`R$ ${calculateTotal()}`}</span>
        </div>

        <div className='mt-6 space-y-4'>
          <button className='w-full rounded-md bg-[#29430d] py-2 text-white'>Finalizar Compra</button>
        </div>
      </div>
    </section>
  )
}

export default Cart
