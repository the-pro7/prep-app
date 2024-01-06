import React, { useEffect, useState } from 'react'
import '../../stylesheets/Dashboard.scss'
import DashboardSideNavigation from '../../components/DashboardSideNavigation'
import StudentActivityArea from './StudentActivityArea'
import AllRequests from '../../components/request/AllRequests'
import { useDashBoardValues } from '../../contexts/DashboardContext'

const StudentDashboard = () => {
  // const { currentUser } = useAuth()
  const {showAllRequests} = useDashBoardValues()
  return (
    <main className='student-dashboard'>
      <DashboardSideNavigation />
      {!showAllRequests ? <StudentActivityArea /> : <AllRequests />}
    </main>
  )
}

export default StudentDashboard
