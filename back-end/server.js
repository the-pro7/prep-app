require("dotenv").config()
const express = require('express')

const app = express()

app.get("/", (req, res) => {
    res.json({msg: 'Hello world'})
})

app.listen(process.env.PORT,() => {
    console.log("listening on port", process.env.PORT)
})

