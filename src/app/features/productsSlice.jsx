import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import { useSelector } from 'react-redux';

const data_API = import.meta.env.VITE_data_API;

export const getProducts = createAsyncThunk("products/getProducts", async (__, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${data_API}/products`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
})

export const postProduct = createAsyncThunk("products/postProduct",
    async (newProduct, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${data_API}/products`, newProduct);
            return response.data;
        } catch (error) {
            // Handle both network errors and HTTP errors
            if (!error.response) {
                return rejectWithValue("Network error. Please try again.");
            }
            return rejectWithValue(error.response.data.message || "Failed to add new product.");
        }
    }
);

export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async (id, { rejectWithValue }) => {
        const token = localStorage.getItem("token")

        try {
            const response = await axios.delete(`${data_API}/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue("Product delete failed");
        }
    }
);


const usersSlice = createSlice({
    name: 'users',

    initialState: {
        data: [],
        status: "idle",
        error: null,
    },

    reducers: {

        resetError: (state) => {
            state.error = null;
        }
    },

    extraReducers: (builder) => {

        // fetch Products
        builder
            .addCase(getProducts.pending, (state) => {
                state.status = 'Loading';
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.status = 'Succeeded';
                state.data = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.status = 'Failed';
                state.error = action.payload;
            });

        // post Product
        builder
            .addCase(postProduct.pending, (state) => {
                state.status = 'Creating';
            })
            .addCase(postProduct.fulfilled, (state, action) => {
                state.data.push(action.payload);
            })
            .addCase(postProduct.rejected, (state, action) => {
                state.status = "Failed";
                state.error = action.payload;
            })

        // delete Product
        builder
            .addCase(deleteProduct.pending, (state) => {
                state.status = 'Deleting';
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.data = state.data.filter((product) => product._id !== action.payload);
            })
            .addCase(deleteProduct.rejected, (state) => {
                state.status = 'Failed';
            })
    }
});

export const { resetError } = usersSlice.actions;

// Export reducer
export default usersSlice.reducer;