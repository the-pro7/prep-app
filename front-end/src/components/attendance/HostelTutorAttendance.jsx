import React, { useEffect, useState } from 'react'
import MagnifyingGlass from '../../assets/search-icon.svg'
import TimeDetails from '../TimeDetails'
import { useDashBoardValues } from '../../contexts/DashboardContext'
import { TimeBar } from '../TimeBar'
import { useLocation } from 'react-router-dom'

const HostelTutorAttendance = () => {
  const { showExtra } = useDashBoardValues()
  const [userLogDetails, setUserLogDetails] = useState([])
  // const user = JSON.parse(localStorage.getItem('user'))
  const token = localStorage.getItem('token')

  useEffect(() => {
    // Define GET options
    const getOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    async function getAllUserLogDetails () {
      try {
        let response = await fetch(
          'http://localhost:5003/api/users/log-details',
          getOptions
        )

        if (!response.ok)
          console.log('Failed to fetch', response.statusText, response.status)

        let data = await response.json()
        setUserLogDetails(data)
        console.log(data, 'is the data')
      } catch (error) {
        console.log(error)
      }
    }

    // Call the function
    getAllUserLogDetails()
  }, [])

  const flatten = arr => {
    return arr.reduce((flat, toFlatten) => {
      return flat.concat(
        Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
      )
    }, [])
  }

  let usableDetails = flatten(userLogDetails.map(info => info?.logBarDetails))
  // console.log(usableDetails)
  // usableDetails.map(info => console.log(info?.name))

  return (
    <>
      <ul className='time-log-box' style={{ height: '83dvh' }}>
        {usableDetails?.map((info, index) => (
          <TimeBar
            showExtra={true}
            displayName={info?.name}
            status={info?.status}
            day={info?.day}
            loggedTime={info?.signTime}
            key={index}
          />
        ))}
      </ul>
    </>
  )
}

export default HostelTutorAttendance
