import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IImage } from "../tour/tourSlice.interface";
import categoryService from "../../../services/categoryService";
import { toast } from 'react-toastify';
import { RootState } from "../../store";

export interface ICategory {
    title: string,
    icon: IImage,
    slug: string,
};

export interface ICategoryState {
    categories: ICategory[],
    isError: boolean,
    errorMessage: string,
    isSuccess: boolean,
    isLoading: boolean,
};

export const createCategory = createAsyncThunk(
    'categories/create',
    async (categoryData: Omit<ICategory, 'slug'>, thunkAPI) => {
        try {
            return await categoryService.createCategory(categoryData);
        } catch (error: any) {
            const message = 
            ( error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updateCategory = createAsyncThunk(
    'categories/update',
    async ({slug, categoryData}: {slug: string, categoryData: Partial<ICategory>}, thunkAPI) => {
        try {
            return await categoryService.updateCategory(slug, categoryData);
        } catch (error: any) {
            const message = 
            ( error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deleteCategory = createAsyncThunk(
    'categories/delete',
    async (slug: string, thunkAPI) => {
        try {
            return await categoryService.deleteCategory(slug);
        } catch (error: any) {
            const message = 
            ( error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const initialState: ICategoryState = {
    categories: [],
    isError: false,
    errorMessage: '',
    isSuccess: false,
    isLoading: false,
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(createCategory.fulfilled, (state, action) => {
            state.categories.push(action.payload);
        })
        .addCase(updateCategory.fulfilled, (state, action) => {
            const { slug } = action.payload;
            state.categories = state.categories.map(category => {
                if (category.slug === slug) {
                return {
                    ...action.payload
                };
                }
                return category;
            });
        })
        .addCase(deleteCategory.fulfilled, (state, action) => {
            const { slug } = action.payload;
            state.categories = state.categories.filter(category => category.slug === slug);
        })
        .addMatcher(
            (action) =>
            action.type.endsWith("/pending") && action.type.includes("categories/"),
            (state) => {
            state.isLoading = true;
            }
        )
        .addMatcher(
            (action) =>
            action.type.endsWith("/fulfilled") && action.type.includes("categories/"),
            (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            toast.success("Operation completed successfully");
            }
        )
        .addMatcher(
            (action) =>
            action.type.endsWith("/rejected") && action.type.includes("categories/"),
            (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload;
            toast.error(`${action.payload}`);
            }
        )
    }
});

export const selectIsLoading = (state: RootState) => state.category.isLoading;
export const selectCategories = (state: RootState) => state.category.categories;

export default categorySlice.reducer;