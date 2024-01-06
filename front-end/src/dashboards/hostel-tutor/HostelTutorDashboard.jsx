import React, { useState } from 'react'
import DashboardSideNavigation from '../../components/DashboardSideNavigation'
import TimeDetails from '../../components/TimeDetails'
import MagnifyingGlass from '../../assets/search-icon.svg'
import HostelTutorAttendance from '../../components/attendance/HostelTutorAttendance'
import AdminRequestPanel from '../../components/request/AdminRequestPanel'

const HostelTutorDashboard = ({ hostelName }) => {
  const [search, setSearch] = useState('')
  const [showStudentRequests, setShowStudentRequests] = useState(false)

  return (
    <main className='hostel-tutor-dashboard'>
      <DashboardSideNavigation
        showAttendanceButton={false}
        setShowStudentRequests={setShowStudentRequests}
        showStudentRequests={showStudentRequests}
      />
      {!showStudentRequests ? (
        <section className='hostel-tutor-dashboard__activity-area'>
          <div className='top-nav'>
            <h2>{hostelName ? hostelName : 'Mano Hostel'}</h2>
            <div className='search'>
              <input
                type='search'
                placeholder='Search'
                onChange={e => setSearch(e.target.value)}
              />
              <img src={MagnifyingGlass} alt='' />
            </div>
          </div>
          <div>
            <TimeDetails showExtra={true} />
            <HostelTutorAttendance searchQuery={search} />
          </div>
        </section>
      ) : (
        <AdminRequestPanel showStudentRequests={setShowStudentRequests}/>
      )}
    </main>
  )
}

// HostelTutorDashboard.propTypes = {
//   hostelName: PropTypes.string.isRequired,
// }

export default HostelTutorDashboard
