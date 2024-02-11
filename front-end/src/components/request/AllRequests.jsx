import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'
import RequestIem from './RequestIem'
// import { useAuth } from '../../contexts/AuthContext'
import { useDashBoardValues } from '../../contexts/DashboardContext'

const AllRequests = () => {
  const location = useLocation()
  let user = JSON.parse(localStorage.getItem('user'))
  let token = localStorage.getItem('token')
  const [currentData, setCurrentData] = useState([])
  const { updateShowAllRequests } = useDashBoardValues()

  useEffect(() => {
    async function getAllRequests () {
      let getOptions = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      try {
        let response = await fetch(
          `http://localhost:5003/api/users/all-requests/${user?._id}`,
          getOptions
        )

        if (!response.ok) console.log('Response was not soo good!!')

        // Get data from response json
        let data = await response.json()
        // console.log('The data happens to be', data[0]?.requests)
        setCurrentData(data[0]?.requests)
      } catch (error) {
        console.log(error.message)
      }
    }
    
    // Call the function to get all request based on the ID of the currently logged in user
    getAllRequests()
  }, [])

  let requestInfo = currentData

  return (
    <section className='all-requests'>
      <h2>All Your Requests</h2>
      <div className='action-div'>
        <p className='request-count'>
          Total requests made: <span>{requestInfo?.length}</span>
        </p>
        <button onClick={() => updateShowAllRequests(false)}>
          Hide Requests
        </button>
      </div>
      <ul className='requests'>
        {requestInfo?.length
          ? requestInfo?.map(info => (
              <RequestIem
                header={info.userClass}
                summary={info.issue}
                time={info?.createdAt}
                key={info._id}
              />
            ))
          : <span>No requests yet <Link to={`${user?._id}/new-request`}>Make one</Link></span>}
      </ul>
    </section>
  )
}

// AllRequests.propTypes = {}

export default AllRequests
