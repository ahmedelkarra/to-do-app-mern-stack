const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const schema = require('../models/toDoInfo')
const tank = mongoose.model('InfoToDo', schema)
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validationInfo = require('../utils/validationInfo')

require('dotenv').config()



router.post('/register', async (req, res) => {
    const { email, FName, LName, pass } = req.body
    const hash = bcrypt.hashSync(pass, 10)
    await tank.create({ email: email, FName: FName, LName: LName, pass: hash })
        .then(() => {
            console.log(req.body)
            res.status(201).send('Account Has Been Created')
        })
        .catch((err) => {
            console.log('The Email Is Already Used')
            res.status(400).send('The Email Is Already Used')
        })
})

router.post('/login', validationInfo, async (req, res) => {
    const { email, pass } = req.body
    console.log(req.token);
    res.status(200).send({ TOKEN: req.token })
})

router.patch('/update', (req, res) => {
    console.log(req.body);
    res.status(200).send('To Do Has Been Updated')
})

router.delete('/delete', async (req, res) => {
    const { id } = req.body
    await tank.findById(id)
        .then(async (e) => {
            if (e) {
                res.status(200).send('Account Has Been Deleted')
                await tank.findByIdAndDelete(id)
            } else {
                console.log(e);
                res.status(404).send('Your Id Is Wrong ')
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send('Something Went Wrong ' + err)
        })
})


module.exports = router