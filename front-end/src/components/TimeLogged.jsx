import React from 'react'
import "../stylesheets/Dashboard.scss";
import { TimeBar } from './TimeBar';
import PropTypes from "prop-types"
import TimeDetails from './TimeDetails';

const TimeLogged = ({showExtra}) => {
  return (
   <>
     <div className='time-box'>
        <p className='time-logged-in'>Time logged in</p>
        <div className='time-status'>
        <h1 className='time'>8:20 <span className='modulation'>PM</span></h1>
        <p className="status-text">LATE</p>
        </div>
    </div>
    <TimeDetails showExtra={showExtra}/>
    <TimeBar showExtra={showExtra}/>
   </>
   
  )
}

TimeLogged.propTypes = {
  showExtra: PropTypes.bool.isRequired,
}
export default TimeLogged