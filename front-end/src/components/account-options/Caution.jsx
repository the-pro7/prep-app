import React from 'react'
import devImage from '../../assets/error-images/devmode.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

const Caution = () => {
  let cautionStyles = {
    outline: '2px solid #ff9494',
    width: '80%',
    maxWidth: "700px",
    margin: '0 auto',
    padding: '1.5em',
    borderRadius: '1rem',
    backgroundColor: "#FCB2B2"
  }
  return (
    <div className='app-caution' style={cautionStyles}>
      <h3>
        <FontAwesomeIcon
          icon={faTriangleExclamation}
          style={{ fontSize: '1.5rem', marginRight: ".3em" }}
        />
        Caution
      </h3>
      This app is in <b>BETA</b> mode, i.e it is still undergoing development,
      some elements may not function, since they have not been provided with the
      necessary logic. A common example is the notifications. But expect the best experience though!
    </div>
  )
}

export default Caution
