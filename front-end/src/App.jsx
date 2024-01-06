// import { useState } from 'react'
import './stylesheets/App.scss'
import Signup from './components/Signup'
import Signin from './components/Signin'
import { Routes, Route } from 'react-router-dom'
import AccountOptions from './components/account-options/AccountOptions'
import RoleProvder from './contexts/RoleContext'
import AuthProvider, { useAuth } from './contexts/AuthContext'
import DashboardProvider, {
  useDashBoardValues
} from './contexts/DashboardContext'
import ProtectedRoute from './protect-routes/ProtectedRoute'
import StudentDashboard from './dashboards/student/StudentDashboard'
import PrepAdminDashboard from './dashboards/prep-admin/PrepAdminDashboard'
import HostelTutorDashboard from './dashboards/hostel-tutor/HostelTutorDashboard'
import NotFound from './components/NotFound'
import { useEffect } from 'react'
import Request from './components/request/Request'
import Attendance from './components/attendance/Attendance'
// import { postStudent } from './http-helpers/httpHelper'

const App = () => {
  return (
    <>
      <AuthProvider>
        <RoleProvder>
          <DashboardProvider>
            <Routes>
              <Route path='/' element={<AccountOptions />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/login' element={<Signin />} />
              <Route
                path={'/student-dashboard/student/:id'}
                element={
                  <ProtectedRoute>
                    <StudentDashboard />
                  </ProtectedRoute>
                }
              />
              {/* Path for creating requets */}
              <Route
                path={'/:id/new-request'}
                element={
                  <ProtectedRoute>
                    <Request />
                  </ProtectedRoute>
                }
              />

              <Route
                path='/prep-admin-dashboard/prep-admin/:id'
                element={
                  <ProtectedRoute>
                    <PrepAdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/hostel-tutor-dashboard/tutor/:id'
                element={
                  <ProtectedRoute>
                    <HostelTutorDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </DashboardProvider>
        </RoleProvder>
      </AuthProvider>
    </>
  )
}

export default App
