import { IImage, IReview, ISchedule} from "../redux/features/tour/tourSlice.interface";
import request from "./axios";

const API_ADMIN_URL = '/api/admin/tours/';
const API_URL = '/api/tours/';

export interface INewTour {
    title: string,
    generalDescription: string,
    dailyItineraryDescription: string,
    category: string,
    schedule: Omit<ISchedule, '_id'>,
    images: IImage[],
};

export interface IUpdateTour {
    title?: string,
    category?: string,
    generalDescription?: string,
    dailyItineraryDescription?: string,
    updatedSchedules?: ISchedule,
    newSchedules?: Omit<ISchedule, '_id'>,
    deletedSchedules?: Object[],
    idOfImagesToRemove?: Object[],
}

async function createNewTour(tourData: INewTour) {
    const response = await request.post(API_ADMIN_URL, tourData);
    return response.data;
};

async function deleteTour(slug: string) {
    const response = await request.delete(API_ADMIN_URL + slug);
    return response.data;
};

async function getTour(slug: string) {
    const response = await request.get(API_URL + slug);
    return response.data;
};

async function getTours(tourFilters: string) {
    const response = await request.get(API_URL + tourFilters);
    return response.data;
}

async function updateTour(slug: string, tourData: IUpdateTour) {
    const response = await request.patch(API_ADMIN_URL + slug, tourData);
    return response.data;
};

async function createReview({slug, reviewData}: { slug: string, reviewData: Omit<IReview, 'averagePartialRating' | '_id'>}) {
    const response = await request.post(`${API_URL}${slug}/reviews`, reviewData);
    return response.data;
}

async function deleteReview(id: string) {
    const response = await request.delete(`${API_URL}reviews/${id}`);
    return response.data;
};

const tourService = {
    createNewTour,
    updateTour,
    deleteTour,
    getTour,
    getTours,
    createReview,
    deleteReview,
};

export default tourService;

