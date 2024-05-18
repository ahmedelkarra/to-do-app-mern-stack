import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';



export const getApi = createAsyncThunk('users/fetchByIdStatus', async () => {
    let getAll = []
    await axios.get('http://192.168.178.66:4000/todo', { headers: { Authorization: localStorage.getItem('token') } })
        .then((e) => {
            // console.log(e.data)
            return (
                getAll = e.data
            )
        })
        .catch((err) => {
            return (
                console.error(err.response.data)
            )
        })
    return getAll
})


const pending = createAction(getApi.pending)
const fulfilled = createAction(getApi.fulfilled)
const rejected = createAction(getApi.rejected)

export const toDoAppSlice = createSlice({
    name: 'toDoApp',
    initialState: {
        isActive: false,
        isLoading: false,
        error: null,
        allData: [],
        exactData: {},
    },
    reducers: {
        exactData: (state, action) => {
            state.exactData = action.payload
            console.log("123 reducers");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(pending, (state, action) => {
                state.isLoading = true
                state.isActive = false
            })
            .addCase(fulfilled, (state, action) => {
                state.allData = action.payload
                state.isActive = action?.payload[1]?.isActive || false
                state.isLoading = false
            })
            .addCase(rejected, (state, action) => {
                state.isLoading = false
                state.isActive = false
            })
    },
})

// Action creators are generated for each case reducer function
export const { exactData } = toDoAppSlice.actions

export default toDoAppSlice.reducer