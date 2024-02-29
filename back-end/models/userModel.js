// Get mongoose, a MongoDB helper from the package.json file
const mongoose = require('mongoose')

// This a schema or structure for how every user should look like
// A type of string tells MongoDB that the data passed in should be enclosed in ""
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: [true, 'Email already taken']
    },
    password: {
      type: String,
      required: true
    },
    hobby: {
      type: String,
      required: false
    },
    favouriteSubject: {
      type: String,
      required: false
    },
    googleId: {
      type: String
    },
    avatar: {
      type: String,
      required: false
    },
    // The  [mongoose.Schema.Types.Mixed] tells MongoDB that the property would hold an array of different JS data types
    requests: {
      type: [mongoose.Schema.Types.Mixed],
      required: false,
      // A default of an empty array since user's should start with an empty array of requests
      default: [],
    },
    daySignIn: {
      type: String,
      required: false,
    },
    logBarDetails: {
      type: [mongoose.Schema.Types.Mixed],
      required: false,
      // A default of an empty array since user's should start with an empty array of requests
      default: []
    },
    signInStatus: {
      type: String,
      required: false
    },
    lastSignInTime: {
      type: String,
      required: false
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

module.exports = User
