const asyncHandler = require('../middleware/asyncHandler')
const Request = require('../models/requestModel')
const User = require('../models/userModel')

const postNewRequest = asyncHandler(async (req, res, next) => {
  if (!req.user && req.params.id) {
     res.status(401).send("Cannot find user")
  }
 
})

// Get all requests
const getAllRequests = asyncHandler(async (req, res, next) => {
  try {
    let allRequests = await Request.find()
    res.status(200).json({ length: allRequests.length, data: allRequests })
  } catch (error) {
    res.status(500).json({ message: 'Server failed to do its work!!' })
  }
})

module.exports = { postNewRequest, getAllRequests }
