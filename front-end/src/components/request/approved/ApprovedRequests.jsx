import React from 'react'
import ApprovedBox from "./ApprovedBox"

const ApprovedRequests = ({requests}) => {
  return (
    <div>
        <h4>Approved</h4>
        <ul>
          {requests.length === 0 ? <p>sdsds</p> : requests.map(request => (
            <ApprovedBox name={request?.name} requestBody={request?.issue} key={request?._id}/>
          ))}
        </ul>
    </div>
  )
}

export default ApprovedRequests