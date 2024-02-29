import React, { useContext, useEffect, useState } from "react";

const DashboardContext = React.createContext();

export const useDashBoardValues = () => useContext(DashboardContext);

const DashboardProvider = ({ children }) => {
  // General state
  const [showExtra, setShowExtra] = useState();
  const [showAllRequests, setShowAllRequests] = useState(false);
  const [showAttendances, setShowAttendances] = useState(false);

  // Functions to help update state values
  const updateShowExtra = (newValue) => setShowExtra(newValue);
  const updateShowAllRequests = (newValue) => setShowAllRequests(newValue);


  // Values for context provider
  const value = {
    showExtra,
    updateShowExtra,
    // Show requests
    showAllRequests,
    updateShowAllRequests,
    // Attendances
    showAttendances,
    setShowAttendances,
  };
  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
