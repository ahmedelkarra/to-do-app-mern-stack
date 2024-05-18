const express = require('express')
const app = express()
const mongoose = require('mongoose')
const schema = require('../models/toDoInfo')
const tank = mongoose.model('InfoToDo', schema)
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const validationInfo = app.use(async (req, res, next) => {
    const { email, pass } = req.body
    const user = await tank.findOne({ email })
    if (!user) { res.status(400).send('Wrong Email Or Passowrd') }
    if (user) {
        const getAllInfo = await tank.findOne({ email }).select("pass").select('email')
        const statuse = bcrypt.compareSync(pass, getAllInfo.pass)
        getAllInfo.pass = undefined
        if (statuse) {
            const TOKEN = jwt.sign({ getAllInfo }, process.env.SECRET_KEY, { expiresIn: '1h' })
            req.token = TOKEN
            jwt.verify(TOKEN, process.env.SECRET_KEY)
            next()
        }
        if (!statuse) { res.status(404).send('Wrong Email Or Passowrd') }
    }
})



module.exports = validationInfo