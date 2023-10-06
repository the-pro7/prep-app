const mongoose = require('mongoose');

const Schema = mongoose.Schema

const prepSchema = Schema({
    name: {
        type : String,
        required:[true,'Name is required']
    }
}, {timestamps: true})

module.exports = mongoose.model('Attendance', prepSchema)