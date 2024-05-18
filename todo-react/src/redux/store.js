import { configureStore } from '@reduxjs/toolkit'
import toDoApp from './reducer/toDoApp'

export default configureStore({
    reducer: {
        toDoApp,
    },
})