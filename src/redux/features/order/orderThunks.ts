import { createAsyncThunk } from "@reduxjs/toolkit";
import orderService, { IOrderData } from "../../../services/orderService";

const createOrder = createAsyncThunk(
    'orders/createOrder',
    async (orderData: IOrderData, thunkAPI) => {
        try {
            return await orderService.createOrder(orderData)
        } catch (error: any) {
            const message = 
            ( error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const getAllOrders = createAsyncThunk(
    'orders/getAllOrders',
    async (_, thunkAPI) => {
        try {
            return await orderService.getAllOrders()
        } catch (error: any) {
            console.log('tutaj', error);
            const message = 
            ( error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const getOrder = createAsyncThunk(
    'orders/getOrder',
    async (orderId: string, thunkAPI) => {
        try {
            return await orderService.getOrder(orderId);
        } catch (error: any) {
            const message = 
            ( error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const orderThunks = {
    createOrder,
    getAllOrders,
    getOrder,
};

export default orderThunks;