import React, { useContext, useEffect, useState } from 'react'

const RoleContext = React.createContext()

// Available roles
// Exporting roles, in order to make them accessible throughout the whole application
export const AVAILABLE_ROLES = {
  ROLE_STUDENT: 'student',
  ROLE_HOSTEL_TUTOR_PREFECT: 'hostel-tutor-prefect',
  ROLE_PREP_ADMIN: 'prep-admin'
}

export const useSelection = () => useContext(RoleContext)

const RoleProvder = ({ children }) => {
  // Put the current selection to the user's local storage so that it can later be retrieved even across page reloads
  useEffect(() => {
    localStorage.setItem('role', AVAILABLE_ROLES.ROLE_STUDENT)

    return () => {
      localStorage.removeItem('role');
    }
  }, [])
  // Creating the selection state, using the useState() hook from react, and defaulting it to a student
  const [currentlySelected, setCurrentlySelected] = useState(
    AVAILABLE_ROLES.ROLE_STUDENT
  )

  // Function to update role selection based on the currently selected role
  const updateSelection = newSelection => setCurrentlySelected(newSelection)
  // Sending an object of the value dependencies needed within the created context above i.e using
  //  the React.createContext() above
  const values = {
    currentlySelected,
    updateSelection
  }
  return (
    // Wrapping all the possible components(children)
    // in the role context provider, which will allows us to access the current selection and the abilityu to update the selection throughout the application.
    <RoleContext.Provider value={values}>{children}</RoleContext.Provider>
  )
}

export default RoleProvder
