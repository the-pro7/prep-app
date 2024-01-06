import React from 'react'
import PropTypes from 'prop-types'
import { useDashBoardValues } from '../contexts/DashboardContext'

export const TimeBar = ({
  status,
  showExtra,
  displayName,
  loggedTime,
  day,
}) => {
 
  let upperCasedStatus = status?.toUpperCase()

  return (
    <li className={`time-log ${upperCasedStatus}`}>
      {showExtra && <p className='user' style={{textTransform: "capitalize"}}>{displayName}</p>}
      <p className='time-logged'>{loggedTime}</p>
      <p className='status'>{upperCasedStatus}</p>
      <p className='day'>{day}</p>
    </li>
  )
}

// TimeBar.propTypes = {
//     showExtra: PropTypes.bool.isRequired,
// }
