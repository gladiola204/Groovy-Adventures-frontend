import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { AddToWishlistAction, AuthState, GetWishlistAction, LoginUserAction, RemoveFromWishlistAction, SetAdminAction, SetLoginAction, SetTokenAction, SetUserAction } from './authSlice.interface';
import { RootState } from '../../store';
import addCommonAsyncThunksMatchers from '../../utils/addCommonAsyncThunksMatchers';
import authThunks from './authThunks';

const initialState: AuthState = {
    isLoggedIn: false,
    admin: false,
    user: {
        login: '',
        email: '',
        role: 'user',
        emailVerified: false,
        purchasedTours: [],
    },
    wishlist: [],
    authToken: '',
    isError: false,
    errorMessage: '',
    isSuccess: false,
    fetched: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        SET_LOGIN(state, action: SetLoginAction) {
            state.isLoggedIn = action.payload;
        },
        SET_ADMIN(state, action: SetAdminAction) {
            state.admin = action.payload;
        },
        SET_USER(state, action: SetUserAction) {
            state.admin = action.payload.role === 'user' ? false : true;
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        SET_TOKEN(state, action: SetTokenAction) {
            state.authToken = action.payload;
        },
    },
    extraReducers(builder) {
        builder
        .addCase(authThunks.loginUser.fulfilled, (state, action: LoginUserAction) => {
            const { user, token } = action.payload.data;
            state.admin = user.role === 'user' ? false : true;
            state.user = user;
            state.isLoggedIn = true;
            state.authToken = token;
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('authToken', token);
        })
        .addCase(authThunks.addToWishlist.fulfilled, (state, action: AddToWishlistAction) => {
            state.wishlist = action.payload.data;
        })
        .addCase(authThunks.getWishlist.fulfilled, (state, action: GetWishlistAction) => {
            state.wishlist = action.payload.data;
        })
        .addCase(authThunks.removeFromWishlist.fulfilled, (state, action: RemoveFromWishlistAction) => {
            state.wishlist = action.payload.data;
        })
        addCommonAsyncThunksMatchers<AuthState>(builder, 'auth/')
    }

});

export const { SET_USER, SET_TOKEN, SET_LOGIN, SET_ADMIN } = authSlice.actions;

export const selectAuthState = (state: RootState) =>  state.auth;

export default authSlice.reducer;