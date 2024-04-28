import { CommonAction, CommonAsyncState } from "../../utils/types"
import { ITour } from "../tour/tourSlice.interface"

export interface User {
    login: string,
    email: string,
    role: "user" | "admin",
    emailVerified: boolean,
    purchasedTours: string[],
}

export interface AuthState extends CommonAsyncState {
    isLoggedIn: boolean,
    admin: boolean,
    user: User,
    authToken: string,
    wishlist: ITour[] | []
}


// ACTION TYPES //

export enum ActionTypes {
    setLogin = 'SET_LOGIN',
    setUser = 'SET_USER',
    setToken = 'SET_TOKEN',
    addToBasket = 'ADD_TO_BASKET',
}

export interface SetLoginAction {
    payload: boolean,
    type: string,
}

export interface SetAdminAction {
    payload: boolean,
    type: string,
}

export interface SetUserAction {
    payload: User,
    type: string,
}

export interface SetTokenAction {
    payload: string,
    type: string,
}

export interface LoginUserAction extends CommonAction {
    payload: {
        data: {
            user: User,
            token: string,
        },
        showSuccessToast: boolean,
    }
}

export interface GetUserAction extends CommonAction {
    payload: {
        data: {
            user: User,
            token: string,
        },
        showSuccessToast: boolean,
    }
}

export interface AddToWishlistAction extends CommonAction {
    payload: {
        data: ITour[] | [],
        showSuccessToast: boolean,
    }
};

export interface GetWishlistAction extends CommonAction {
    payload: {
        data: ITour[] | [],
        showSuccessToast: boolean,
    }
}

export interface RemoveFromWishlistAction extends CommonAction {
    payload: {
        data: ITour[] | [],
        showSuccessToast: boolean,
    }
}
