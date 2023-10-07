import React from 'react'

const NotFound = () => {
    const styles = {
        height: "100dvh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center"
    }

    const headerStyles = {
        fontSize: "10rem"
    }
  return (
    <div style={styles}>
        <h1 style={headerStyles}>404</h1>
        <p style={{fontSize: "2rem"}}>Cannot find the page you're looking for
        </p>
    </div>
  )
}

export default NotFound