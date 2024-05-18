const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const schema = require('../models/toDoInfo')
const tank = mongoose.model('InfoToDo', schema)
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validationInfo = require('../utils/validationInfo')


router.get('/', async (req, res) => {
    const getToken = req.headers.authorization
    if (getToken) {
        try {
            const user = jwt.verify(getToken, process.env.SECRET_KEY)
            const { _id } = user.getAllInfo
            const userInfo = await tank.findById(_id)
            res.status(200).send(userInfo)
        } catch (error) {
            console.log(error);
            res.status(401).send(`${error}`)
        }
    } else {
        res.status(200).send([])
    }
})

router.patch('/:id', async (req, res) => {
    const getToken = req.headers.authorization
    try {
        const user = jwt.verify(getToken, process.env.SECRET_KEY)
        const { _id } = user.getAllInfo
        const { toDo } = await tank.findById(_id)
        const taskInputValues = req.body
        const pushToDo = [...toDo]
        pushToDo.push(taskInputValues)
        await tank.findByIdAndUpdate(_id, { FName: taskInputValues.FName })
        res.status(200).send(pushToDo)
        console.log(taskInputValues)
    } catch (error) {
        console.log(error);
        res.status(401).send(`${error}`)
    }
})




module.exports = router