import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./api";

const initialState = {
    isPending: false,
    wish: [],
    isError: false,
    status: null,
    message: "",
    isAlert: false,
};

const fetchWish = createAsyncThunk('wishlist/getUser', async () => {
    try {
        const response = await api.get("users/getuser");
        return response.data;
    } catch (error) {
        throw Error(error.response?.data.message || error.message)
    }
});

const addToWishlist = createAsyncThunk('wishlist/add', async (_id) => {
    try {
        const response = await api.patch(`products/wishlist/${_id}`)
        return response.data
    } catch (error) {
        throw Error(error.response?.data.message || error.message)
    }
})

const deleteWishlist = createAsyncThunk('wishlist/delete', async (_id) => {
    try {
        const response = await api.delete(`products/wishlist/${_id}`)
        return response.data
    } catch (error) {
        throw Error(error.response?.data.message || error.message)
    }
})

const wishlistSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        wishAlertReset: (state) => {
            state.isAlert = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWish.pending, (state) => {
                state.isAlert = false;
                state.isPending = true;
                state.isError = false;
            })
            .addCase(fetchWish.fulfilled, (state, { payload }) => {
                state.isPending = false;
                state.status = payload.status;
                state.wish = payload.user.wishlist
            })
            .addCase(fetchWish.rejected, (state, { error }) => {
                state.isPending = false
                state.isError = true;
                state.status = "Failed";
                state.message = "User is not Authorized";
            })
            .addCase(addToWishlist.pending, (state) => {
                state.isAlert = false;
                state.isPending = true;
                state.isError = false;
            })
            .addCase(addToWishlist.fulfilled, (state, { payload }) => {
                state.isPending = false;
                state.isAlert = true;
                state.status = payload.status;
                state.message = payload.message;
            })
            .addCase(addToWishlist.rejected, (state, { error }) => {
                state.isPending = false
                state.isAlert = true;
                state.isError = true;
                state.status = "Failed";
                state.message = error.message;
            })
            .addCase(deleteWishlist.pending, (state) => {
                state.isAlert = false;
                state.isPending = true;
                state.isError = false;
            })
            .addCase(deleteWishlist.fulfilled, (state, { payload }) => {
                state.isPending = false;
                state.isAlert = true;
                state.status = payload.status;
                state.message = payload.message;
            })
            .addCase(deleteWishlist.rejected, (state, { error }) => {
                state.isPending = false
                state.isAlert = true;
                state.isError = true;
                state.status = "Failed";
                state.message = error.message;
            })

    }
})



export { fetchWish, addToWishlist, deleteWishlist };
export const { wishAlertReset } = wishlistSlice.actions;
export const { reducer } = wishlistSlice;