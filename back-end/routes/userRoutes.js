const { Router } = require('express')
// Grab the controllers from the userController.js file 
const {
  createNewUser,
  loginUser,
  logoutUser,
  postNewRequest,
  getAllRequests,
  getAllLogDetails,
  getAllStudentRequests,
  approveRequest,
  googleSignUp
} = require('../controllers/userController')
// Grab authentication and admin authorization files from the authMiddleware.js file
const { authenticate, authorizeAdmin } = require('../middleware/authMiddleware')
// Call the Router function from express
const router = Router()

// ============= PUBLIC ROUTES ==============
// Post a user / create a user
router.post('/register', createNewUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)

// Google signup route
router.post("auth/google/callback", googleSignUp)

// Request routes
router.post('/new-request/:id', authenticate, postNewRequest)
router.get('/all-requests/:id', authenticate, getAllRequests)

// =================== PRIVATE ROUTES ===================
// These routes require user's to be authenticated with A JSON Web Token (JWT) and also should be an admin user
// Route to approve user requests
router.post(
  '/approve-request/:id',
  authenticate,
  authorizeAdmin,
  approveRequest
)

// Grab all time log details of users
router.get('/log-details', authenticate, authorizeAdmin, getAllLogDetails)

// Grab all student requests
router.get('/all-requests', authenticate, authorizeAdmin, getAllStudentRequests)

// Export router to server.js
module.exports = router
