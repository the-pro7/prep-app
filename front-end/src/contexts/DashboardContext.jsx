import React, { useContext, useState } from 'react'

const DashboardContext = React.createContext()

export const useDashBoardValues = () => useContext(DashboardContext)

const DashboardProvider = ({children}) => {
    const [showExtra, setShowExtra] = useState()

    const updateShowExtra = (newValue) => setShowExtra(newValue)
    const value = {
        showExtra,
        updateShowExtra
    }
  return (
    <DashboardContext.Provider value={value}>
        {children}
    </DashboardContext.Provider>
  )
}

export default DashboardProvider