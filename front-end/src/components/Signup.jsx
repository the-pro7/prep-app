// import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import '../stylesheets/Signup.scss'
// import { useAuth } from '../contexts/AuthContext'
import { useState, useRef } from 'react'
import { Alert } from 'react-bootstrap'
import { AVAILABLE_ROLES } from '../contexts/RoleContext'

const Signup = () => {
  // These are references to the respective input fields of the form, to allow us to retrieve their value

  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()

  // Basic navigation setup
  const navigate = useNavigate()

  // const { signup, signInWithGoogle, currentUser } = useAuth()

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
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
    // Get user role to determine admin
    let role = localStorage.getItem('role')

    // Restructure data to be sent to server
    const newUser = {
      name: `${firstNameRef.current.value} ${lastNameRef.current.value}`,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      isAdmin:
        role == AVAILABLE_ROLES.ROLE_PREP_ADMIN ||
        role == AVAILABLE_ROLES.ROLE_HOSTEL_TUTOR_PREFECT
          ? true
          : false
    }

    // New way
    let postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    }
    try {
      let response = await fetch(
        'http://localhost:5003/api/users/register',
        postOptions
      )

      if (!response.ok) console.log(response.statusText, response.status)
      let data = await response.json()
      navigate('/login')
      console.log(data.message)
    } catch (error) {
      console.log('An error occurred', error.message)
    }

    // Old way
    // try {
    //   setLoading(true)
    //   await signup(emailRef.current.value, passwordRef.current.value)

    //   localStorage.setItem("displayName", `
    //     ${firstNameRef.current.value} ${lastNameRef.current.value}
    //   `)

    //   console.log(currentUser?.displayName)
    //   navigate('/login')
    // } catch {
    //   console.log('Failed to create an account')
    // }

    // setLoading(false)
  }

  // const handleGoogleSignIn = async () => {
  //   try {
  //     setError('')
  //     if (!navigator.onLine) {
  //       return setError("Failed to sign up. Check your network")
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
          <h2 className='header'>Sign Up</h2>
          <p>Create an account</p>
        </div>
        {error && (
          <Alert variant='danger' className='w-100 text-center'>
            {error}
          </Alert>
        )}
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
      </form>
      <div className='other-sign-in-methods'>
        or continue
        <button>
          <FontAwesomeIcon icon={faGoogle} /> Continue with Google - Coming soon
        </button>
        {/* <button>Continue with ManageBac</button> */}
      </div>
      <div className='old-user'>
        An old user?{' '}
        <Link to='/login' className='link'>
          Log In
        </Link>
      </div>
    </div>
  )
}

export default Signup
