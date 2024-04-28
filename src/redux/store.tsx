import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import { AuthState } from "./features/auth/authSlice.interface";
import tourReducer from "./features/tour/tourSlice";
import categoryReducer from './features/category/categorySlice';
import orderReducer from "./features/order/orderSlice";
import { IOrderState } from "./features/order/orderSlice.interface";
import loadingReducer, { ILoadingState } from "./features/loadingSlice";
import loadingMiddleware from "./utils/loadingMiddleware";
import { ICategoryState } from "./features/category/categorySlice.interface";
import { ITourState } from "./features/tour/tourSlice.interface";

export interface RootState {
    auth: AuthState,
    tour: ITourState,
    category: ICategoryState,
    order: IOrderState,
    loading: ILoadingState
};

export const store = configureStore({
    reducer: {
        auth: authReducer,
        tour: tourReducer,
        category: categoryReducer,
        order: orderReducer,
        loading: loadingReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loadingMiddleware)
});

export type AppDispatch = typeof store.dispatch;