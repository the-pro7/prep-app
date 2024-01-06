import React from 'react'
import requestIcon from '../../assets/loop.svg'

const RequestIem = ({ header, summary, time }) => {
  const rawTime = new Date(time)
  const formattedTime = Intl.DateTimeFormat('en-GB')?.format(rawTime)
  return (
    <li className='request-item'>
      <img src={requestIcon} alt="Doesn't really matter" />
      <div>
        <h3>Request {header}</h3>
        <summary>
          {summary.length > 50 ? summary.substr(0, 50) + '...' : summary}
        </summary>
      </div>
      <div className='created-at'>
        Created: <b> {formattedTime}</b>
      </div>
    </li>
  )
}

export default RequestIem
