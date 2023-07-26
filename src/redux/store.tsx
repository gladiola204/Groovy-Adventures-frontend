import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import { IAuthState } from "./features/auth/authSlice.interface";
import tourReducer, { ITourState } from "./features/tour/tourSlice";
import categoryReducer, { ICategoryState } from './features/category/categorySlice';

export interface RootState {
    auth: IAuthState,
    tour: ITourState,
    category: ICategoryState,
};

const store = configureStore({
    reducer: {
        auth: authReducer,
        tour: tourReducer,
        category: categoryReducer,
    }
});

export type AppDispatch = typeof store.dispatch;