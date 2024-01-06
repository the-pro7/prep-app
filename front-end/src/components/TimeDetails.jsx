import React from 'react'
import PropTypes from 'prop-types'

const TimeDetails = ({showExtra}) => {
  return (
    <div className='time-details'>
      {showExtra && <p style={{marginRight: "3em"}}>Name</p>}
      {showExtra && '|'}
      <p>Time</p>|<p>Status</p>|<p>Day</p>
    </div>
  )
}

// TimeDetails.propTypes = {
//   showExtra: PropTypes.bool.isRequired
// }

export default TimeDetails
