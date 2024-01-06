import React from 'react'

const UnapprovedBox = () => {
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
      </div>
    </li>
  )
}

export default UnapprovedBox