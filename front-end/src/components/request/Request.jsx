import React, { useState } from 'react'
import '../../stylesheets/Request.scss'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons'

// request component
const Request = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const token = localStorage.getItem('token')

  const [formData, setFormData] = useState({
    userClass: '',
    hostel: '',
    hostelTutor: '',
    hostelPrefect: '',
    issue: ''
  })

  const [responseMessage, setResponseMessage] = useState('')
  const [responseSuccess, setResponseSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Helper functions to show messages
  const showResponseStatus = (message = '', timeInterval = 1000) => {
    if (message) {
      setResponseMessage(message)

      setTimeout(() => {
        setResponseMessage('')
      }, timeInterval)
    }
  }

  const handleSubmit = async event => {
    // Prevents default behavior of event
    event.preventDefault()
    setLoading(false)

    let { userClass, hostel, hostelPrefect, hostelTutor, issue } = formData

    if (!userClass || !hostel || !hostelTutor || !hostelPrefect || !issue) {
      showResponseStatus('All fields are mandatory, fill all!', 2500)
      return
    }

    let requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData)
    }

    try {
      setLoading(true)
      let response = await fetch(
        `http://localhost:5003/api/users/new-request/${user?._id}`,
        requestOptions
      )


      if (!response.ok) {
        console.log(response)
        showResponseStatus(response.statusText, 1500)
      }
      let { message, success } = await response.json()
      console.log(message, success)

      if (message && success) {
        showResponseStatus(message, 2500)
        setResponseSuccess(success)
        setLoading(false)
        navigate(-1)
      }
    } catch (error) {
      console.log(error.message)
      setResponseSuccess(false)
      showResponseStatus(error.message, 1500)
      setLoading(false)
    }

    console.log(formData)
  }

  return (
    <div className='wrapper'>
      <Link className='back-link'to={-1}>
        <FontAwesomeIcon icon={faArrowAltCircleLeft} /> Back Home
      </Link>
      {responseMessage && (
        <p className={`response-status ${!responseSuccess && 'error'}`}>
          {responseMessage}
        </p>
      )}
      <div className='excusal'>
        <h2>Excusal form</h2>
        <form className='excusal__form' onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='class'>Class</label>
            <input
              type='text'
              id='class'
              value={formData.userClass}
              onChange={e =>
                setFormData(prevData => {
                  return { ...prevData, userClass: e.target.value }
                })
              }
            />
          </div>
          <div className='form-group'>
            <label htmlFor='hostel'>Hostel</label>
            <input
              type='text'
              id='hostel'
              value={formData.hostel}
              onChange={e =>
                setFormData(prevData => {
                  return { ...prevData, hostel: e.target.value }
                })
              }
            />
          </div>
          <div className='form-group'>
            <label htmlFor='hostel-tutor'>Hostel Tutor</label>
            <input
              type='text'
              id='hostel-tutor'
              value={formData.hostelTutor}
              onChange={e =>
                setFormData(prevData => {
                  return { ...prevData, hostelTutor: e.target.value }
                })
              }
            />
          </div>
          <div className='form-group'>
            <label htmlFor='hostel-prefect'>Hostel Prefect / Monitor</label>
            <input
              type='text'
              id='hostel-prefect'
              value={formData.hostelPrefect}
              onChange={e =>
                setFormData(prevData => {
                  return { ...prevData, hostelPrefect: e.target.value }
                })
              }
            />
          </div>
          <div className='form-group full-width'>
            <label htmlFor='issue'>Issues</label>
            <textarea
              id='issue'
              cols='30'
              rows='10'
              maxLength={250}
              value={formData.issue}
              onChange={e =>
                setFormData(prevData => {
                  return { ...prevData, issue: e.target.value }
                })
              }
            />
          </div>
          <button className='cta' type='submit' disabled={loading}>
            {loading ? 'Sending request' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Request
