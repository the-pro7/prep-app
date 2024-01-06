const { Router } = require('express')
const {
  createNewUser,
  loginUser,
  logoutUser,
  postNewRequest,
  getAllRequests,
  getAllLogDetails
} = require('../controllers/userController')
const { authenticate, authorizeAdmin } = require('../middleware/authMiddleware')
const router = Router()

// Post a user / create a user
router.post('/register', createNewUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)

// Request routes
router.post('/new-request/:id', authenticate, postNewRequest)
router.get('/all-requests/:id', authenticate, getAllRequests)

// Grab all time log details of users
router.get('/log-details', authenticate, authorizeAdmin, getAllLogDetails)

module.exports = router
