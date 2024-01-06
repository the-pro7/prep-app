const mongoose = require('mongoose')

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
    avatar: {
      type: String,
      required: false
    },
    requests: {
      type: [mongoose.Schema.Types.Mixed],
      required: false,
      default: []
    },
    daySignIn: {
      type: String,
      required: false,
      default: new Date().toLocaleString('en', { weekday: 'long' })
    },
    logBarDetails: {
      type: [mongoose.Schema.Types.Mixed],
      required: false
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
