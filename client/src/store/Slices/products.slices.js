import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "./api";

const initialState = {
    isPending: false,
    products: [],
    status: null,
    isError: false,
    message: "",
    isAlert: false
}

const fetchProducts = createAsyncThunk("products/fetch", async (params) => {
    try {
        const { data } = await api.get(`/products/fetch-products`, { params })
        return data
    } catch (error) {
        throw Error(error.response.data.message || error.message)
    }
})

const updateProduct = createAsyncThunk("products/update", async ({ _id, product }) => {
    try {
        const { data } = await api.patch(`/products/update/${_id}`, product);
        return data;
    } catch (error) {
        return { status: "Failed", message: error.response.data.message };
    }
});

const deleteProduct = createAsyncThunk('products/delete', async (_id) => {
    try {
        const { data } = await api.delete(`products/delete/${_id}`)
        return data
    } catch (error) {
        throw Error(error.response.data.message || error.message)
    }
})


const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        productAlertReset: (state) => {
            state.isAlert = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isPending = true
            })
            .addCase(fetchProducts.fulfilled, (state, { payload }) => {
                state.products = payload.productsFilter
                state.pageInfo = payload.pageInfo
                state.isPending = false
            })
            .addCase(fetchProducts.rejected, (state, { error }) => {
                state.isError = true;
                state.isAlert = true;
                state.status = "Failed"
                state.message = error.message
            })
            .addCase(updateProduct.pending, (state) => {
                state.isPending = true
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.isPending = false
                state.status = action.payload.status
                state.status = action.payload.message
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.isError = true
                state.status = action.payload.status
                state.message = action.payload.message
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.status = action.payload.status
                state.message = action.payload.message
            })
    }
})

export const { reducer } = productsSlice
export const { productAlertReset } = productsSlice.actions
export { fetchProducts, updateProduct, deleteProduct }