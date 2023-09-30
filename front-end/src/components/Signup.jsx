// import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import '../stylesheets/Signup.scss'
import { useAuth } from '../contexts/AuthContext'
import { useState, useRef } from 'react'
import { Alert } from 'react-bootstrap'

const Signup = () => {
  // These are references to the respective input fields of the form, to allow us to retrieve their value

  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()

  // Basic navigation setup
  const navigate = useNavigate()

  const { signup } = useAuth()

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmtit = async e => {
    e.preventDefault()

    if (
      !firstNameRef.current.value ||
      !lastNameRef.current.value ||
      !emailRef.current.value ||
      !passwordConfirmRef.current.value ||
      !passwordRef.current.value
    ) {
      return setError('Cannot submit with empty credentials')
    }

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match. Try again')
    }

    setError('')

    try {
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      navigate("/login")

    } catch {
      console.log('Failed to create an account')
    }

    setLoading(false)
  }

  return (
    <div className='form-wrapper'>
      <form className='form-primary' onSubmit={handleSubmtit}>
        <div className='form-primary__header'>
          <h2 className='header'>Sign Up</h2>
          <p>Create an account</p>
        </div>
        {error && <Alert variant='danger'className='w-100 text-center'>{error}</Alert>}
        <div className='form-primary__groupings'>
          <div className='form-group group-one'>
            <div>
              <label htmlFor='first-name'>First Name</label>
              <input
                type='text'
                name='first-name'
                id='first-name'
                placeholder='John'
                ref={firstNameRef}
              />
            </div>
            <div>
              <label htmlFor='last-name'>Last Name</label>

              <input
                type='text'
                name='last-name'
                id='last-name'
                placeholder='Doe'
                ref={lastNameRef}
              />
            </div>
          </div>
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
            <label htmlFor='confirm-password'>Confirm Password</label>
            <input
              type='password'
              name='confirm-password'
              id='confirm-password'
              placeholder='.............'
              ref={passwordConfirmRef}
            />
          </div>
          <button type='submit' disabled={loading}>
            Next
          </button>
        </div>
        <div className='other-sign-in-methods'>
          or continue
          <button>
            <FontAwesomeIcon icon={faGoogle} /> Continue with Google
          </button>
          <button>Continue with ManageBac</button>
        </div>
        <div className='old-user'>
          An old user?{' '}
          <Link to='/login' className='link'>
            Log In
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Signup
