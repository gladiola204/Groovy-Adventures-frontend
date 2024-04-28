import { toast } from "react-toastify";
import { request } from "./axios";

const API_URL = `/api/admin`;

async function getAdminStatus() {
    const response = await request.get(`${API_URL}/check-admin-status`);
    return { data: response.status, showSuccessToast: false };
};

const adminService = {
    getAdminStatus
};

export default adminService;