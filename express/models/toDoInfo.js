const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {
        FName: {
            type: String,
            required: true,
        },
        LName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        pass: {
            type: String,
            required: true,
            select: false,
        },
        toDo: {
            type: Array,
            task: {
                type: String,
                unique: true,
            },
            isFavorite: Boolean,
            isDone: Boolean,
            taskId: Number,
        }
    },
)


module.exports = schema