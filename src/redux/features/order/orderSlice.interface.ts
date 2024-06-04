import { CommonAction, CommonAsyncState } from "../../utils/types";
import { ISchedule } from "../tour/tourSlice.interface";

export enum OrderStatus {
    Created = "created",
    Cancelled = "cancelled",
    AwaitingPayment = "awaiting:payment",
    Complete = "complete"
};

export type OrderSchedule = {
    doc: ISchedule, numberOfParticipants: number
}

export interface IOrder {
    id: string,
    userId: string;
    status: OrderStatus;
    price: number;
    expiresAt: Date;
    schedule: OrderSchedule[];
};



export interface IOrderState extends CommonAsyncState {
    allOrders: IOrder[],
    order: IOrder | {},
}


// ACTION TYPES //

export interface CreateOrderAction extends CommonAction {
    payload: {
        data: IOrder,
        showSuccessToast: boolean,
    }
}

export interface GetAllOrdersAction extends CommonAction {
    payload: {
        data: IOrder[],
        showSuccessToast: boolean,
    }
}

export interface GetOrderAction extends CommonAction {
    payload: {
        data: IOrder,
        showSuccessToast: boolean,
    }
}