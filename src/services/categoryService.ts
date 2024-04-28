import { request } from "./axios";
import toFormData from "./utils/toFormData";


const API_URL = '/api/admin/categories/';

export interface ICreateCategory {
    title: string,
    icon: File,
}

export type IUpdateCategory = Partial<ICreateCategory>;

async function getAllCategories() {
    const response = await request.get("/api/categories");
    return { data: response.data, showSuccessToast: false };
};

async function getCategory(slug: string) {
    const response = await request.get(`/api/categories/${slug}`);
    return { data: response.data, showSuccessToast: false };
}

async function createCategory(categoryData: ICreateCategory) {
    const response = await request.post(API_URL, toFormData(categoryData));
    return { data: response.data, showSuccessToast: true };
};

async function updateCategory(slug: string, categoryData: IUpdateCategory) {
    const response = await request.patch(API_URL + slug, toFormData(categoryData));
    return { data: response.data, showSuccessToast: true };
};

async function deleteCategory(slug: string) {
    const response = await request.delete(API_URL + slug);
    return { data: response.data, showSuccessToast: true };
};

const categoryService = {
    getAllCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
}

export default categoryService;