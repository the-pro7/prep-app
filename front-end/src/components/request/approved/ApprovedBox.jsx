import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const ApprovedBox = ({name, requestBody, avatar}) => {
  return (
    <li className='request-box' style={{display: "flex", gap: "1em"}}>
      <div className="avatar">
      <img src="#" alt="" />
      </div>
      <div className="request-content">
        <h4>{name}</h4>
        <summary>{requestBody}</summary>
      </div>
    </li>
  )
}

export default ApprovedBox