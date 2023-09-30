const express = require("express")

const router = express.Router()

// get all attendance
router.get('/', (req, res) => {
    res.json({mssg: 'Get total attendance'})
})

//get single attendance 
router.get('/:id', (req, res) => {
    res.json({mssg: 'Get single attendance'})
})

// Post attendace
router.post('/', (req ,res)=>{
    res.json({mssg: 'Post single attendance'})
})


module.exports = router