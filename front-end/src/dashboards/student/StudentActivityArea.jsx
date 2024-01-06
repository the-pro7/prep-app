import React from 'react'
import squarePlus from '../../assets/plus-square.svg'
import notificationIcon from '../../assets/notif.svg'
import TimeLogged from '../../components/TimeLogged'
import { TimeBar } from '../../components/TimeBar'
import { Link } from 'react-router-dom'
import { useDashBoardValues } from '../../contexts/DashboardContext'

const StudentActivityArea = () => {
  const { showExtra } = useDashBoardValues()
  const user = JSON.parse(localStorage.getItem('user'))

  let userLogIns = user?.logBarDetails
  console.log(userLogIns)
  return (
    <section className='student-activity-area'>
      {/* Will contain the notification bell and the new request button */}
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
      <TimeLogged />
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

export default StudentActivityArea
