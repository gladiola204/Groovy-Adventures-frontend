import { request } from "./axios";

const API_URL = '/api/orders/';

export interface IOrderData {
    orderData: {
        scheduleId: string,
        numberOfParticipants: number,
    }[],
};

async function createOrder(orderData: IOrderData) {
    const response = await request.post(API_URL, orderData);
    return { data: response.data, showSuccessToast: true };
}

async function getAllOrders() {
    const response = await request.get(API_URL);
    return { data: response.data, showSuccessToast: false };
}

async function getOrder(orderId: string) {
    const response = await request.get(API_URL + orderId);
    return { data: response.data, showSuccessToast: false };
}

const orderService = {
    createOrder,
    getAllOrders,
    getOrder
}

export default orderService;