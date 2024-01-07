"use strict";

var _require = require("mongoose"),
    model = _require.model;

var _require2 = require("mongoose"),
    Schema = _require2.Schema;

var requestSchema = new Schema({
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
    "default": false
  }
}, {
  timestamps: true
});
var Request = model("Request", requestSchema);
module.exports = Request;