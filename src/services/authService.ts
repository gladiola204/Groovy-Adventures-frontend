import { request } from "./axios";
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

async function registerUser(userData: IUserData) {
    const response = await request.post(`${API_URL}/register`, userData);

    if(response.statusText === 'Created') {
        toast.success("User registered succesfully");
    }
    return { data: response.data, showSuccessToast: true };
};

async function loginUser(userData: {email: string, password: string}) {
    const response = await request.post(`${API_URL}/login`, userData);
    return { data: response.data, showSuccessToast: true };
};

async function logoutUser() {
    await request.get(`${API_URL}/logout`);
    return { data: null, showSuccessToast: true };
};

async function forgotPassword(userData: {email: string}) {
    const response = await request.post(`${API_URL}/forgotpassword`, userData);
    return { data: null, showSuccessToast: true };
};

async function resetPassword(userData: {newPassword: string}, resetToken: string) {
    const response = await request.put(`${API_URL}/resetpassword/${resetToken}`, userData);
    return { data: response.data, showSuccessToast: true };
};

async function changePassword(userData: {oldPassword: string, newPassword: string}) {
    const response = await request.patch(`${API_URL}/changepassword`, userData);
    return { data: response.data, showSuccessToast: true };
}

async function getUserStatus() {
    const response = await request.get(`${API_URL}/getuser`);
    return response.status;
};

async function confirmEmail(userData: {token: string}) {
    const response = await request.patch(`${API_URL}/confirmemail/${userData.token}`);
    return { data: response.data, showSuccessToast: true };
}

async function resendVerificationEmail(userData: {email: string}) {
    const response = await request.post(`${API_URL}/resendverificationemail`, userData);
    return { data: response.data, showSuccessToast: true };
};

async function addToWishlist(data: {tourId: string}) {
    const response = await request.patch(`${API_URL}/wishlist/add`, data);
    return { data: response.data, showSuccessToast: true };
};

async function getWishlist() {
    const response = await request.get(`${API_URL}/wishlist`);
    return { data: response.data, showSuccessToast: false };
};

async function removeFromWishlist(tourId: string) {
    const response = await request.patch(`${API_URL}/wishlist/remove/${tourId}`);
    return { data: response.data, showSuccessToast: true };
};

const authService = {
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    changePassword,
    getUserStatus,
    confirmEmail,
    resendVerificationEmail,
    addToWishlist,
    getWishlist,
    removeFromWishlist,
}

export default authService;