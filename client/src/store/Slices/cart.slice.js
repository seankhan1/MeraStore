import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./api";

const initialState = {
    isPending: false,
    cartItems: [],
    cart_id: null,
    isAlert: false,
    isError: false,
    status: null,
    message: null
}

const fetchCart = createAsyncThunk('cart/items', async () => {
    try {
        const response = await api.get('/cart/items')
        return response.data
    } catch (error) {
        throw Error(error.response.data.message || error.message)
    }
})

const addCart = createAsyncThunk('cart/add', async ({ product_id, quantity }) => {
    try {
        const response = await api.post('/cart/add', { product_id, quantity });
        return response.data;
    } catch (error) {
        throw Error(error.response?.data.message || error.message)
    }
});

const updateCart = createAsyncThunk('cart/udpate', async ({ _id, quantity }) => {
    try {
        const response = await api.patch(`/cart/update/${_id}`, { quantity });
        return response.data;
    } catch (error) {
        throw Error(error.response?.data.message || error.message)
    }
});


const deleteCart = createAsyncThunk('cart/delete', async (_id) => {
    try {
        const response = await api.delete(`/cart/delete/${_id}`)
        return response.data
    } catch (error) {
        throw Error(error.response?.data.message || error.message)
    }
})


const cartSlice = createSlice({
    name: "Cart",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.isPending = true;
                state.isAlert = false;
                state.isError = false;
            })
            .addCase(fetchCart.fulfilled, (state, { payload }) => {
                state.isPending = false;
                state.isError = false;
                state.cartItems = payload.cartItems || []
                state.cart_id = payload.cart_id
                state.status = payload.status
                state.message = payload.message
            })
            .addCase(fetchCart.rejected, (state, { error }) => {
                state.isPending = false;
                state.isError = true;
                state.isAlert = true;
                state.status = "Failed";
                state.message = error.message
            })
            .addCase(addCart.pending, (state) => {
                state.isPending = true;
                state.isAlert = false;
                state.isError = false;
            })
            .addCase(addCart.fulfilled, (state, { payload }) => {
                state.isPending = false;
                state.isAlert = true;
                state.status = payload.status
                state.message = payload.message
            })
            .addCase(addCart.rejected, (state, { error }) => {
                state.isPending = false;
                state.isError = true;
                state.isAlert = true;
                state.status = "Failed";
                state.message = error.message
            })
            .addCase(updateCart.pending, (state) => {
                state.isPending = true;
                state.isAlert = false;
                state.isError = false;
            })
            .addCase(updateCart.fulfilled, (state, { payload }) => {
                state.isPending = false;
                state.isAlert = true;
                state.status = payload.status
                state.message = payload.message
            })
            .addCase(updateCart.rejected, (state, { error }) => {
                state.isPending = false;
                state.isError = true;
                state.isAlert = true;
                state.status = "Failed";
                state.message = error.message
            })
            .addCase(deleteCart.pending, (state) => {
                state.isPending = true;
                state.isError = false;
                state.isAlert = false;
            })
            .addCase(deleteCart.fulfilled, (state, { payload }) => {
                state.isPending = false;
                state.isError = false
                state.isAlert = true;
                state.message = payload.message
                state.status = payload.status
            })
            .addCase(deleteCart.rejected, (state, { error }) => {
                state.isError = false;
                state.isAlert = true;
                state.message = error.message
                state.status = "Failed"
            })

    }
})

export const getKey = async () => {
    try {
        const { data } = await api.get("/orders/get-api-key")
        // console.log(data)
        return data.key_id
    } catch {
        return null
    }
}

export const orderCreate = async (totalAmount) => {
    try {
        const { data } = await api.post("/orders/create-order", { totalAmount })
        return data
    } catch (error) {
        return error.message
    }
}

export const { reducer } = cartSlice
export { fetchCart, addCart, deleteCart, updateCart }