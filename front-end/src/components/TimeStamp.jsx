import React from 'react'

const TimeStamp = ({time, status, day}) => {
  return (
    <div>
        <p className="time-arrived">7:30pm</p>
        <p className="status">Late</p>
        <p className="day">Yesterday</p>
    </div>
  )
}

export default TimeStamp