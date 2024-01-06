const {model} = require("mongoose")
const {Schema} = require("mongoose")

const requestSchema = new Schema({
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
        required: false,
        default: false
    }
}, {
    timestamps: true
})

const Request = model("Request", requestSchema)
module.exports = Request