// import { useState } from 'react'
import './stylesheets/App.scss'
import Signup from './components/Signup'
import Signin from './components/Signin'
import { Routes, Route } from 'react-router-dom'
import AccountOptions from './components/account-options/AccountOptions'
import RoleProvder from './contexts/RoleContext'
import AuthProvider from './contexts/AuthContext'
import ProtectedRoute from './protect-routes/ProtectedRoute'
import StudentDashboard from './dashboards/StudentDashboard'
import PrepAdminDashboard from './dashboards/PrepAdminDashboard'
import HostelTutorDashboard from './dashboards/HostelTutorDashboard'

const App = () => {
  return (
    <>
      <AuthProvider>
        <RoleProvder>
          <h1
            style={{ textAlign: 'center', fontSize: '3rem', marginTop: '1rem' }}
          >
            Prep App
          </h1>
          <Routes>
            <Route path='/' element={<AccountOptions />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Signin />} />
            <Route
              path='/student-dashboard'
              element={
                // <ProtectedRoute>
                  <StudentDashboard />
                // </ProtectedRoute>
              }
            />
            <Route
              path='/prep-admin-dashboard'
              element={
                // <ProtectedRoute>
                  <PrepAdminDashboard />
                // </ProtectedRoute>
              }
            />
            <Route
              path='/hostel-tutor-dashboard'
              element={
                // <ProtectedRoute>
                  <HostelTutorDashboard />
                // </ProtectedRoute>
              }
            />
          </Routes>
        </RoleProvder>
      </AuthProvider>
    </>
  )
}

export default App
