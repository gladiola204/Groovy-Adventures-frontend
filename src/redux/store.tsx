import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import { IAuthState } from "./features/auth/authTypes";

export interface RootState {
    auth: IAuthState,
};

const store = configureStore({
    reducer: {
        auth: authReducer,
    }
});

export type AppDispatch = typeof store.dispatch;