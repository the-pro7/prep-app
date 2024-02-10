const asyncHandler = require("../middleware/asyncHandler");
const Request = require("../models/requestModel");
const User = require("../models/userModel");
const createToken = require("../utilities/createToken");
const determineSignInStatus = require("../utilities/determineUserStatus");
const { genSalt, hash, compare } = require("bcrypt");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Google signup
passport.use(
  new GoogleStrategy(
    {
      clientID: "",
      clientSecret: "",
      callbackURL: "auth/google/callback",
    },
    function (accessToken, refrechToken, profile, done) {
      User.findOne({ googleId: profile.id }, async (error, existingUser) => {
        if (err) return done(error, false);

        // Check if user exists and rerturn user
        if (existingUser) {
          return done(null, existingUser);
        } else {
          // Create a new user
          const newUser = new User({
            name: profile.name,
            email: profile.emails[0].value,
            googleId: profile.id
          })

          await newUser.save((error) => {
              if (error) return done(error, null)

              // Saved user successfully
              return done(null, newUser)
          })
        }
      });
    }
  )
);

const googleSignUp = () => {};

// @route /api/users/register
// @access PUBLIC
// @desc Create a new user
const createNewUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, isAdmin } = req.body;

  if (!name || !email || !password)
    res.status(422).json({ message: "Invalid credentials" });

  // Check of user exists already
  const userAvailable = await User.findOne({ email });

  //   Report user availability
  if (userAvailable)
    res.status(401).json({ message: "User already exists, check email" });

  // Create a new user if user does not exist
  let salt = await genSalt(10);
  let hashedPassword = await hash(password, salt);
  const newUser = await new User({
    name,
    email,
    password: hashedPassword,
    isAdmin,
  });

  try {
    await newUser.save();
    createToken(res, newUser._id, newUser.name, newUser.email, newUser.isAdmin);
    res.status(201).json({ message: "User created", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route /api/users/login
// @access PUBLIC
// @desc Login a user
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    res
      .status(422)
      .json({ message: "Invalid credentials, check your credentials" });

  try {
    // Check if user if is available
    const userAvailable = await User.findOne({ email });

    // Throw error if user does not exists
    if (!userAvailable) {
      res
        .status(404)
        .json({ message: "Could not find user with the provided credentials" });
    }

    // Update user details
    // Get user sign in time e.g 7:00 PM
    let signInTime = new Date().toLocaleString("en", {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Get day
    let daySign = new Date().toLocaleString("en", { weekday: "long" });

    // Compare the in coming password with the hashed password in the database
    if (await compare(password, userAvailable.password)) {
      const lastSignInTime = Date.now();
      // Create a reference time to determine user sign status
      let referenceTime = new Date().setHours(19, 30, 0);
      // Update the user's last signed in time
      userAvailable.lastSignInTime = signInTime;
      // Determine sign in status
      let signInStatus = determineSignInStatus(lastSignInTime, referenceTime);

      // Add a signed in day for the user
      userAvailable.daySignIn = daySign;

      // Initialize logBarDetails if undefined in the database
      if (!userAvailable.logBarDetails) {
        userAvailable.logBarDetails = [];
      }

      userAvailable.signInStatus = signInStatus;
      // New log for log bar on frontend which contains all the time logs of the users / students
      const newLog = {
        name: userAvailable?.name,
        signTime: userAvailable?.lastSignInTime,
        status: userAvailable?.signInStatus,
        day: userAvailable?.daySignIn,
      };
      // Prepend the newLog to the logBarDetails array in the database
      userAvailable.logBarDetails.unshift(newLog);

      // Save the user
      await userAvailable.save();
      //   Create a token for signed in user
      let token = createToken(
        res,
        userAvailable._id,
        userAvailable.name,
        userAvailable.email,
        userAvailable.isAdmin
      );

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
          signInStatus: userAvailable?.signInStatus,
        },
        // Send their auth token too, this will be needed
        token,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// @route /api/users/logout
// @access PRIVATE
// @desc Logout a user
const logoutUser = asyncHandler(async (req, res, next) => {
  res.cookie("jwt", "", {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
    // maxAge: 24 * 30 * 60 * 60
  });

  res.status(204).json({ message: "User deleted" });
  //   res.redirect("/signup", 204)
});

// @route /api/users/new-request/:id
// @access PRIVATE
// @desc Add user request
const postNewRequest = asyncHandler(async (req, res, next) => {
  if (!req.user && req.params.id) {
    next(res.status(404).json({ message: "Cannot find user" }));
  }

  //  Confirm user with id
  const userAvailable = await User.findById(req.params?.id);

  const { userClass, hostel, hostelTutor, hostelPrefect, issue } = req.body;

  if (!userClass || !hostel || !hostelTutor || !hostelPrefect || !issue) {
    res.status(422).json({ message: "All fields are required, try again" });
  }

  const newRequest = await new Request({
    name: userAvailable?.name,
    userClass,
    hostel,
    hostelPrefect,
    hostelTutor,
    issue,
  });

  try {
    if (userAvailable) {
      // console.log('User available!!')
      userAvailable?.requests.unshift(newRequest);
    }
    // Save new request
    await newRequest.save();
    // save updated user
    await userAvailable.save();
    // Send response to user
    res.status(200).json({
      message: "Added your new request",
      success: true,
    });
    // Handle next middleware
    next();
  } catch (error) {
    res.status(500).json({ message: "Server failed to do its work!!" });
  }
});

// @route /api/users/all-requests/:id
// @access PRIVATE
// @desc Get all user's requests based on their ID
const getAllRequests = asyncHandler(async (req, res, next) => {
  // Check if user exists and has a valid id passed in the URL
  if (!req.user && !req.params?.id) {
    next(res.status(404).json({ message: "User not found, try again!" }));
  }
  // Find user with the provided ID
  const userAvailable = await User.findById(req.params?.id);

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
        __v: 0,
      };
      // New find a user with the available user's id and get only the requests property  by passing in the projection
      let requests = await User.find({ _id: userAvailable?._id }, projection);
      next(res.status(200).json(requests));
    }
  } catch (error) {
    // Show a server error with the error's message
    next(res.status(500).json({ message: error.message }));
  }
});

// @route /api/users/all-requests
// @access PRIVATE
// @desc Get all student requests
// Get all user requests as admin
const getAllStudentRequests = asyncHandler(async (req, res, next) => {
  // Check if user exists and is an admin user as well
  if (!req.user && req.user?.isAdmin) {
    next(res.status(401).json("User does not exist or is not an admin"));
  }

  try {
    let allRequests = await Request.find({});
    res.status(200).json(allRequests);
  } catch (error) {
    res.status(500).json({ message: `Sever had an error: ${error}` });
  }
});

// @route /api/users/log-details
// @access PRIVATE
// @desc Get all log details and names of users / students
const getAllLogDetails = asyncHandler(async (req, res, next) => {
  // Check if user exists and is an admin user as well
  if (!req.user && !req.user?.isAdmin) {
    next(
      res
        .status(401)
        .json({ message: "You are not allowed to perform this action" })
    );
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
    let allUsers = await User.find({}).select("-password");

    next(res.status(200).json(allUsers));
  } catch (error) {
    res
      .status(500)
      .json({ message: `Something went wrong on our end ${error.message}` });
  }
});

// @route /api/users/approve-request
// @access PRIVATE
// @desc Approve a request based on Id
const approveRequest = asyncHandler(async (req, res, next) => {
  if (!req.user && !req.user.isAdmin) {
    next(
      res
        .status(401)
        .json({ message: "You are not allowed to perform this action" })
    );
  }

  // Find request with provided ID
  let requestAvailable = await Request.findById(req.params.id);

  try {
    if (requestAvailable) {
      requestAvailable.approved = true;
      await requestAvailable.save();
      res.status(200).json({ message: "Request approved" });
    } else {
      res.status(404).json({ message: "Request not found, try again" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server encountered a problem", error: error.message });
  }
});
/* =============== NOTE =============== */
// The "?." is called the optional chaining operator, which was included in JS recently
// It helps to prevent error messages when the property being chained does not exist

// Export the controller's to be used in the userRoutes.js file
module.exports = {
  createNewUser,
  loginUser,
  logoutUser,
  postNewRequest,
  getAllRequests,
  getAllLogDetails,
  getAllStudentRequests,
  approveRequest,
  googleSignUp,
};
