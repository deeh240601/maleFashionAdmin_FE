import axios from 'axios';
import querystring from 'query-string';
import { store } from '../store';
import jwt_decode from 'jwt-decode';
import AuthService from './auth.service.js';
import { setToken } from '../store/feature/UserSlice';
import { notifyErrorMessage, notifyErrorSystem, notifySuccessMessage } from '../core/utils/notify-action';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'content-type': 'application/json'
    },
    withCredentials: true,
    paramsSerializer: params => querystring.stringify(params)
});


axiosClient.interceptors.request.use(async (config) => {
    const tokenLocal = store.getState().user.token;
    if (tokenLocal) {
        const decodedToken = await jwt_decode(tokenLocal);
        if (decodedToken.exp < new Date().getTime() / 1000) {
            const response = await AuthService.refreshToken();
            store.dispatch(setToken(response.data.result));
        }
    }
    const token = 'Bearer ' + store.getState().user.token;
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
}, (err) => Promise.reject(err));

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        if (response.data.message && response.data.message.length > 0) {
            const listMessage = response.data.message;
            const status = response.data.status;
            if (status <= 250) {
                listMessage.forEach(e => {
                    notifySuccessMessage(e);
                });
            } else {
                listMessage.forEach(e => {
                    notifyErrorMessage(e);
                });
            }
            if (status === 401) {
                window.location.href('/login');
            }

        }
        return response.data;
    }
    return response;
}, error => {
    if (error.response && error.response.data && error.response.data.message) {
        const listMessage = error.response.data.message;
        if (listMessage.constructor === Array) {
            listMessage.forEach((e) => {
                notifyErrorMessage(e);
            });
        } else notifyErrorSystem();

    } else {
        notifyErrorSystem();
    }

    throw error;
});

export default axiosClient;

