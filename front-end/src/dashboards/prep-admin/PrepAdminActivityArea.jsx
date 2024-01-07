import React from 'react'
import { TimeBar } from '../../components/TimeBar'
import TimeLogged from '../../components/TimeLogged'
import squarePlus from '../../assets/plus-square.svg'
import notificationIcon from '../../assets/notif.svg'
import { Link } from 'react-router-dom'

const PrepAdminActivityArea = ({ userLogIns, showExtra }) => {
  // Extract currently logged in user from the localStorage
  const user = JSON.parse(localStorage.getItem("user"))

  return (
    <section className='prep-admin-dashboard__activity-area'>
      <div className='default-nav'>
        <button className='notifications'>
          <img src={notificationIcon} alt='' />
        </button>
        {/* Link to create a new request based on the ID of the current usre */}
        <Link
          className='new-request'
          to={`/${user?._id}/new-request`}
        >
          <img src={squarePlus} alt='' />
          New request
        </Link>
      </div>
      <div style={{ marginTop: '1em' }}>
        {/* Shows the giant box with the time the current user logged in */}
        <TimeLogged />
      </div>
      <ul className='time-log-box'>
        {/* Map over all the user's login and display it in the respective UI */}
        {userLogIns.length ? (
          userLogIns.map((info, index) => (
            <TimeBar
              loggedTime={info.signTime}
              status={info.status}
              day={info.day}
              key={index}
              showExtra={showExtra}
            />
          ))
        ) : (
          // If there are no logged in details show the message here
          <li
            style={{
              textAlign: 'center',
              fontSize: '1.2rem',
              fontStyle: 'italic',
              fontWeight: '500',
              color: '#333'
            }}
          >
            No old records
          </li>
        )}
      </ul>
    </section>
  )
}

export default PrepAdminActivityArea
