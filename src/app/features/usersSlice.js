import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";


const data_API = import.meta.env.VITE_data_API;

export const getUsers = createAsyncThunk("users/getUsers", async (__, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${data_API}/userS`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
})

export const loginUser = createAsyncThunk("users/loginUser", async (user, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${data_API}/users/login`, user);
        return response.data;

    } catch (error) {  // This error comes from axios..
        if (!error.response) {
            return rejectWithValue("Network error. Please try again.");
        }
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

export const deleteUser = createAsyncThunk("users/deleteUser",
    async (id, { rejectWithValue }) => {
        const token = localStorage.getItem("token");
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));

        if (currentUser && (currentUser.id == id || currentUser.isAdmin === true)) {
            try {
                const response = await axios.delete(`${data_API}/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data;
            } catch (error) {
                return rejectWithValue(error.response.data.message || "Delete failed");
            }
        } else {
            return rejectWithValue(error.response.data.message || "Delete failed");
        }

    }
);

export const editUser = createAsyncThunk("users/editUser",
    async (data, { rejectWithValue }) => {
        const token = localStorage.getItem("token");
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));

        if (currentUser && currentUser.id == data.id) {

            try {
                const response = await axios.put(`${data_API}/users/${data.id}`, data.updates, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data;
            } catch (error) {
                return rejectWithValue("Failed to update user. 1");
            }
        } else {
            return rejectWithValue("Failed to update user. 2");
        }
    }
);



const usersSlice = createSlice({
    name: 'users',

    initialState: {
        data: [],
        status: "idle",
        currentUser: typeof window !== "undefined" && localStorage.getItem('currentUser') !== "undefined"
            ? JSON.parse(localStorage.getItem('currentUser'))
            : null,
        error: null,
        token: localStorage.getItem('token') || null
    },

    reducers: {
        logoutUser: (state) => {
            state.currentUser = null;
            state.token = null;
            localStorage.removeItem('token');
            localStorage.removeItem('currentUser');
        },
        resetError: (state) => {
            state.error = null;
        }
    },

    extraReducers: (builder) => {

        // Edit user

        builder
            .addCase(editUser.pending, (state) => {
                state.status = 'Loading';
                state.error = null;
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.status = 'Succeeded';
                state.currentUser = action.payload;
                state.error = null;
            })
            .addCase(editUser.rejected, (state, action) => {
                state.status = 'Failed';
                state.error = action.payload;
            });

        // fetch Users
        builder
            .addCase(getUsers.pending, (state) => {
                state.status = 'Loading';
                state.error = null;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.status = 'Succeeded';
                state.data = action.payload;
                state.error = null;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.status = 'Failed';
                state.error = action.payload;
            });

        // login User
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'logging in';
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.error = null;
                state.status = 'Succeeded';
                state.currentUser = action.payload.user;
                state.token = action.payload.token;
                if (typeof window !== "undefined") {
                    localStorage.setItem('currentUser', JSON.stringify(action.payload.user)); // Store as JSON
                    localStorage.setItem('token', action.payload.token);
                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'Failed';
                state.error = action.payload;
            });

        // post User
        builder
            .addCase(postUser.pending, (state) => {
                state.status = 'Creating';
                state.error = null;
            })
            .addCase(postUser.fulfilled, (state, action) => {
                state.data.push(action.payload);
                state.error = null;
            })
            .addCase(postUser.rejected, (state, action) => {
                state.status = "Failed";
                state.error = action.payload;
            })

        // delete User
        builder
            .addCase(deleteUser.pending, (state) => {
                state.status = 'Deleting';
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.data = state.data.filter((user) => user._id !== action.payload);
                state.error = null;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.status = 'Failed';
                state.error = action.payload;
            })
    }
});

export const { logoutUser, resetError } = usersSlice.actions;

// Export reducer
export default usersSlice.reducer;
