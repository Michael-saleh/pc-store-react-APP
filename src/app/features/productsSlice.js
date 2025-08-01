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
        console.log("part reached")
        try {
            const response = await axios.post(`${data_API}/products`, newProduct);
            console.log(response.data)
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
        const token = localStorage.getItem("token");
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));

        if (currentUser && currentUser.isAdmin === true) {
            try {
                const response = await axios.delete(`${data_API}/products/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                return response.data;
            } catch (error) {
                return rejectWithValue("Product delete failed");
            }
        } else {
            return rejectWithValue("Product delete failed");
        }


    }
);


const productsSlice = createSlice({
    name: 'products',

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
                state.error = null;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.status = 'Succeeded';
                state.data = action.payload;
                state.error = null;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.status = 'Failed';
                state.error = action.payload;
            });

        // post Product
        builder
            .addCase(postProduct.pending, (state) => {
                state.status = 'Creating';
                state.error = null;
            })
            .addCase(postProduct.fulfilled, (state, action) => {
                state.data.push(action.payload);
                state.error = null;
            })
            .addCase(postProduct.rejected, (state, action) => {
                state.status = "Failed";
                state.error = action.payload;
            })

        // delete Product
        builder
            .addCase(deleteProduct.pending, (state) => {
                state.status = 'Deleting';
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.data = state.data.filter((product) => product._id !== action.payload);
                state.error = null;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.status = 'Failed';
                state.error = action.payload;
            })
    }
});

export const { resetError } = productsSlice.actions;

// Export reducer
export default productsSlice.reducer;