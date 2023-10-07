import React from 'react'
import DashboardSideNavigation from '../components/DashboardSideNavigation'
import { useDashBoardValues } from '../contexts/DashboardContext'
import { TimeBar } from '../components/TimeBar'
import TimeDetails from '../components/TimeDetails'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {faMagnifyingGlass} from "@fortawesome/free-regular-svg-icons"
const PrepAdminDashboard = () => {
  const { showExtra, updateShowExtra } = useDashBoardValues()

  if (window.location.pathname.includes('prep-admin-dashboard')) {
    updateShowExtra(true)
  } else {
    updateShowExtra(false)
  }

  return (
    <main className='prep-admin-dashboard'>
      <DashboardSideNavigation />
      <section className='prep-admin-dashboard__activity-area'>
        <div className='top-nav'>
          <h2>Attendance</h2>
          <div className="search">
          <input type="search" placeholder='Search'/>
          {/* <FontAwesomeIcon icon={faMagnifyingGlass} /> */}
          </div>
        </div>
        <TimeDetails showExtra={showExtra}/>
        <TimeBar showExtra={showExtra}/>
      </section>
    </main>
  )
}

export default PrepAdminDashboard
