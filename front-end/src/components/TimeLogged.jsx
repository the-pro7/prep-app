import React from 'react'
import '../stylesheets/Dashboard.scss'
import { TimeBar } from './TimeBar'
import PropTypes from 'prop-types'
import TimeDetails from './TimeDetails'
import { useDashBoardValues } from '../contexts/DashboardContext'

const TimeLogged = () => {
  // Get time values from dashboard context hook
  const { showExtra } = useDashBoardValues()
  const user = JSON.parse(localStorage.getItem("user"))
  const token = localStorage.getItem("token")


  let signedInTime = user?.lastSignInTime.split(" ")
  let loggedTime = signedInTime[0]
  let modulation = signedInTime[1]

  // Get status from user
  let status = user?.signInStatus.toUpperCase()


  return (
    <>
      <div className={`time-box ${status}`}>
        <p className='time-logged-in'>Time logged in</p>
        <div className='time-status'>
          <h1 className='time'>
            {loggedTime} <span className='modulation'>{modulation}</span>
          </h1>
          <p className='status-text'>{status}</p>
        </div>
      </div>
      <TimeDetails showExtra={showExtra} />
    </>
  )
}

// TimeLogged.propTypes = {
//   showExtra: PropTypes.bool.isRequired
// }
export default TimeLogged
