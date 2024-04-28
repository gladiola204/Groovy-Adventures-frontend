import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import addCommonAsyncThunksMatchers from "../../utils/addCommonAsyncThunksMatchers";
import categoryThunks from "./categoryThunks";
import { CreateCategoryAction, DeleteCategoryAction, GetAllCategoriesAction, GetCategoryAction, ICategoryState, UpdateCategoryAction } from "./categorySlice.interface";

const { getAllCategories, createCategory, updateCategory, deleteCategory, getCategory} = categoryThunks;

export const initialState: ICategoryState = {
    categories: [],
    category: null,
    isError: false,
    errorMessage: '',
    isSuccess: false,
    fetched: false,
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAllCategories.fulfilled, (state, action: GetAllCategoriesAction) => {
            state.categories = action.payload.data;
            state.fetched = true;
        })
        .addCase(getCategory.fulfilled, (state, action: GetCategoryAction) => {
            state.category = action.payload.data;
            state.fetched = true;
        })
        .addCase(createCategory.fulfilled, (state, action: CreateCategoryAction) => {
            state.categories.push(action.payload.data);
        })
        .addCase(updateCategory.fulfilled, (state, action: UpdateCategoryAction) => {
            const { slug } = action.payload.data;
            state.categories = state.categories.map(category => {
                if (category.slug === slug) {
                return {
                    ...action.payload.data
                };
                }
                return category;
            });
        })
        .addCase(deleteCategory.fulfilled, (state, action: DeleteCategoryAction) => {
            const { slug } = action.payload.data;
            state.categories = state.categories.filter(category => category.slug === slug);
        })
        addCommonAsyncThunksMatchers<ICategoryState>(builder, 'categories/')
    }
});

export const selectCategoryState = (state: RootState) =>  state.category;

export default categorySlice.reducer;