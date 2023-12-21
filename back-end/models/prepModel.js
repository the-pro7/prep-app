const mongoose = require('mongoose');

const Schema = mongoose.Schema

const prepSchema = Schema({
    name: {
        type : String,
        required:[true,'Name is required']
    },
    timeLoggedIn: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Attendance', prepSchema)