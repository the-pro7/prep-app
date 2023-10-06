import React from 'react'
import "../stylesheets/Dashboard.scss";
import DashboardSideNavigation from '../components/DashboardSideNavigation'
import squarePlus from '../assets/plus-square.svg'
import notificationIcon from '../assets/notif.svg'
import TimeLogged from '../components/TimeLogged';

const StudentDashboard = () => {
  return (
    <main className='student-dashboard'>
      <DashboardSideNavigation />
      <section className='student-activity-area'>
        {/* WIll contain the notifcation bell and the new request button */}
        <div className='top-nav'>
          <button className='notifications'>
            <img src={notificationIcon} alt="" />
          </button>
          <button className='new-request'>
            <img src={squarePlus} alt="" />
            New request
          </button>
        </div>
        <TimeLogged />
      </section>
    </main>
  )
}

export default StudentDashboard
