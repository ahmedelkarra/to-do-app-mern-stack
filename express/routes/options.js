const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const schema = require('../models/toDoInfo')
const tank = mongoose.model('InfoToDo', schema)
const jwt = require('jsonwebtoken')

router.patch('/:id', async (req, res) => {
    const getToken = req.headers.authorization
    if (getToken) {
        try {
            const user = jwt.verify(getToken, process.env.SECRET_KEY)
            const { _id } = user.getAllInfo
            const userInfo = await tank.findById(_id)
            const getCoppyInfo = [...userInfo.toDo]
            const getBodyInfo = req.body
            const setInfo = getCoppyInfo.map((ele) => {
                switch (getBodyInfo.type) {
                    case `task`:
                        return ele.taskId == req.params.id ? { ...ele, task: getBodyInfo.changeTask } : ele
                    case 'isDone':
                        return ele.taskId == req.params.id ? { ...ele, isDone: getBodyInfo.isDone } : ele
                    default:
                        break;
                }
            })

            await tank.findByIdAndUpdate(_id, { toDo: setInfo })
            res.status(200).send(userInfo)
        } catch (error) {
            console.log(error);
            res.status(401).send(`${error}`)
        }
    } else {
        res.status(200).send([])
    }
})


router.delete('/:id', async (req, res) => {
    const getToken = req.headers.authorization
    if (getToken) {
        try {
            const user = jwt.verify(getToken, process.env.SECRET_KEY)
            const { _id } = user.getAllInfo
            const userInfo = await tank.findById(_id)
            const getCoppyInfo = [...userInfo.toDo]
            const getBodyInfo = req.body
            let getUpdatedData = []
            for (let i = 0; i < getCoppyInfo.length; i++) {
                if (getCoppyInfo[i].taskId == req.params.id) {
                    continue
                } else {
                    getUpdatedData.push(getCoppyInfo[i])
                }
            }
            await tank.findByIdAndUpdate(_id, { toDo: getUpdatedData })
            res.status(200).send(userInfo)
        } catch (error) {
            console.log(error);
            res.status(401).send(`${error}`)
        }
    } else {
        res.status(200).send([])
    }
})

module.exports = router