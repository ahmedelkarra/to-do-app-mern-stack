const express = require('express')
const app = express()
const toDoApp = require('./routes/toDoList')
const form = require('./routes/form')
const taskFavorite = require('./routes/taskFavorite')
const myAccount = require('./routes/myAccount')
const options = require('./routes/options')
const connect = require('./connect')
require('dotenv').config()
const cors = require('cors')

app.use(cors())

app.use(express.json())
app.use(express.urlencoded())
connect()

app.use('/todo', toDoApp)
app.use(form)
app.use(taskFavorite)
app.use('/me', myAccount)
app.use('/options', options)

app.get('/', (req, res) => {
    res.send('<h2>Welcome To The To Do API You Have To Use Path (/todo) To Start</h2>')
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send(`Something brokeeeeeeeeeee! ${err}`)
})

app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}/`);
})
