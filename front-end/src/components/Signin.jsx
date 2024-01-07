// import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import '../stylesheets/Signin.scss'
import { Alert } from 'react-bootstrap'
import { useState, useRef } from 'react'
import { AVAILABLE_ROLES } from '../contexts/RoleContext'

const Signin = () => {
  const emailRef = useRef()
  const passwordRef = useRef()

  const user = JSON.parse(localStorage.getItem('user'))

  // Basic navigation setup
  const navigate = useNavigate()

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')

    if (!emailRef.current.value || !passwordRef.current.value) {
      return setError('Cannot submit an empty form')
    }

    // Restructure user login data
    const userData = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }

    try {
      let postOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify(userData)
      }

      // Send user credentials to sign-in
      let response = await fetch(
        'http://localhost:5003/api/users/login',
        postOptions
      )
      if (!response.ok) console.log(response.statusText, response.status)

      let data = await response.json()
      console.log(data, 'user signed in')
      setError(data.message)

      // Set user token to localStorage
      localStorage.setItem('token', data.token)
      // Set user  to localStorage
      localStorage.setItem('user', JSON.stringify(data.user))

      // Get role chosen by user from local storage
      let role = localStorage.getItem('role')
      console.log(role)

      // Take the user to their dashboard based on the role they chose
      switch (role) {
          case AVAILABLE_ROLES.ROLE_HOSTEL_TUTOR_PREFECT:
        navigate(`/hostel-tutor-dashboard/tutor/${data.user?._id}`)
          break
        case AVAILABLE_ROLES.ROLE_PREP_ADMIN:
          navigate(`/prep-admin-dashboard/prep-admin/${data.user?._id}`)
          break
        default:
          navigate(`/student-dashboard/student/${data.user?._id}`)
          break
      }
    } catch (error) {
      setError('Failed to login to your account.' + error)
    }
    setLoading(false)
  }

  // // Sign in with google
  // const handleGoogleSignIn = async () => {
  //   try {
  //     setError('')
  //     if (!navigator.onLine) {
  //       return setError('Failed to sign up. Check your network')
  //     } else {
  //       await signInWithGoogle()
  //     }

  //     let role = localStorage.getItem('role')
  //     switch (role) {
  //       case AVAILABLE_ROLES.ROLE_HOSTEL_TUTOR_PREFECT:
  //         navigate('/hostel-tutor-dashboard')
  //         break
  //       case AVAILABLE_ROLES.ROLE_PREP_ADMIN:
  //         navigate('/prep-admin-dashboard')
  //         break
  //       default:
  //         navigate('/student-dashboard')
  //     }
  //   } catch {
  //     setError('Failed to continue with Google')
  //   }
  // }

  return (
    <div className='form-wrapper'>
      <form className='form-primary' onSubmit={handleSubmit}>
        <div className='form-primary__header'>
          <h2 className='header'>Login</h2>
          <p>Sign in to your account</p>
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
      </form>
      <div className='other-sign-in-methods'>
        or continue
        <button>
          <FontAwesomeIcon icon={faGoogle} /> Continue with Google - Coming Soon
        </button>
        {/* <button>Continue with ManageBac</button> */}
      </div>
      <div className='new-user'>
        An new user?{' '}
        <Link to='/signup' className='link'>
          Sign Up
        </Link>
      </div>
    </div>
  )
}

export default Signin
