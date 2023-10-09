import React from 'react'
import PropTypes from "prop-types"


export const TimeBar = ({showExtra}) => {
  return (
    <div className='time-log'>
        {showExtra && <p className='user'>John Doe</p>}
        <p className='time-logged'>7:30pm</p>
        <p className='status'>Late</p>
        <p className='day'>Yesterday</p>
    </div>
  )
}

TimeBar.propTypes = {
    showExtra: PropTypes.bool.isRequired,
}
