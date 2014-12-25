import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./api";
import jsCookie from 'js-cookie'

const initialState = {
    isPending: false,
    user: [],
    isError: false,
    status: null,
    message: "",
    isAlert: false,
    isAdmin: false,
    isLogedIn: false,
};

const setCookie = (name, value, daysToExpire) => {
    jsCookie.set(name, value, { expires: daysToExpire });
};

const handleApiResponse = (response) => {
    const { accessToken, refreshToken } = response.data;
    setCookie('accessToken', accessToken, 1);
    setCookie('refreshToken', refreshToken, 2);
};
const signup = createAsyncThunk('users/signup', async (user) => {
    try {
        const response = await api.post(`/users/registration`, user);
        if (response.data.status === "Failed") {
            throw Error(response.data.message)
        }
        handleApiResponse(response);
        return response.data;
    } catch (error) {
        throw Error(error.response?.data.message || error.message)
    }
});

const login = createAsyncThunk('users/login', async (user) => {
    try {
        const response = await api.post(`/users/login`, user);
        if (response.data.status === "Failed") {
            throw Error(response.data.message)
        }
        handleApiResponse(response);
        return response.data;
    } catch (error) {
        throw Error(error.response?.data.message || error.message)
    }
});

const getUser = createAsyncThunk('users/getUser', async () => {
    try {
        const response = await api.get('/users/getuser')
        return response.data
    } catch (error) {
        throw Error(error.response?.data.message || error.message)
    }
})

const sendEmail = createAsyncThunk('user/sendEmail', async (email) => {
    try {
        const response = await api.post('users/send-reset-password-email', { email })
        handleApiResponse(response);
        return response.data
    } catch (error) {
        throw Error(error.response?.data.message || error.message)
    }
})

const resetPassword = createAsyncThunk('user/resetEmailPassword', async ({ password, confirm_password }) => {
    try {
        const response = await api.post('users/reset-password', { password, confirm_password })
        if (response.data.status === "Failed") throw Error(response.data.message)
        jsCookie.remove("accessToken")
        jsCookie.remove("refreshToken")
        return response.data
    } catch (error) {
        throw Error(error.response?.data.message || error.message)
    }
})

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        alertReset: (state) => {
            state.isAlert = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state) => {
                state.isAlert = false;
                state.isPending = true;
                state.isError = false;
            })
            .addCase(signup.fulfilled, (state, { payload }) => {
                state.isPending = false;
                state.isAlert = true;
                state.status = payload.status;
                state.message = payload.message;
                state.isLogedIn = true
            })
            .addCase(signup.rejected, (state, { error }) => {
                state.isPending = false;
                state.isAlert = true;
                state.isError = true;
                state.status = "Failed";
                state.message = error.message;
            })
            .addCase(login.pending, (state) => {
                state.isAlert = false;
                state.isPending = true;
                state.isError = false;
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                state.isPending = false;
                state.isAlert = true;
                state.isLogedIn = true
                state.status = payload.status;
                state.message = payload.message;
            })
            .addCase(login.rejected, (state, { error }) => {
                state.isPending = false;
                state.isAlert = true;
                state.isError = true;
                state.status = "Failed";
                state.message = error.message;
            })
            .addCase(getUser.pending, (state) => {
                state.isAlert = false;
                state.isPending = true;
                state.isError = false;
            })
            .addCase(getUser.fulfilled, (state, { payload }) => {
                state.isPending = false;
                state.isAlert = true;
                state.status = payload.status;
                state.message = payload.message;
                state.user = payload.user
                state.isLogedIn = true
            })
            .addCase(getUser.rejected, (state, { error }) => {
                state.isPending = false;
                state.isAlert = true;
                state.isError = true;
                state.status = "Failed";
                state.message = error.message;
            })
            .addCase(sendEmail.pending, (state) => {
                state.isAlert = false;
                state.isPending = true;
                state.isError = false;
            })
            .addCase(sendEmail.fulfilled, (state, { payload }) => {
                state.isPending = false;
                state.isAlert = true;
                state.status = payload.status;
                state.message = payload.message;
            })
            .addCase(sendEmail.rejected, (state, { error }) => {
                state.isPending = false;
                state.isAlert = true;
                state.isError = true;
                state.status = "Failed";
                state.message = error.message;
            })
            .addCase(resetPassword.pending, (state) => {
                state.isAlert = false;
                state.isPending = true;
                state.isError = false;
            })
            .addCase(resetPassword.fulfilled, (state, { payload }) => {
                state.isPending = false;
                state.isAlert = true;
                state.status = payload.status;
                state.message = payload.message;
            })
            .addCase(resetPassword.rejected, (state, { error }) => {
                state.isPending = false;
                state.isAlert = true;
                state.isError = true;
                state.status = "Failed";
                state.message = error.message;
            })
    }
});

export const { reducer } = usersSlice;
export const { alertReset } = usersSlice.actions;
export { signup, login, getUser, sendEmail, resetPassword };
