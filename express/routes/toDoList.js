const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const schema = require('../models/toDoInfo')
const tank = mongoose.model('InfoToDo', schema)
const jwt = require('jsonwebtoken')
require('dotenv').config()


router.get('/', async (req, res, next) => {
    const getToken = req.headers.authorization
    if (getToken) {
        try {
            const user = jwt.verify(getToken, process.env.SECRET_KEY)
            const { _id } = user.getAllInfo
            const toDo = await tank.findById(_id)
            res.status(200).send([toDo, { isActive: true }])
            // console.log(toDo.toDo)
        } catch (error) {
            console.log(error);
            res.status(401).send(`${error}`)
        }
    } else {
        res.status(200).send([])
    }
})

router.post('/', async (req, res) => {
    const getToken = req.headers.authorization
    try {
        const user = jwt.verify(getToken, process.env.SECRET_KEY)
        const { _id } = user.getAllInfo
        const { toDo } = await tank.findById(_id)
        const taskInputValues = req.body
        const pushToDo = [...toDo]
        pushToDo.push(taskInputValues)
        await tank.findByIdAndUpdate(_id, { toDo: pushToDo })
        res.status(200).send(pushToDo)
        console.log(taskInputValues)
    } catch (error) {
        console.log(error);
        res.status(401).send(`${error}`)
    }
})


router.patch('/', (req, res) => {
    console.log(req.body);
    res.status(200).send('To Do Has Been Updated')
})

router.delete('/', async (req, res) => {
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