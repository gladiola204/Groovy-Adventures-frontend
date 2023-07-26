import { toast } from 'react-toastify';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IReview, ITour } from "./tourSlice.interface";
import tourService, { INewTour, IUpdateTour } from "../../../services/tourService";
import { RootState } from '../../store';

export interface ITourState {
    tour: null | ITour,
    tours: ITour[],
    hasMoreTours: boolean,
    isError: boolean,
    errorMessage: any, // NAPRAWIĆ
    isSuccess: boolean,
    isLoading: boolean,
};

interface IQuery {
    category?: string,
    price?: string,
    people?: string,
    startDate?: string,
    endDate?: string,
    page: number,
    limit: number,
};

export const createTour = createAsyncThunk(
    "products/create",
    async (tourData: INewTour, thunkAPI) => {
        try {
            return await tourService.createNewTour(tourData)
        } catch (error: any) {
            const message = 
            ( error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const deleteTour = createAsyncThunk(
    "tours/delete",
    async (slug: string, thunkAPI) => {
        try {
            return await tourService.deleteTour(slug);
        } catch (error: any) {
            const message = 
            ( error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getTour = createAsyncThunk(
    "tours/getTour",
    async (slug: string, thunkAPI) => {
        try {
            return await tourService.getTour(slug);
        } catch (error: any) {
            const message = 
            ( error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getTours = createAsyncThunk(
    "tours/getTours",
    async (tourFilters: IQuery, thunkAPI) => {
        try {
            let query = ''
            Object.entries(tourFilters).map(([key, value], index) => {
                query.concat(`&${key}=${value}`); // DO POPRAWY
            });
            return await tourService.getTours(query);
        } catch (error: any) {
            const message = 
            ( error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const updateTour = createAsyncThunk(
    "tours/updateTour",
    async ({slug, tourData}: {slug: string, tourData: IUpdateTour}, thunkAPI) => {
        try {
            return await tourService.updateTour(slug, tourData);
        } catch (error: any) {
            const message = 
            ( error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const createReview = createAsyncThunk(
    "tours/createReview",
    async (tourData: {slug: string, reviewData: Omit<IReview, 'averagePartialRating' | '_id'>}, thunkAPI) => {
        try {
            return await tourService.createReview(tourData);
        } catch (error: any) {
            const message = 
            ( error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const deleteReview = createAsyncThunk(
    "tours/deleteReview",
    async (_id: string, thunkAPI) => {
        try {
            return await tourService.deleteReview(_id);
        } catch (error: any) {
            const message = 
            ( error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
)

const initialState: ITourState = {
    tour: null,
    tours: [],
    hasMoreTours: true,
    isError: false,
    errorMessage: '',
    isSuccess: false,
    isLoading: false,
};
  
const tourSlice = createSlice({
    name: 'tour',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getTour.fulfilled, (state, action) => {
            state.tour = action.payload;
        })
        .addCase(getTours.fulfilled, (state, action) => {
            state.tours.push(action.payload);
        })
        .addMatcher(
            (action) =>
            action.type.endsWith("/pending") && action.type.includes("tours/"),
            (state) => {
            state.isLoading = true;
            }
        )
        .addMatcher(
            (action) =>
            action.type.endsWith("/fulfilled") && action.type.includes("tours/"),
            (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            toast.success("Operation completed successfully");
            }
        )
        .addMatcher(
            (action) =>
            action.type.endsWith("/rejected") && action.type.includes("tours/"),
            (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload;
            toast.error(`${action.payload}`);
            }
        )
    }
})

export const selectIsLoading = (state: RootState) => state.tour.isLoading;
export const selectTour = (state: RootState) => state.tour.tour;
export const selectHasMoreTours = (state: RootState) => state.tour.hasMoreTours;
export const selectTours = (state: RootState) => state.tour.tours;

export default tourSlice.reducer;