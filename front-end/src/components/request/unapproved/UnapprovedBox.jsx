import { faXmark, faCheck, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

const UnapprovedBox = ({ name, requestBody, avatar, approved, requestId }) => {
  const token = localStorage.getItem('token')
  const [hide, setHide] = useState(false)

  // Function to approve requests
  const handleApproveRequest = async id => {
    let postOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    try {
      let response = await fetch(
        `http://localhost:5003/api/users/approve-request/${id}`,
        postOptions
      )

      if (!response.ok) console.log(response.statusText)

      let data = await response.json()
      console.log(data)
    } catch (error) {
      console.log('Something went wrong', error.message)
    }
  }

  return (
    <li
      className='request-box'
      style={{ display: approved || hide ? 'none' : 'block' }}
    >
      <div
        className='content'
        style={{ display: 'flex', gap: '1em', alignItems: 'center' }}
      >
        <div className='avatar'>
          <img src='#' alt='' />
        </div>
        <div className='request-content'>
          <h4>{name}</h4>
          <summary>{requestBody}</summary>
        </div>
      </div>
      <div className='request-ctas'>
        <button
          className='approve'
          title={`Approve ${name}'s request`}
          onClick={() => handleApproveRequest(requestId)}
        >
          <FontAwesomeIcon icon={faCheck} />
        </button>
        <button
          className='disapprove'
          title={`Disapprove ${name}'s request`}
          onClick={() => setHide(true)}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
    </li>
  )
}

export default UnapprovedBox
