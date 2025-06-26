import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const Login = () => {

  
  const { backendUrl, token, setToken } = useContext(AppContext)
  const navigate = useNavigate()



  const [state, setState] = useState('Sign Up')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  // For hover/active styles on button
  const [isHover, setIsHover] = useState(false)
  const [isActive, setIsActive] = useState(false)

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, password, email })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', { password, email })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
        
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  // Define background color based on hover and active state
  const baseColor = 'var(--color-primary)'
  const hoverColor = '#580a94' // a bit darker shade of #6A0DAD
  const activeColor = '#4a087a' // even darker

  let bgColor = baseColor
  if (isActive) bgColor = activeColor
  else if (isHover) bgColor = hoverColor

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="flex flex-col gap-6 p-10 w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-1">
          {state === 'Sign Up' ? 'Create Your Account' : 'Welcome Back'}
        </h2>
        <p className="text-gray-500 mb-6">
          Please {state === 'Sign Up' ? 'sign up' : 'login'} to book your appointment
        </p>

        {state === 'Sign Up' && (
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-2 font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              className="rounded-md border border-gray-300 p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="John Doe"
              required
            />
          </div>
        )}

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 font-medium text-gray-700">
            Email Address
          </label>
          <input
            id="email"
            className="rounded-md border border-gray-300 p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-2 font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            className="rounded-md border border-gray-300 p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          style={{ backgroundColor: bgColor }}
          className="w-full text-white font-semibold rounded-md py-3 text-lg shadow-md transition-colors"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => {
            setIsHover(false)
            setIsActive(false)
          }}
          onMouseDown={() => setIsActive(true)}
          onMouseUp={() => setIsActive(false)}
        >
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        <p className="text-center text-gray-600 text-sm">
          {state === 'Sign Up' ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span
            className="text-[var(--color-primary)] cursor-pointer hover:underline font-semibold"
            onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}
          >
            {state === 'Sign Up' ? 'Login here' : 'Sign up'}
          </span>
        </p>
      </div>
    </form>
  )
}

export default Login
