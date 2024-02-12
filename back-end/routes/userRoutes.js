const { Router } = require("express");
// Grab the controllers from the userController.js file
const {
  createNewUser,
  loginUser,
  updateUserProfile,
  updateUserProfileImage,
  logoutUser,
  postNewRequest,
  getAllRequests,
  getAllLogDetails,
  getAllStudentRequests,
  approveRequest,
  googleSignIn,
  googleSignInCallBack,
} = require("../controllers/userController");

// Grab authentication and admin authorization files from the authMiddleware.js file
const {
  authenticate,
  authorizeAdmin,
} = require("../middleware/authMiddleware");
// Call the Router function from express
const router = Router();

// ================ PUBLIC ROUTES ==================
// Post a user / create a user
router.post("/register", createNewUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

// Update user profile
router.put("/update-profile", authenticate, updateUserProfile);
router.put("/update-profile-image", authenticate, updateUserProfileImage);

// Google signup route
router.post("auth/google", googleSignIn);
router.post("auth/google/callback", googleSignInCallBack);

// Request routes
router.post("/new-request/:id", authenticate, postNewRequest);
router.get("/all-requests/:id", authenticate, getAllRequests);

// =================== PRIVATE ROUTES ===================
// These routes require user's to be authenticated with A JSON Web Token (JWT) and also should be an admin user
// Route to approve user requests as admin user
router.post(
  "/approve-request/:id",
  authenticate,
  authorizeAdmin,
  approveRequest
);

// Grab all time log details of users as admin user
router.get("/log-details", authenticate, authorizeAdmin, getAllLogDetails);

// Grab all student requests as admin user
router.get(
  "/all-requests",
  authenticate,
  authorizeAdmin,
  getAllStudentRequests
);

// Export router to server.js
module.exports = router;
