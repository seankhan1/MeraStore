import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./api";
const fetchCategories = createAsyncThunk(
    'categories/getCategory',
    async () => {
        try {
            const { data } = await api.get(`/products/categories`);
            return data
        } catch (error) {
            throw Error(error.response?.data.message || error.message)
        }
    }
);

const initialState = {
    isPending: false,
    categories: [],
    isError: false,
    status: null,
    message: "",
    isAlert: false
}

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.isPending = true;
                state.isAlert = false;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.isPending = false;
                state.categories = action.payload.categories;
                state.status = action.payload.status;
            })
            .addCase(fetchCategories.rejected, (state, error) => {
                state.isError = true;
                state.isAlert = true;
                state.status = "Failed"
                state.message = "Failed to fetch categories. Please try again later."
            });
    },
});


export const { reducer } = categoriesSlice;
export { fetchCategories }

