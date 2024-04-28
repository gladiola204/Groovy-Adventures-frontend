import { ICreateCategory } from "../../../services/categoryService";
import { CommonAction, CommonAsyncState } from "../../utils/types";
import { Image } from "../tour/tourSlice.interface";

export interface ICategory {
    title: string,
    icon: Image,
    slug: string,
};

export interface ICategoryState extends CommonAsyncState {
    categories: ICategory[],
    category: ICategory | null,
};


// ACTION TYPES //

export interface CreateCategoryAction extends CommonAction {
    payload: {
        data: ICategory,
        showSuccessToast: boolean
    }
};

export interface UpdateCategoryAction extends CommonAction {
    payload: {
        data: ICategory,
        showSuccessToast: boolean
    }
};

export interface DeleteCategoryAction extends CommonAction {
    payload: {
        data: ICategory,
        showSuccessToast: boolean
    }
};


export interface GetCategoryAction extends CommonAction {
    payload: {
        data: ICategory,
        showSuccessToast: boolean,
    }
};


export interface GetAllCategoriesAction extends CommonAction {
    payload: {
        data: ICategory[],
        showSuccessToast: boolean
    }
};
