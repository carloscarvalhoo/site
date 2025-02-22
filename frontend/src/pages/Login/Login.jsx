import React, { useState } from 'react'
import userService from 'services/adminUserService'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const data = await userService.login(email, password)
      localStorage.setItem('token', data.token)
      console.log('Login realizado com sucesso!')
    } catch (err) {
      setError('Erro ao fazer login. Verifique suas credenciais.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-[#491C47] bg-gradient-to-r px-4'>
      <div className='relative w-full max-w-md rounded-xl bg-white/10 p-10 text-left shadow-xl backdrop-blur-xl'>
        <h1 className='mb-6 text-center text-4xl font-extrabold text-white'>Acesse sua Conta</h1>
        <p className='mb-6 text-center text-gray-300'>Bem-vindo(a) de volta! Faça login para continuar.</p>
        {error && <div className='mb-4 text-center text-red-500'>{error}</div>}
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label htmlFor='email' className='mb-1 block font-medium text-gray-300'>
              E-mail
            </label>
            <input
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500'
              placeholder='Digite seu e-mail'
              required
            />
          </div>
          <div>
            <label htmlFor='password' className='mb-1 block font-medium text-gray-300'>
              Senha
            </label>
            <input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500'
              placeholder='Digite sua senha'
              required
            />
          </div>
          <button
            type='submit'
            disabled={loading}
            className='w-full rounded-lg bg-[#b0e212] py-3 text-xl font-semibold text-white transition-all duration-300 hover:shadow-lg'
          >
            {loading ? 'Carregando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
