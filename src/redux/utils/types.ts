import { AnyAction } from "@reduxjs/toolkit";

export interface CommonAsyncState {
    isSuccess: boolean;
    isError: boolean;
    errorMessage?: string;
    fetched: boolean,
};

export interface CommonAction extends AnyAction {
    type: string,
    payload: { 
        data: any, 
        showSuccessToast?: boolean,
    }
}