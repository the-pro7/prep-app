"use strict";

var _require = require('express'),
    Router = _require.Router;

var _require2 = require('../controllers/userController'),
    createNewUser = _require2.createNewUser,
    loginUser = _require2.loginUser,
    logoutUser = _require2.logoutUser,
    postNewRequest = _require2.postNewRequest,
    getAllRequests = _require2.getAllRequests,
    getAllLogDetails = _require2.getAllLogDetails,
    getAllStudentRequests = _require2.getAllStudentRequests;

var _require3 = require('../middleware/authMiddleware'),
    authenticate = _require3.authenticate,
    authorizeAdmin = _require3.authorizeAdmin;

var router = Router(); // Post a user / create a user

router.post('/register', createNewUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser); // Request routes

router.post('/new-request/:id', authenticate, postNewRequest);
router.get('/all-requests/:id', authenticate, getAllRequests); // Grab all time log details of users

router.get('/log-details', authenticate, authorizeAdmin, getAllLogDetails); // Grab all student requests

router.get('/all-requests', authenticate, authorizeAdmin, getAllStudentRequests);
module.exports = router;