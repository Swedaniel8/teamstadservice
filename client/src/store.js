import { configureStore } from "@reduxjs/toolkit";

import apiReducer from './slices/apiReducer'


const reducer = {
    api: apiReducer
}

const store = configureStore({
    reducer:reducer
})

export default store
