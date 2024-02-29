import React from 'react'
import './stylesheets/App.scss'
// Route helpers
import { Routes, Route } from 'react-router-dom'
// App components
import Signup from './components/Signup'
import Signin from './components/Signin'
import AccountOptions from './components/account-options/AccountOptions'
import RoleProvider from './contexts/RoleContext'
import DashboardProvider from './contexts/DashboardContext'
import ProtectedRoute from './protect-routes/ProtectedRoute'
import StudentDashboard from './dashboards/student/StudentDashboard'
import PrepAdminDashboard from './dashboards/prep-admin/PrepAdminDashboard'
import HostelTutorDashboard from './dashboards/hostel-tutor/HostelTutorDashboard'
import NotFound from './components/NotFound'
import Request from './components/request/Request'
// User profile component
import UserProfile from './components/profile/UserProfile'

const App = () => {
  // Get user role
  const role = localStorage.getItem("role")



  return (
    <>
      {/* <AuthProvider> */}
      <RoleProvider>
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
            {/* Path for creating requests */}
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
            <Route
              path={`/${role}/:id/profile`}
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            {/* 404 / Not found route, for pages/ routes that are not included in the routes above */}
            <Route path='*' element={<NotFound />} />
            {/* <Route path='/:dashboard-type/:dashboardUser/undefined' element={<NotFound />} /> */}
          </Routes>
        </DashboardProvider>
      </RoleProvider>
      {/* </AuthProvider> */}
    </>
  )
}

export default App
