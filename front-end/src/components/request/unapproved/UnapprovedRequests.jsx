import React from 'react'
import UnapprovedBox from './UnapprovedBox'

const UnapprovedRequests = ({ requests, searchQuery }) => {
  const filteredRequests = searchQuery
    ? requests.filter(request =>
        request?.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : requests
  return (
    <div>
      <h4>Unapproved</h4>
      <ul>
        {filteredRequests.length === 0 ? (
          <p>No unapproved requests match your search</p>
        ) : (
          filteredRequests.map(request => (
            <UnapprovedBox
              name={request?.name}
              requestBody={request?.issue}
              requestId={request?._id}
              approved={request?.approved}
              key={request?._id}
            />
          ))
        )}
      </ul>
    </div>
  )
}

export default UnapprovedRequests
