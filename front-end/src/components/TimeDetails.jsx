import React from 'react'
import PropTypes from 'prop-types'

// Time details component
const TimeDetails = ({ showExtra }) => {
  return (
    // This UI will be the one to create sort of the arrangement for the time bar
    <div className='time-details'>
      {/* The showExtra prop will determine whether to include Name in the arrangements  */}
      {showExtra && <p style={{ marginRight: '3em' }}>Name</p>}
      {showExtra && '|'}
      <p>Time</p>|<p>Status</p>|<p>Day</p>
    </div>
  )
}

// This makes it necessary to pass in the right data type to the showExtra prop
TimeDetails.propTypes = {
  showExtra: PropTypes.bool.isRequired
}
export default TimeDetails
