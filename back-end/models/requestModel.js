const {model} = require("mongoose")
const {Schema} = require("mongoose")

// A schema to set the structure of how a user's request should be like
const requestSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    userClass: {
        type: String,
        required: true
    },
    hostel: {
        type: String,
        required: true
    },
    hostelTutor: {
        type: String,
        required: true
    },
    hostelPrefect: {
        type: String,
        required: true
    },
    issue: {
        type: String,
        required: true
    },
    approved: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
})

const Request = model("Request", requestSchema)
module.exports = Request