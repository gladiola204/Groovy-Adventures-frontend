import { ICategory } from "../redux/features/category/categorySlice";
import request from "./axios";

const API_URL = '/api/admin/categories/';


async function createCategory(categoryData: Omit<ICategory, 'slug'>) {
    const response = await request.post(API_URL, categoryData);
    return response.data;
};

async function updateCategory(slug: string, categoryData: Partial<ICategory>) {
    const response = await request.patch(API_URL + slug, categoryData);
    return response.data;
};

async function deleteCategory(slug: string) {
    const response = await request.delete(API_URL + slug);
    return response.data;
};

const categoryService = {
    createCategory,
    updateCategory,
    deleteCategory,
}

export default categoryService;