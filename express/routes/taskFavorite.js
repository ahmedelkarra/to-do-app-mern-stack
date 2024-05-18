const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const schema = require('../models/toDoInfo')
const tank = mongoose.model('InfoToDo', schema)
const jwt = require('jsonwebtoken')


router.get('/favorite', async (req, res, next) => {
    const getToken = req.headers.authorization
    if (getToken) {
        try {
            const user = jwt.verify(getToken, process.env.SECRET_KEY)
            const { _id } = user.getAllInfo
            const { toDo } = await tank.findById(_id)
            const getFavorite = [...toDo]
            const filterInfo = getFavorite.filter((e) => e.isFavorite === true)
            console.log(filterInfo)
            res.status(200).send(filterInfo)
        } catch (error) {
            console.log(error);
            res.status(401).send(`${error}`)
        }
    } else {
        res.status(200).send([])
    }
})

router.post('/favorite/:id', async (req, res, next) => {
    const getToken = req.headers.authorization
    const getId = req.params.id
    if (getToken) {
        try {
            const user = jwt.verify(getToken, process.env.SECRET_KEY)
            const { _id } = user.getAllInfo
            const { toDo } = await tank.findById(_id)
            const updateToDo = [...toDo]
            const updateInfo = updateToDo.filter((e) => e.taskId == getId)
            updateInfo[0].isFavorite = req.body.isFavorite
            const setInfo = await tank.findByIdAndUpdate(_id, { toDo: updateToDo })
            res.status(200).send([toDo, { isActive: true }])
        } catch (error) {
            console.log(error);
            res.status(401).send(`${error}`)
        }
    } else {
        res.status(200).send([])
    }
})


module.exports = router