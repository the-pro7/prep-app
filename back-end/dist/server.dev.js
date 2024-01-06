"use strict";

var express = require('express');

var connectDb = require('./config/connectDB');

var cors = require("cors");

require('dotenv').config();

var app = express();
var port = process.env.PORT || 5000; // Connect to MongoDB

connectDb(process.env.CONNECTION_STRING, port, app); // Middleware from express.js

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.options('/api/users', cors()); // Routes

var userRoutes = require("./routes/userRoutes");

app.use('/api/users', userRoutes);