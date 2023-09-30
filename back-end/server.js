require("dotenv").config()

const express = require('express')
const attendance_routes = require('./routes/prep_attendace')

const app = express()

app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use("/api/attendance", attendance_routes)

app.listen(process.env.PORT,() => {
    console.log("listening on port", process.env.PORT)
})

