const mongoose = require('mongoose')
require('dotenv').config()


const connect = async () => {
    try {
        await mongoose.connect(process.env.CONNECT)
        console.log('DB Has Been Conected');
    } catch { (err) => console.log(err) }
}


module.exports = connect