import request from "./axios";
import { toast } from "react-toastify";

const API_URL = `/api/users`;

export interface IUserData {
    email: string,
    login: string,
    password: string,
}

export type IPurchaseData = [{
    scheduleId: string,
    numberOfParticipants: number
}]

export interface IAuthService {
    registerUser: (userData: IUserData) => Promise<any>;
    loginUser: (userData: Omit<IUserData, "login">) => Promise<any>;
    logoutUser: () => Promise<any>;
    getUserStatus: () => Promise<any>,
    confirmEmail: (userData: {
        token: string;
    }) => Promise<any>,
    resendVerificationEmail: (userData: {
        email: string;
    }) => Promise<any>,
    changePassword: (userData: {
        oldPassword: string;
        newPassword: string;
    }) => Promise<any>,
    forgotPassword: (userData: {
        email: string;
    }) => Promise<any>,
    resetPassword: (userData: {
        newPassword: string;
        resetToken: string;
    }) => Promise<any>
    purchaseTour: (userData: {
        purchaseData: IPurchaseData;
    }) => Promise<any>,
};

export async function registerUser(userData: IUserData) {
    try {
        const response = await request.post(`${API_URL}/register`, userData);

        if(response.statusText === 'Created') {
            toast.success("User registered succesfully");
        }
        return response.data;
    } catch (error: any) {
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        toast.error(message);
    }
};

export async function loginUser(userData: {email: string, password: string}) {
    try {
        const response = await request.post(`${API_URL}/login`, userData);
        console.log(response);
        if(response.statusText === 'OK') {
            toast.success("User logged in succesfully");
        }
        return response.data;
    } catch (error: any) {
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        toast.error(message);
    }
};

export async function logoutUser() {
    try {
        await request.get(`${API_URL}/logout`);
    } catch (error: any) {
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        toast.error(message);
    }
};

export async function forgotPassword(userData: {email: string}) {
    try {
        const response = await request.post(`${API_URL}/forgotpassword`, userData);

        toast.success(response.data.message);
    } catch (error: any) {
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        toast.error(message);
    }
};

export async function resetPassword(userData: {newPassword: string}, resetToken: string) {
    try {
        const response = await request.put(`${API_URL}/resetpassword/${resetToken}`, userData);

        return response.data;
    } catch (error: any) {
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        toast.error(message);
    }
};

export async function changePassword(userData: {oldPassword: string, newPassword: string}) {
    const response = await request.patch(`${API_URL}/changepassword`, userData);
    return response.data;
}

export async function getUserStatus() {
    try {
        const response = await request.get(`${API_URL}/loggedin`);
        return response.data;
    } catch (error: any) {
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        toast.error(message);
    }
};

// export async function getUser() {
//     try {
//         const response = await request.get(`${API_URL}/getuser`);
//         return response.data;
//     } catch (error: any) {
//         const message = (
//             error.response && error.response.data && error.response.data.message) || error.message || error.toString();

//         toast.error(message);
//     }
// };

export async function confirmEmail(userData: {token: string}) {
    const response = await request.patch(`${API_URL}/confirmemail/${userData.token}`);
    return response.data;
}

export async function resendVerificationEmail(userData: {email: string}) {
    const response = await request.post(`${API_URL}/resendverificationemail`, userData);
    return response.data;
}

export async function purchaseTour(userData: {purchaseData: IPurchaseData}) {
    const response = await request.post(`${API_URL}/purchase`, userData);
    return response.data;
}