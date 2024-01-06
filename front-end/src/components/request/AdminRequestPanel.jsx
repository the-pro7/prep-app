import React, { useEffect } from 'react'
import {
  faAngleLeft,
  faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import UnapprovedRequests from './UnapprovedRequests'
import ApprovedRequests from './ApprovedRequests'
import flatten from '../../../utilities/flatten'

// Admin requests panel
const AdminRequestPanel = ({ showStudentRequests }) => {
  const token = localStorage.getItem('token')

  // Get all requests from server
  useEffect(() => {
    // http://localhost:5003/api/users/all-requests
    async function getAllStudentRequests () {
      let getOptions = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      try {
        let response = await fetch(
          'http://localhost:5003/api/users/all-requests',
          getOptions
        )

        if (!response.ok) console.log(response.statusText)

        let data = await response.json()
        console.log(data)
      } catch (error) {
        console.log(error.message)
      }
    }
  }, [])

  return (
    <div className='admin-requests'>
      <div className='primary-nav'>
        <button className='back-cta' onClick={() => showStudentRequests(false)}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <h1>Prep App</h1>
      </div>
      <div className='secondary-nav'>
        <h3>Requests</h3>
        <div className='search'>
          <input type='search' id='search' placeholder='Search...' />
          <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon' />
        </div>
      </div>
      <div className='requests-area'>
        <div className='not-approved'>
          <UnapprovedRequests />
        </div>
        <div className='approved'>
          <ApprovedRequests />
        </div>
      </div>
    </div>
  )
}

export default AdminRequestPanel
