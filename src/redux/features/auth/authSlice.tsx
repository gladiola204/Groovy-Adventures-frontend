import { createSlice} from '@reduxjs/toolkit';
import { IAuthState, setLoginActionType, setUserActionType } from './authTypes';
import { RootState } from '../../store';

const initialState: IAuthState = {
    isLoggedIn: false,
    admin: false,
    user: {
        login: '',
        email: '',
        role: 'user',
        emailVerified: false,
        purchasedTourIds: [],
    },
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        SET_LOGIN(state, action: setLoginActionType) {
            state.isLoggedIn = action.payload;
        },
        SET_USER(state, action: setUserActionType) {
            state.admin = action.payload.role === 'user' ? false : true;
            state.user = action.payload;
        },
    },
    extraReducers(builder) {
        builder
    }

});

const { SET_LOGIN, SET_USER } = authSlice.actions;

const selectUser = (state: RootState) =>  state.auth.user;
const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
const selectIsAdmin = (state: RootState) => state.auth.admin;

export default authSlice.reducer;