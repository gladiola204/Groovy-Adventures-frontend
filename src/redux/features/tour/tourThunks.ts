import { createAsyncThunk } from "@reduxjs/toolkit";
import tourService, { CreateReviewData, INewTour, IUpdateTour } from "../../../services/tourService";
import parseAxiosError from "../../utils/parseAxiosError";

interface IQuery {
    category?: string,
    price?: string,
    people?: string,
    startDate?: string,
    endDate?: string,
    page: number,
    limit: number,
};

const createTour = createAsyncThunk(
    "products/create",
    async (tourData: INewTour, thunkAPI) => {
        try {
            return await tourService.createNewTour(tourData)
        } catch (error: any) {
            return thunkAPI.rejectWithValue(parseAxiosError(error));
        }
    }
)

const deleteTour = createAsyncThunk(
    "tours/delete",
    async (slug: string, thunkAPI) => {
        try {
            return await tourService.deleteTour(slug);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(parseAxiosError(error));
        }
    }
);

const getTour = createAsyncThunk(
    "tours/getTour",
    async (slug: string, thunkAPI) => {
        try {
            return await tourService.getTour(slug);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(parseAxiosError(error));
        }
    }
);

const getTours = createAsyncThunk(
    "tours/getToursForBasket",
    async (tourIds: string[], thunkAPI) => {
        try {
            return await tourService.getTours(tourIds);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(parseAxiosError(error));
        }
    }
);

const filterTours = createAsyncThunk(
    "tours/filterTours",
    async (tourFilters: IQuery, thunkAPI) => {
        try {
            return await tourService.filterTours(tourFilters);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(parseAxiosError(error));
        }
    }
)

const updateTour = createAsyncThunk(
    "tours/updateTour",
    async ({slug, tourData}: {slug: string, tourData: IUpdateTour}, thunkAPI) => {
        try {
            return await tourService.updateTour(slug, tourData);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(parseAxiosError(error));
        }
    }
);


// DESTINATIONS
const getDestinations = createAsyncThunk(
    'tours/getDestinations',
    async (destinationName: string, thunkAPI) => {
        try {
            return await tourService.getDestinations(destinationName);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(parseAxiosError(error));
        }
    }

)

const createReview = createAsyncThunk(
    "tours/createReview",
    async (tourData: {slug: string, reviewData: CreateReviewData}, thunkAPI) => {
        try {
            return await tourService.createReview(tourData);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(parseAxiosError(error));
        }
    }
)

const deleteReview = createAsyncThunk(
    "tours/deleteReview",
    async (_id: string, thunkAPI) => {
        try {
            return await tourService.deleteReview(_id);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(parseAxiosError(error));
        }
    }
)

const tourThunks = {
    createTour,
    updateTour,
    deleteTour,
    getTour,
    getTours,
    filterTours,
    getDestinations,
    createReview,
    deleteReview
}

export default tourThunks;