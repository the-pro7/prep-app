import { faCross } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const ApprovedBox = () => {
  return (
    <li>
      <img src="#" alt="" />
      <div className="request-content">
        <h4>John Doe</h4>
        <summary>Lorem ipsum dolor sit amend consectetur?</summary>
      </div>
      <div className="request-ctas">
        <button className='approve'>
          <FontAwesomeIcon icon={""}/>
        </button>
        <button className='unapprove'>
          <FontAwesomeIcon icon={faCross}/>
        </button>
      </div>
    </li>
  )
}

export default ApprovedBox