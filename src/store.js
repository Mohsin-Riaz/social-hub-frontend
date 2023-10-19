import { configureStore } from '@reduxjs/toolkit'
import postReducer from './features/post/postSlice.js'
import userReducer from './features/user/userSlice.js'
export const store = configureStore({
    reducer: {
        user: userReducer,
        post: postReducer,
    },
})
