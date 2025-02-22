import React from 'react'

function NotFound() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'LB STORE - 404'
  }, [])

  return (
    <main className='flex min-h-screen items-center justify-center'>
      <div className='text-5xl font-bold'>Pagina não encontrada</div>
    </main>
  )
}

export default NotFound
