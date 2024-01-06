import React, { useEffect } from 'react'
import DashboardSideNavigation from '../../components/DashboardSideNavigation'
import { useDashBoardValues } from '../../contexts/DashboardContext'
import PrepAdminActivityArea from './PrepAdminActivityArea'
import Attendance from '../../components/attendance/Attendance'
import AllRequests from '../../components/request/AllRequests'

// Admin dashboard component
const PrepAdminDashboard = () => {


  // Extract contextual values
  const { showExtra, updateShowExtra, showAttendances, showAllRequests } =
    useDashBoardValues()

  // Show username section if prep-admin dashboard is active
  useEffect(() => {
    updateShowExtra(showAttendances)
  }, [showAttendances, updateShowExtra])

  //  User based stuff
  const user = JSON.parse(localStorage.getItem('user'))
  // Extract user logins
  let userLogIns = user?.logBarDetails
  console.log('Here are my logins', userLogIns)
  return (
    <main className='prep-admin-dashboard'>
      <DashboardSideNavigation showAttendanceButton={true} />
      {!showAttendances ? (
        <PrepAdminActivityArea userLogIns={userLogIns} showExtra={showExtra} />
      ) : (
        <Attendance />
      )}
      {showAllRequests && <AllRequests />}
    </main>
  )
}

export default PrepAdminDashboard
