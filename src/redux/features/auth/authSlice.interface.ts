interface IUser {
    login: string,
    email: string,
    role: "user" | "admin",
    emailVerified: boolean,
    purchasedTourIds: Object[] | [],
}

export interface IAuthState {
    isLoggedIn: boolean,
    admin: boolean,
    user: IUser,
}

export interface setLoginActionType {
    payload: boolean,
    type: string,
}

export interface setUserActionType {
    payload: IUser,
    type: string,
}