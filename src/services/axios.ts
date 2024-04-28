import axios from 'axios';

const token = localStorage.getItem('authToken');

export const request = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true,
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    }
});