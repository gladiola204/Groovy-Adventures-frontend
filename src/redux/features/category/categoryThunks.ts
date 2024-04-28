import { createAsyncThunk } from "@reduxjs/toolkit";
import categoryService, { ICreateCategory, IUpdateCategory } from "../../../services/categoryService";
import parseAxiosError from "../../utils/parseAxiosError";

export const getAllCategories = createAsyncThunk(
    'categories/getAllCategories',
    async (_, thunkAPI) => {
        try {
            return await categoryService.getAllCategories();
        } catch (error: any) {
            return thunkAPI.rejectWithValue(parseAxiosError(error));
        }
    }
);

const getCategory = createAsyncThunk(
    'categories/get',
    async (slug: string, thunkAPI) => {
        try {
            return await categoryService.getCategory(slug);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(parseAxiosError(error));
        }
    }
)

export const createCategory = createAsyncThunk(
    'categories/create',
    async (categoryData: ICreateCategory, thunkAPI) => {
        try {
            return await categoryService.createCategory(categoryData);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(parseAxiosError(error));
        }
    }
);

export const updateCategory = createAsyncThunk(
    'categories/update',
    async ({slug, categoryData}: {slug: string, categoryData: IUpdateCategory}, thunkAPI) => {
        try {
            return await categoryService.updateCategory(slug, categoryData);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(parseAxiosError(error));
        }
    }
);

export const deleteCategory = createAsyncThunk(
    'categories/delete',
    async (slug: string, thunkAPI) => {
        try {
            return await categoryService.deleteCategory(slug);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(parseAxiosError(error));
        }
    }
);

const categoryThunks = {
    getAllCategories,
    getCategory,
    createCategory,
    deleteCategory,
    updateCategory,
}

export default categoryThunks;