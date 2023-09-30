// import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import '../stylesheets/Signin.scss'
import { useAuth } from '../contexts/AuthContext'
import { Alert } from 'react-bootstrap'
import { useState, useRef } from 'react'
import { AVAILABLE_ROLES } from '../contexts/RoleContext'

const Signin = () => {
  const emailRef = useRef()
  const passwordRef = useRef()

  // Basic navigation setup
  const navigate = useNavigate()

  const { login } = useAuth()

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')

    if (!emailRef.current.value || !passwordRef.current.value) {
      return setError('Cannot submit an empty form')
    }

    try {
      setError('')
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)

      let role = localStorage.getItem('role')

      switch (role) {
        case AVAILABLE_ROLES.ROLE_HOSTEL_TUTOR_PREFECT:
          navigate('/hostel-tutor-dashboard')
          break
        case AVAILABLE_ROLES.ROLE_PREP_ADMIN:
          navigate('/prep-admin-dashboard')
          break
        default:
          navigate('/student-dashboard')
      }
    } catch {
      setError('Failed to login to your account.')
    }
    setLoading(false)
  }

  return (
    <div className='form-wrapper'>
      <form className='form-primary' onSubmit={handleSubmit}>
        <div className='form-primary__header'>
          <h2 className='header'>Login</h2>
          <p>Sign in to you account</p>
        </div>
        {error && (
          <Alert variant='danger' className='text-center w-100'>
            {error}
          </Alert>
        )}
        <div className='form-primary__groupings'>
          <div className='form-group group-two'>
            <label htmlFor='email'>Email Address</label>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='doe_j@soshgic.edu.gh'
              ref={emailRef}
            />
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='.............'
              ref={passwordRef}
            />
          </div>
          <button type='submit' disabled={loading}>
            {loading ? 'Signing In...' : 'Next'}
          </button>
        </div>
        <div className='other-sign-in-methods'>
          or continue
          <button>
            <FontAwesomeIcon icon={faGoogle} /> Continue with Google
          </button>
          <button>Continue with ManageBac</button>
        </div>
        <div className='new-user'>
          An new user?{' '}
          <Link to='/signup' className='link'>
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Signin
