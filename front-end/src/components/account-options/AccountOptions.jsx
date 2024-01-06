// import React from 'react'
import Option from './Option'
import '../../stylesheets/AccountOptions.scss'
import { useSelection } from '../../contexts/RoleContext'
// Importing the available roles from the role context file to access the key value pairs within it
import { AVAILABLE_ROLES } from '../../contexts/RoleContext'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const AccountOptions = () => {
  const navigate = useNavigate()
  // Getting the value dependencies and destructuring them
  // from the custom hook that allows us to use the conetext within the role context
  const { currentlySelected, updateSelection } = useSelection()
  // Boolean statement to check if the user has selected a role or not
  const [roleChosen, setRoleChosen] = useState(false)

  useEffect(() => {
    setRoleChosen(true)
  }, [])

  // funtion that is called when the next button is clicked

  const handleNext = () => {
    setRoleChosen(true)
    if (roleChosen) {
      navigate('/signup')
    } else {
      console.log('An error occurred')
    }
  }

  return (
    <>
      <div className='account-wrapper'>
        {/* Account options container */}
        <div className='account-options'>
          <div className='account-options__header'>
            <h2>Please Select</h2>
            <p>Select the option that best suits your user profile</p>
          </div>
          <div className='account-options__av-options'>
            {/* Using the Option component for the different roles available*/}
            <Option
              option='Student'
              optionClassName={
                currentlySelected === AVAILABLE_ROLES.ROLE_STUDENT
                  ? 'option selected'
                  : 'option'
              }
              onOptionClicked={() => {
                updateSelection(AVAILABLE_ROLES.ROLE_STUDENT)
                localStorage.setItem('role', AVAILABLE_ROLES.ROLE_STUDENT)
              }}
            />
            <Option
              option='Hostel Tutor or Prefect'
              optionClassName={
                currentlySelected === AVAILABLE_ROLES.ROLE_HOSTEL_TUTOR_PREFECT
                  ? 'option selected'
                  : 'option'
              }
              onOptionClicked={() => {
                updateSelection(AVAILABLE_ROLES.ROLE_HOSTEL_TUTOR_PREFECT)
                localStorage.setItem(
                  'role',
                  AVAILABLE_ROLES.ROLE_HOSTEL_TUTOR_PREFECT
                )
              }}
            />
            <Option
              option='Prep Admin'
              optionClassName={
                currentlySelected === AVAILABLE_ROLES.ROLE_PREP_ADMIN
                  ? 'option selected'
                  : 'option'
              }
              onOptionClicked={() => {
                updateSelection(AVAILABLE_ROLES.ROLE_PREP_ADMIN)
                localStorage.setItem('role', AVAILABLE_ROLES.ROLE_PREP_ADMIN)
              }}
            />
          </div>
          <button className='--cta next' onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </>
  )
}

export default AccountOptions
