import React from 'react'
import "../stylesheets/Dashboard.scss";

const TimeLogged = () => {
  return (
    <div className='time-box'>
        <p className='time-logged-in'>Time logged in</p>
        <div className='time-status'>
        <h1 className='time'>8:20 <span className='modulation'>PM</span></h1>
        <p className="status-text">LATE</p>
        </div>
    </div>
  )
}

export default TimeLogged