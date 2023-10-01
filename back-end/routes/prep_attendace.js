const express = require("express")
const Attendance = require("../models/prepModel")

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
router.post('/', async (req ,res)=>{
    const {name} = req.body

    try{
        const attendace = await Attendance.create({name})
        res.status(200).json(attendace)
    } catch(err){
        res.status(400).json({msg: err.message})
    }

})


module.exports = router