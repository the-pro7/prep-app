import React, { useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import { useLocation } from 'react-router-dom'

const DashboardContext = React.createContext()

export const useDashBoardValues = () => useContext(DashboardContext)

const DashboardProvider = ({ children }) => {
  const [showExtra, setShowExtra] = useState()
  const [showAllRequests, setShowAllRequests] = useState(false)
  const [showAttendances, setShowAttendances] = useState(false)

  // Define location
  // const location = useLocation()

  // useEffect(() => {

  // }, [currentUser, location])

  // Functions to help update state values
  const updateShowExtra = newValue => setShowExtra(newValue)
  const updateShowAllRequests = newValue => setShowAllRequests(newValue)

  const value = {
    showExtra,
    updateShowExtra,
    // Show requests
    showAllRequests,
    updateShowAllRequests,
    // Attendances
    showAttendances,
    setShowAttendances,
  }
  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  )
}

export default DashboardProvider
