const jwt = require('jsonwebtoken')
const asyncHandler = require('./asyncHandler')

// Function to authenticate signed in users
const authenticate = asyncHandler(async (req, res, next) => {
  let authorizationHeader =
    req.headers.Authorization || req.headers.authorization
  let storedToken = req.cookies?.jwt

  // Get token from Authorization header
  let token = authorizationHeader
    ? authorizationHeader.split(' ')[1]
    : storedToken

    // If no token is found the throw a not found (404) status code with a message
  if (!token) {
    return res.status(404).json({ message: 'Token missing, try again' })
  }

  // This verifies the user's token by comparing it with the JWT_SECRET in the .env file
  jwt.verify(token, process.env.JWT_SECRET, (error, info) => {
    // If an error is encountered then set a validation error code (401) and send a message with the error encountered
    if (error) {
      return res
        .status(401)
        .json({ message: 'Failed to validate token', error: error.message })
    }

    // Set the request's user to the info passed in to jwt when signing a new token
    req.user = info
    // Move onto the next middleware
    next()
  })
})

// Authorize user as admin
const authorizeAdmin = asyncHandler(async (req, res, next) => {
  // If the request has a user who's an admin the go on to next activity
  if (req.user && req.user.isAdmin) {
    return next()
  }

  // Else throw a validation error with a message
  res.status(401).json({ message: 'Only admins can perform this operation' })
})

// Export the authenticate and authorize
module.exports = { authenticate, authorizeAdmin }
