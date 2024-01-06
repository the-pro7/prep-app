import React, {useState} from 'react'
import DashboardSideNavigation from '../../components/DashboardSideNavigation'
import { useDashBoardValues } from '../../contexts/DashboardContext'
import { TimeBar } from '../../components/TimeBar'
import TimeDetails from '../../components/TimeDetails'
import MagnifyingGlass from '../../assets/search-icon.svg'
import PropTypes from 'prop-types'
import HostelTutorAttendance from '../../components/attendance/HostelTutorAttendance'

const HostelTutorDashboard = ({ hostelName }) => {
  const { updateShowExtra, showAttendances } = useDashBoardValues()
  const [search, setSearch] = useState('')

  
  return (
    <main className='hostel-tutor-dashboard'>
      <DashboardSideNavigation showAttendanceButton={false}/>
      <section className='hostel-tutor-dashboard__activity-area'>
        <div className='top-nav'>
          <h2>{hostelName ? hostelName : 'Mano Hostel'}</h2>
          <div className='search'>
            <input type='search' placeholder='Search' onChange={(e) => setSearch(e.target.value)}/>
            <img src={MagnifyingGlass} alt='' />
          </div>
        </div>
        <TimeDetails showExtra={true} />
        <HostelTutorAttendance searchQuery={search}/>
      </section>
    </main>
  )
}

// HostelTutorDashboard.propTypes = {
//   hostelName: PropTypes.string.isRequired,
// }

export default HostelTutorDashboard
