import axios from "axios";
import jsCookie from 'js-cookie';

export const API = process.env.REACT_APP_SERVER_API

// let token = jsCookie.get('accessToken');

const api = axios.create({
    baseURL: API,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        // Add the authorization header with the current token
        const currentToken = jsCookie.get('accessToken');
        config.headers["Authorization"] = `Bearer ${currentToken}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response) {
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    const refreshToken = jsCookie.get('refreshToken');
                    const response = await axios.post(`${API}/users/refresh-token`, {
                        refreshToken: refreshToken
                    });
                    const { accessToken } = response.data;
                    jsCookie.set('accessToken', accessToken);
                    api.defaults.headers.common["Authorization"] = accessToken

                    return api(originalRequest);
                } catch (_error) {
                    if (_error.response && _error.response.data) {
                        return Promise.reject(_error.response.data);
                    }
                }
            }
        }
        return Promise.reject(error);
    }
);

export default api;
