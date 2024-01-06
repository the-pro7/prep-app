import React, { useEffect, useState } from 'react'
import MagnifyingGlass from '../../assets/search-icon.svg'
import TimeDetails from '../TimeDetails'
import NoSearchResultImage from '../../assets/error-images/no-search.avif'
import { TimeBar } from '../TimeBar'

const HostelTutorAttendance = ({ searchQuery }) => {
  const [userLogDetails, setUserLogDetails] = useState([])
  const token = localStorage.getItem('token')

  // This call the api to get the user log details anytime the page rerenders
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

  // Function to flatten an array with nested array(s) into one array
  const flatten = arr => {
    return arr.reduce((flat, toFlatten) => {
      return flat.concat(
        Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
      )
    }, [])
  }

  // Set the actual mappable data to the flattened version of the data received from the server
  let usableDetails = flatten(userLogDetails.map(info => info?.logBarDetails))

  // Filter the usableDetails based on searchQuery to show the users whose name match the search query
  const filteredDetails = searchQuery
    ? usableDetails.filter(info =>
        info?.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : usableDetails

  return (
    <>
      <ul className='time-log-box' style={{ height: '83dvh' }}>
        {/* Show the attendances of all the users/ students */}
        {/* Using the filteredDetails array in order to filter the rendered list when searching for a particular student / user */}
        {filteredDetails.length === 0 ? (
          // The above filteredDetails.length ===  0 renders this <li> if the search keyword does not match any of the students / users
          <li className='no-student'>
            <img src={NoSearchResultImage} alt='No results image' />
            No student matched your search
          </li>
        ) : (
          // If filteredDetails.length === 0 is not passed then we render a filtered version based on the search or else we do nothing
          filteredDetails?.map((info, index) => (
            // TimeBar component to to render the user's log in details that is the coloured bars
            <TimeBar
              showExtra={true}
              displayName={info?.name}
              status={info?.status}
              day={info?.day}
              loggedTime={info?.signTime}
              key={index}
            />
          ))
        )}
      </ul>
    </>
  )
}

export default HostelTutorAttendance
