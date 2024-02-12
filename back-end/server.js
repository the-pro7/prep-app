const express = require("express");
const connectDb = require("./config/connectDB");
// Import dependency or package for  Cross-Origin-Resource-Sharing (CORS)
const cors = require("cors");
// Get fule upload dependency
const upload = require("express-fileupload");
// Take the dotenv file from the package.json and configure it to be apple to use "process.env"
require("dotenv").config();
const path = require("path");

// Initialize the app by calling the express function/method
const app = express();
// Grab the port to listen to requests from from the .env file or default to 5000
const port = process.env.PORT || 5000;

// Connect to MongoDB using the connectDb function and pass in the necessary arguments
connectDb(process.env.CONNECTION_STRING, port, app);

// Middleware from express.js
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
// Allows express to use json data
app.use(express.json());
// Allows express to take and use data from form inputs from the frontend
app.use(express.urlencoded({ extended: true }));
// Set the path for Cross-Origin-Resource-Sharing (CORS)
app.options("/api/users", cors());
// Use upload
app.use(upload());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes for api
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);
