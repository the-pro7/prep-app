import React from 'react'
import DashboardSideNavigation from '../components/DashboardSideNavigation'
import { useDashBoardValues } from '../contexts/DashboardContext'
import { TimeBar } from '../components/TimeBar'
import TimeDetails from '../components/TimeDetails'
import MagnifyingGlass from "../assets/search-icon.svg"
import PropTypes from "prop-types"

const HostelTutorDashboard = ({hostelName}) => {
  const { showExtra, updateShowExtra } = useDashBoardValues()

  if (window.location.pathname.includes('prep-admin-dashboard')) {
    updateShowExtra(true)
  } else {
    updateShowExtra(false)
  }

  return (
    <main className='hostel-tutor-dashboard'>
      <DashboardSideNavigation />
      <section className='hostel-tutor-dashboard__activity-area'>
        <div className='top-nav'>
          <h2>{hostelName ? hostelName : "Mano Hostel"}</h2>
          <div className="search">
          <input type="search" placeholder='Search'/>
          <img src={MagnifyingGlass} alt="" />
          </div>
        </div>
        <TimeDetails showExtra={showExtra}/>
        <TimeBar showExtra={showExtra}/>
      </section>
    </main>
  )
}

HostelTutorDashboard.propTypes = {
  hostelName: PropTypes.string.isRequired,
}

export default HostelTutorDashboard
