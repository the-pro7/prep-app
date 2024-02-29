import { Navigate, useLocation } from 'react-router-dom'
import NotFound from '../components/NotFound';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  // Grab user from local storage
  const user  = JSON.parse(localStorage.getItem("user")) || {}

  if (!user) {
    return <Navigate to='/login' />
  }
  return <>{children}</>
}

export default ProtectedRoute
