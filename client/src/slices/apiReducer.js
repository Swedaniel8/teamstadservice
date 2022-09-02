import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { contactPost, careerPost, servicePost } from '../service/service'

export const contactPosts = createAsyncThunk(
    "post/contact",
    async(info) => {
        const res = await contactPost(info)
        return res.data
    }
)
export const careerPosts = createAsyncThunk(
    "post/careerPost",
    async(info) => {
        console.log("reducer: ",info)
        const res = await careerPost(info)
        return res.data
    }
)
export const servicePosts = createAsyncThunk(
    "post/service",
    async(info) => {
        const res = await servicePost(info)
        return res.data
    }
)



const postSlice = createSlice({
    name:"post",
    initialState: [],
    extraReducers: {
        [contactPosts.fulfilled]: (state, action) => {
            //return [...action.payload]
        },
        [careerPosts.fulfilled]: (state, action) => {
            //return [...action.payload]
        },
        [servicePosts.fulfilled]: (state, action) => {
           // return [...action.payload]
        },
        
        
    }
})

const { reducer } = postSlice

export default reducer