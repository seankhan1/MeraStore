import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./api";

const initialState = {
    isPending: false,
    orderItems: [],
    isAlert: false,
    isError: false,
    status: null,
    message: null,
};

const fetchOrder = createAsyncThunk("orders/fetch", async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.get("/orders/fetch");
        return data;
    } catch (error) {
        return Error(error.response.data.message || error.message);
    }
});

const orderSlice = createSlice({
    name: "Orders",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrder.pending, (state) => {
                state.isPending = true;
                state.isAlert = false;
                state.isError = false;
            })
            .addCase(fetchOrder.fulfilled, (state, { payload }) => {
                state.isPending = false;
                state.isAlert = false;
                state.status = payload.status;
                state.message = payload.message;
                state.orderItems = payload.orders.orderDetails;
            })
            .addCase(fetchOrder.rejected, (state, { payload }) => {
                state.isPending = false;
                state.isAlert = true;
                state.status = "Failed";
                state.message = payload; // This is the error message
            });
    },
});

export const { reducer } = orderSlice;
export { fetchOrder };
