import { request } from "./axios";

const API_URL = '/api/payments';

interface ICreateNewPayment {
    token: string,
    orderId: string,
};

type RequestOptions<P = any, B = any> = {
    params?: P;
    body?: B;
};

async function createNewPayment({ body }: RequestOptions<undefined, ICreateNewPayment>) {
    const response = await request.post(API_URL, body);
    return { data: response.data, showSuccessToast: true };
};

const paymentService = {
    createNewPayment
};

export default paymentService;