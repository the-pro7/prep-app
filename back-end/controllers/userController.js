const asyncHandler = require('../middleware/asyncHandler')
const Request = require('../models/requestModel')
const User = require('../models/userModel')
const createToken = require('../utilities/createToken')
const determineSignInStatus = require('../utilities/determineUserStatus')
const { genSalt, hash, compare } = require('bcrypt')

// @route /api/users/register
// @access PUBLIC
// @desc Create a new user
const createNewUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, isAdmin } = req.body

  if (!name || !email || !password)
    res.status(422).json({ message: 'Invalid credentials' })

  // Check of user exists already
  const userAvailable = await User.findOne({ email })

  //   Report user availability
  if (userAvailable)
    res.status(401).json({ message: 'User already exists, check email' })

  // Create a new user if user does not exist
  let salt = await genSalt(10)
  let hashedPassword = await hash(password, salt)
  const newUser = await new User({
    name,
    email,
    password: hashedPassword,
    isAdmin
  })

  try {
    await newUser.save()
    createToken(res, newUser._id, newUser.name, newUser.email, newUser.isAdmin)
    res.status(201).json({ message: 'User created', success: true })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// @route /api/users/login
// @access PUBLIC
// @desc Login a user
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password)
    res
      .status(422)
      .json({ message: 'Invalid credentials, check your credentials' })

  try {
    // Check if user if is available
    const userAvailable = await User.findOne({ email })

    // Throw error if user does not exists
    if (!userAvailable)
      res
        .status(404)
        .json({ message: 'Could not find user with the provided credentials' })

    // Update user details
    let signInTime = new Date().toLocaleString('en', {
      hour: '2-digit',
      minute: '2-digit'
    })

    if (await compare(password, userAvailable.password)) {
      const lastSignInTime = Date.now()
      let referenceTime = new Date().setHours(19, 30, 0)
      // Update the user's last signed in time
      userAvailable.lastSignInTime = signInTime
      // Determine sign in status
      let signInStatus = determineSignInStatus(lastSignInTime, referenceTime)

      // Initialize logBarDetails if undefined
      if (!userAvailable.logBarDetails) {
        userAvailable.logBarDetails = []
      }

      userAvailable.signInStatus = signInStatus
      const newLog = {
        name: userAvailable?.name,
        signTime: userAvailable?.lastSignInTime,
        status: userAvailable?.signInStatus,
        day: userAvailable?.daySignIn
      }
      userAvailable.logBarDetails.unshift(newLog)

      await userAvailable.save()
      //   Create a token for signed in user
      let token = createToken(
        res,
        userAvailable._id,
        userAvailable.name,
        userAvailable.email,
        userAvailable.isAdmin
      )
      // Send the final user over to the client app

      res.status(200).json({
        user: {
          _id: userAvailable?._id,
          daySign: userAvailable?.daySignIn,
          email: userAvailable?.email,
          isAdmin: userAvailable?.isAdmin,
          lastSignInTime: userAvailable?.lastSignInTime,
          logBarDetails: userAvailable?.logBarDetails,
          name: userAvailable?.name,
          requests: userAvailable?.requests,
          signInStatus: userAvailable?.signInStatus
        },
        token
      })
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message })
  }
})

// @route /api/users/logout
// @access PRIVATE
// @desc Login a user
const logoutUser = asyncHandler(async (req, res, next) => {
  res.cookie('jwt', '', {
    secure: true,
    httpOnly: true,
    sameSite: 'strict'
    // maxAge: 24 * 30 * 60 * 60
  })

  res.status(204).send('User deleted')
  //   res.redirect("/signup", 204)
})

// @route /api/users/new-request/:id
// @access PRIVATE
// @desc Add user request
const postNewRequest = asyncHandler(async (req, res, next) => {
  if (!req.user && req.params.id) {
    next(res.status(404).json({ message: 'Cannot find user' }))
  }

  //  Confirm user with id
  const userAvailable = await User.findById(req.params?.id)

  const { userClass, hostel, hostelTutor, hostelPrefect, issue } = req.body

  if (!userClass || !hostel || !hostelTutor || !hostelPrefect || !issue) {
    res.status(422).json({ message: 'All fields are required, try again' })
  }

  const newRequest = await new Request({
    userClass,
    hostel,
    hostelPrefect,
    hostelTutor,
    issue
  })

  try {
    if (userAvailable) {
      // console.log('User available!!')
      userAvailable?.requests.unshift(newRequest)
    }
    // Save new request
    await newRequest.save()
    // save updated user
    await userAvailable.save()
    // Send response to user
    res.status(200).json({
      message: 'Added your new request',
      success: true
    })
    // Handle next middleware
    next()
  } catch (error) {
    res.status(500).json({ message: 'Server failed to do its work!!' })
  }
})

// @route /api/users/all-requests/:id
// @access PRIVATE
// @desc Get all user's requests based on their ID
const getAllRequests = asyncHandler(async (req, res, next) => {
  if (!req.user && !req.params?.id) {
    next(res.status(404).json({ message: 'User not found, try again!' }))
  }
  // Find user with the provided ID
  const userAvailable = await User.findById(req.params?.id)

  try {
    if (userAvailable) {
      // exclude these fields except the requests field
      // 0 indicates exclude and 1 indicates include
      let projection = {
        _id: 0,
        name: 0,
        email: 0,
        lastSignInTime: 0,
        logBarDetails: 0,
        password: 0,
        avatar: 0,
        signInStatus: 0,
        daySignIn: 0,
        isAdmin: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0
      }
      // New find a user with the available user's id and get the requests property only by passing in the projection
      let requests = await User.find({ _id: userAvailable?._id }, projection)
      res.status(200).json(requests)
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// @route /api/users/log-details
// @access PRIVATE
// @desc Get all log details and names of users / students
const getAllLogDetails = asyncHandler(async (req, res, next) => {
  if (!req.user && !req.user?.isAdmin) {
    next(
      res
        .status(401)
        .json({ message: 'You are not allowed to perform this action' })
    )
  }

  try {
    // Exclude certain properties
    // let projection = {
    //   _id: 0,
    //   requests: 0,
    //   password: 0,
    //   avatar: 0,
    //   email: 0,
    //   logBarDetails: 0,
    //   isAdmin: 0,
    //   createdAt: 0,
    //   updatedAt: 0,
    //   name: 0,
    //   daySignIn: 0,
    //   lastSignInTime: 0,
    //   signInStatus: 0,
    //   __v: 0,
    // }
    // Include exclusion projection
    let allUsers = await User.find({}).select("-password")


    next(res.status(200).json(allUsers))
  } catch (error) {
    res
      .status(500)
      .json({ message: `Something went wrong on our end ${error.message}` })
  }
})

/* =============== NOTE =============== */
// The "?." is called the optional chaining operator, which was included in JS recently
// It helps to prevent error messages when the property being chained does not exist

module.exports = {
  createNewUser,
  loginUser,
  logoutUser,
  postNewRequest,
  getAllRequests,
  getAllLogDetails
}
