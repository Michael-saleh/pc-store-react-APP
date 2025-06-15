import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

const data_API = import.meta.env.VITE_data_API;

export const getUsers = createAsyncThunk("users/getUsers", async () => {
    const response = await axios.get(`${data_API}/users`);
    console.log(response)
    return response.data;
})

export const loginUser = createAsyncThunk("users/loginUser", async (user, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${data_API}/users/login`, user);
        console.log(response)
        return response.data;
        
    } catch (error) {
        if (!error.response) {
            return rejectWithValue("Network error. Please try again.");
        }
        console.log(error)
        return rejectWithValue(error.response.data.message || "Login failed.");
    }

})

export const postUser = createAsyncThunk("users/postUser",
    async (newUser, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${data_API}/users`, newUser);
            return response.data;
        } catch (error) {
            // Handle both network errors and HTTP errors
            if (!error.response) {
                return rejectWithValue("Network error. Please try again.");
            }
            return rejectWithValue(error.response.data.message || "Failed to create user.");
        }
    }
);

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
    const response = await axios.delete(`${data_API}/users/${id}`);
    return response.data;
})

const usersSlice = createSlice({
    name: 'users',

    initialState: {
        data: [],
        status: "idle",
        currentUser: null,
        error: null,
        token: null
    },

    reducers: {
        logoutUser: (state) => {
            state.currentUser = null;
            state.token = null;
            return state; // !!! ???
        }
    },

    extraReducers: (builder) => {

        // fetch Users
        builder
            .addCase(getUsers.pending, (state) => {
                state.status = 'Loading';
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.status = 'Succeeded';
                state.data = action.payload;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.status = 'Failed';
                state.error = action.error.message;
            });

        // login User
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'logging in';
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'Succeeded';
                state.currentUser = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'Failed';
                state.error = action.payload;
            });

        // post User
        builder
            .addCase(postUser.pending, (state) => {
                state.status = 'Creating';
            })
            .addCase(postUser.fulfilled, (state, action) => {
                state.data.push(action.payload);
            })
            .addCase(postUser.rejected, (state, action) => {
                state.status = "Failed";
                state.error = action.payload;
            })

        // delete User
        builder
            .addCase(deleteUser.pending, (state) => {
                state.status = 'Deleting';
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.data = state.data.filter((user) => user._id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state) => {
                state.status = 'Failed';
            })
    }
});

export const { logoutUser } = usersSlice.actions;

// Export reducer
export default usersSlice.reducer;
