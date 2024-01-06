const express = require('express')
const connectDb = require('./config/connectDB')
const cors = require("cors")
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

// Connect to MongoDB
connectDb(process.env.CONNECTION_STRING, port, app)

// Middleware from express.js
app.use(cors({origin: "http://localhost:5173", credentials: true, optionsSuccessStatus: 200}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.options('/api/users', cors())

// Routes
const userRoutes = require("./routes/userRoutes")
app.use('/api/users', userRoutes)
