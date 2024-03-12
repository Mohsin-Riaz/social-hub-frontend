import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUser } from '../../api/people_calls';

const initialState = {
    userInfo: {},
    userLoading: true,
};

export const getUserInfo = createAsyncThunk(
    'user/getUserInfo',
    async (name, thunkAPI) => {
        try {
            // console.log(name);
            // console.log(thunkAPI);
            // console.log(thunkAPI.getState());
            // thunkAPI.dispatch(openModal());
            const resp = await getUser(name);
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('something went wrong');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.userInfo = {};
        },
        addFriend: (state, { payload }) => {
            state.userInfo.friends.push(payload);
        },
        removeFriend: (state, { payload }) => {
            state.userInfo.friends = state.userInfo.friends.filter((person) => {
                if (payload.peopleId !== person.peopleId) return person;
            });
        },
        updateUser: (state, { payload }) => {
            state.userInfo = { ...state.userInfo, ...payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserInfo.pending, (state) => {
                state.userLoading = true;
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.userLoading = false;
                state.userInfo = action.payload;
            })
            .addCase(getUserInfo.rejected, (state, action) => {
                state.userLoading = false;
            });
    },
});

export const { logoutUser, addFriend, removeFriend, updateUser } =
    userSlice.actions;

export default userSlice.reducer;
