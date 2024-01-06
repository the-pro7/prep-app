import React from 'react'
import { TimeBar } from '../../components/TimeBar'
import TimeLogged from '../../components/TimeLogged'
import squarePlus from '../../assets/plus-square.svg'
import notificationIcon from '../../assets/notif.svg'
import { Link } from 'react-router-dom'

const PrepAdminActivityArea = ({ userLogIns, showExtra }) => {
  const user = JSON.parse(localStorage.getItem("user"))
  return (
    <section className='prep-admin-dashboard__activity-area'>
      <div className='default-nav'>
        <button className='notifications'>
          <img src={notificationIcon} alt='' />
        </button>
        <Link
          className='new-request'
          to={`/${user?._id}/new-request`}
        >
          <img src={squarePlus} alt='' />
          New request
        </Link>
      </div>
      <div style={{ marginTop: '1em' }}>
        <TimeLogged />
      </div>
      <ul className='time-log-box'>
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
