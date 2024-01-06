const jwt = require('jsonwebtoken')
const asyncHandler = require('./asyncHandler')

const authenticate = asyncHandler(async (req, res, next) => {
  let authorizationHeader =
    req.headers.Authorization || req.headers.authorization
  let storedToken = req.cookies?.jwt

  // Get token from Authorization header
  let token = authorizationHeader
    ? authorizationHeader.split(' ')[1]
    : storedToken

  if (!token) {
    return res.status(404).json({ message: 'Token missing, try again' })
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, info) => {
    if (error) {
      return res
        .status(401)
        .json({ message: 'Failed to validate token', error: error.message })
    }

    req.user = info
    next()
  })
})

const authorizeAdmin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next()
  }

  res.status(401).json({ message: 'Only admins can perform this operation' })
})

module.exports = { authenticate, authorizeAdmin }
