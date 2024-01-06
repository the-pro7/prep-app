import React from 'react'
// Bring in the necessary styles
import '../stylesheets/Dashboard.scss'
import TimeDetails from './TimeDetails'
import { useDashBoardValues } from '../contexts/DashboardContext'

// Time logged component
const TimeLogged = () => {
  // Get time values from dashboard context
  const { showExtra } = useDashBoardValues()
  // Extract the user from the localStorage and parse into a JS object - which is usable
  const user = JSON.parse(localStorage.getItem('user'))
  // Grab the user's auth token from their localStorage as well
  const token = localStorage.getItem('token')

  // Get the sign-in time from the database and split the time into log in time and then either PM or AM
  let signedInTime = user?.lastSignInTime.split(' ')
  // Actual time e.g 7:00
  let loggedTime = signedInTime[0]
  // PM or AM part of the signInTime
  let modulation = signedInTime[1]

  // Get status from user
  let status = user?.signInStatus.toUpperCase()

  return (
    <>
      {/* This is the UI for the large log time */}
      <div className={`time-box ${status}`}>
        <p className='time-logged-in'>Time logged in</p>
        <div className='time-status'>
          <h1 className='time'>
            {/* UI for the time and then PM or AM thingy */}
            {loggedTime} <span className='modulation'>{modulation}</span>
          </h1>
          {/* This shows the status of the currently sign-in user e.g LATE */}
          <p className='status-text'>{status}</p>
        </div>
      </div>
      {/* The UI for the user logs e.g Time Status Day etc. */}
      <TimeDetails showExtra={showExtra} />
    </>
  )
}

export default TimeLogged
