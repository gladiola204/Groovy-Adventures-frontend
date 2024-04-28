import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../../services/authService";
import parseAxiosError from '../../utils/parseAxiosError';

const loginUser = createAsyncThunk(
    'auth/login',
    async (data: {email: string, password: string}, thunkAPI) => {
        try {
            return await authService.loginUser(data)
        } catch (error: any) {
            return thunkAPI.rejectWithValue(parseAxiosError(error));
        }
    }
);

const changePassword = createAsyncThunk(
    'auth/change-password',
    async (data: {oldPassword: string, newPassword: string}, thunkAPI) => {
        try {
            return await authService.changePassword(data)
        } catch (error: any) {
            return thunkAPI.rejectWithValue(parseAxiosError(error));
        }
    }
);

const registerUser = createAsyncThunk(
    'auth/register',
    async (data: {email: string, login: string, password: string}, thunkAPI) => {
        try {
            return await authService.registerUser(data)
        } catch (error: any) {
            return thunkAPI.rejectWithValue(parseAxiosError(error));
        }
    }
);

const addToWishlist = createAsyncThunk(
    'auth/add-to-wishlist',
    async (data: {tourId: string}, thunkAPI) => {
        try {
            return await authService.addToWishlist(data);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(parseAxiosError(error));
        }
    }
);

const getWishlist = createAsyncThunk(
    'auth/get-wishlist',
    async (_, thunkAPI) => {
        try {
            return await authService.getWishlist();
        } catch (error: any) {
            return thunkAPI.rejectWithValue(parseAxiosError(error));
        }
    }
);

const removeFromWishlist = createAsyncThunk(
    'auth/remove-from-wishlist',
    async (tourId: string, thunkAPI) => {
        try {
            return await authService.removeFromWishlist(tourId);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(parseAxiosError(error));
        }
    }
);

const authThunks = {
    loginUser,
    registerUser,
    changePassword,
    addToWishlist,
    getWishlist,
    removeFromWishlist,
};

export default authThunks;