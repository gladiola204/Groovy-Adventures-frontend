import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import addCommonAsyncThunksMatchers from "../../utils/addCommonAsyncThunksMatchers";
import { CreateOrderAction, GetAllOrdersAction, GetOrderAction, IOrderState } from "./orderSlice.interface";
import orderThunks from "./orderThunks";


const initialState: IOrderState = {
    allOrders: [],
    order: {},
    isError: false,
    errorMessage: '',
    isSuccess: false,
    fetched: false,
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(orderThunks.createOrder.fulfilled, (state, { payload }: CreateOrderAction) => {
                state.allOrders = [...state.allOrders, payload.data];
                state.order = payload.data;
            })
            .addCase(orderThunks.getAllOrders.fulfilled, (state, { payload }: GetAllOrdersAction) => {
                state.allOrders = payload.data;
            })
            .addCase(orderThunks.getOrder.fulfilled, (state, { payload }: GetOrderAction) => {
                state.order = payload.data;
            })
        addCommonAsyncThunksMatchers<IOrderState>(builder, 'orders');
    }
});

export const selectOrderState = (state: RootState) => state.order;

export default orderSlice.reducer;