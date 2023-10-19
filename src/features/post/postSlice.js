import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { getPost, getPostByQuery } from '../../api/post_calls'

const initialState = {
    postItems: [],
    postsLoading: true,
}

export const getPostItems = createAsyncThunk(
    'post/getPostItems',
    async (args, thunkAPI) => {
        try {
            // console.log(name);
            // console.log(thunkAPI);
            // console.log(thunkAPI.getState());
            // thunkAPI.dispatch(openModal());
            const resp = await getPostByQuery(args)
            return resp?.data ? resp.data : resp
        } catch (error) {
            return thunkAPI.rejectWithValue('something went wrong')
        }
    }
)

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        createPostSlice: (state, { payload }) => {
            // console.log(current(state))
            state.postItems.push(payload)
        },
        updatePostSlice: (state, { payload }) => {
            const keys = Object.keys(payload)
            const postItem = state.postItems.find(
                (item) => item.postId === payload.postId
            )
            for (const key of keys) {
                postItem[key] = payload[key]
            }
        },
        likePostSlice: (state, { payload }) => {
            const postItem = state.postItems.find(
                (item) => item.postId === payload.postId
            )
            postItem.postLikes += 1
        },
        deletePostSlice: (state, { payload }) => {
            state.postItems = state.postItems.filter(
                (item) => item.postId !== payload.postId
            )
        },
        postCommentSlice: (state, { payload }) => {
            const postItem = state.postItems.find(
                (item) => item.postId === payload.postId
            )
            postItem.postComments.push(payload)
        },
        deleteCommentSlice: (state, { payload }) => {
            const postItem = state.postItems.find(
                (item) => item.postId === payload.postId
            )
            postItem.postComments = postItem.postComments.filter(
                (item) => item.commentId != payload.commentId
            )
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPostItems.pending, (state) => {
                state.postsLoading = true
            })
            .addCase(getPostItems.fulfilled, (state, { payload }) => {
                state.postsLoading = false
                state.postItems = payload
            })
            .addCase(getPostItems.rejected, (state, action) => {
                state.postsLoading = false
            })
    },
})

export const {
    createPostSlice,
    updatePostSlice,
    likePostSlice,
    deletePostSlice,
    postCommentSlice,
    deleteCommentSlice,
} = postSlice.actions

export default postSlice.reducer
