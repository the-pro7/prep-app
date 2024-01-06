import React, { useEffect, useState } from 'react'
import MagnifyingGlass from '../../assets/search-icon.svg'
import TimeDetails from '../TimeDetails'
import { useDashBoardValues } from '../../contexts/DashboardContext'
import { TimeBar } from '../TimeBar'
import NoSearchResultImage from '../../assets/error-images/no-search.avif'
  // A helper function to flatten or merge all nested arrays into one array
import flatten from "../../../utilities/flatten"

const Attendance = () => {
  // Search query state
  const [search, setSearch] = useState('')
  // Extract contextual values
  const { showExtra } = useDashBoardValues()
  // Init an array to
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

  
  // Get a mappable / usable version of the array received from the database by flattening it
  let usableDetails = flatten(userLogDetails.map(info => info?.logBarDetails))

  // Filter the usableDetails based on searchQuery to show the users whose name match the search query
  let filteredDetails = search
    ? usableDetails.filter(info =>
        info?.name.toLowerCase().includes(search.toLowerCase())
      )
    : usableDetails

  return (
    <section style={{ width: '90%' }}>
      {/* Navbar */}
      <div className='top-nav'>
        <h2>Attendance</h2>
        <div className='search'>
          {/* Search box */}
          <input
            type='search'
            placeholder='Search'
            onChange={e => setSearch(e.target.value)}
          />
          <img src={MagnifyingGlass} alt='' />
        </div>
      </div>
      <TimeDetails showExtra={showExtra} />
      <ul className='time-log-box' style={{ height: '80dvh' }}>
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
    </section>
  )
}

export default Attendance
