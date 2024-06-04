import { DailyItineraryDescription, IFeatures, ISchedule, IDestinationAttrs, IScheduleAttrs} from "../redux/features/tour/tourSlice.interface";
import { request } from "./axios";
import toFormData from "./utils/toFormData";

const API_ADMIN_URL = '/api/admin/tours/';
const API_URL = '/api/tours/';

export interface INewTour {
    title: string,
    generalDescription: string,
    dailyItineraryDescription: DailyItineraryDescription,
    category: string,
    schedule: IScheduleAttrs[],
    images: File[],
    features: IFeatures,
    destinations: IDestinationAttrs[],
};

export interface IUpdateTour {
    title?: string,
    category?: string,
    generalDescription?: string,
    dailyItineraryDescription?: DailyItineraryDescription,
    removeImages?: string[],
    updateSchedule?: ISchedule[],
    newSchedule?:IScheduleAttrs[],
    deleteSchedule?: string[],
    features?: IFeatures,
    newDestinations?: IDestinationAttrs[],
    removeDestinations?: string[],
    images?: File[],
}

export interface IGetTours {
    tourIds: string[],
}

interface IQuery {
    category?: string,
    price?: string,
    people?: string,
    startDate?: string,
    endDate?: string,
    page: number,
    limit: number,
};

export type CreateReviewData =  {
    cleanliness: number,
    valuePrice: number,
    food: number,
    communication: number,
    attractions: number,
    atmosphere: number,
    comment: string,
};

async function createNewTour(tourData: INewTour) {
    const response = await request.post(API_ADMIN_URL, toFormData(tourData));
    return { data: response.data, showSuccessToast: true };
};

async function deleteTour(slug: string) {
    const response = await request.delete(API_ADMIN_URL + slug);
    return { data: response.data, showSuccessToast: true };
};

async function getTour(slug: string) {
    const response = await request.get(API_URL + slug);
    return { data: response.data, showSuccessToast: false };
};

async function getTours(tourIds: string[]) {
    const response = await request.get(API_URL, { params: {
        tourIds: tourIds.join(','),
    }});
    return { data: response.data, showSuccessToast: false };
};

async function filterTours(tourFilters: IQuery) {
    const response = await request.get(`${API_URL}filter`, { params: tourFilters });
    return { data: response.data, showSuccessToast: false };
}

async function updateTour(slug: string, tourData: IUpdateTour) {
    const response = await request.patch(API_ADMIN_URL + slug, toFormData(tourData));
    return { data: response.data, showSuccessToast: true };
};

// DESTINATIONS
async function getDestinations(destinationName: string) {
    const response = await request.get(API_URL + destinationName);
    return { data: response.data, showSuccessToast: false };
}

async function createReview({slug, reviewData}: { slug: string, reviewData: CreateReviewData}) {
    const response = await request.post(`${API_URL}${slug}/reviews`, reviewData);
    return { data: response.data, showSuccessToast: true };
}

async function deleteReview(id: string) {
    const response = await request.delete(`${API_URL}reviews/${id}`);
    return { data: response.data, showSuccessToast: true };
};

const tourService = {
    createNewTour,
    updateTour,
    deleteTour,
    getTour,
    filterTours,
    getTours,
    getDestinations,
    createReview,
    deleteReview,
};

export default tourService;

