import React from 'react'
import NotFoundImage from '../assets/error-images/404.avif'
import { Link } from 'react-router-dom'

const NotFound = () => {
  const styles = {
    height: '100dvh',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center'
  }

  const linkStyles = {
    backgroundColor: '#59e4a8',
    textDecoration: 'none',
    padding: '.7em 4em',
    color: '#222',
    cursor: 'pointer',
    borderRadius: '.6rem'
  }

  return (
    <div style={styles}>
      <img src={NotFoundImage} alt='404 Image' style={{ width: '35%' }} />
      <p style={{ fontSize: '1.5rem' }}>
        We cannot find the page you're looking for
      </p>
      <Link style={linkStyles} to={-1}>
        Go Back
      </Link>
    </div>
  )
}

export default NotFound
