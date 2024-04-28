import { IUserData } from "../../../services/authService";
import { CommonAction, CommonAsyncState } from "../../utils/types";
import { ICategory } from "../category/categorySlice.interface";

export type PartialRatings = {
    cleanliness: number,
    valuePrice: number,
    food: number,
    communication: number,
    attractions: number,
    atmosphere: number,
}

export type ReviewDoc =  {
    id: string,
    user: Pick<IUserData, 'login'>,
    partialRatings: PartialRatings,
    averagePartialRating: number,
    comment: string,
    createdAt: Date,
    updatedAt: Date,
};

export type ISchedule = {
    id: string,
    startDate: string,
    endDate: string,
    availability: number,
    price: number,
    discount: {
        isDiscounted: boolean;
        percentageOfDiscount: number;
        expiresAt: string;
    };
}

export type DailyItineraryDescription = {
    day: number,
    listOfActivities: string[],
}[];

export type Features = {
    firstFeature: string,
    secondFeature: string,
    thirdFeature: string,
}

type ImageInfo = {
    filePath: string,
    filePublicId: string,
}

export type DifferentSizes = {
    thumbnail: ImageInfo,
    small: ImageInfo,
    medium: ImageInfo,
    large: ImageInfo
}

export interface Image {
    fileName: string,
    fileType: string,
    originalFilePath: string,
    originalFilePublicId: string,
    originalFileSize: string,
    differentSizes: DifferentSizes,
}

export interface ITour {
    id: string,
    title: string,
    images: Image[],
    schedule: ISchedule[],
    category: ICategory,
    generalDescription: string,
    dailyItineraryDescription: DailyItineraryDescription
    reviews: ReviewDoc[] | [],
    averageGeneralRating: number,
    averagePartialRating: PartialRatings,
    purchasesCount: number;
    slug: string,
    features: Features,
    destinations: string[]
}

export type IBasket = ITourInBasket[];

export type ITourInBasket = {
    id: string,
    tourId: string,
    title: string,
    thumbnail: string,
    schedule: ISchedule,
    numberOfTravellers: number,
}

export interface ITourState extends CommonAsyncState {
    tour: null | ITour,
    filteredTours: ITour[],
    tours: ITour[],
    hasMoreFilteredTours: boolean,
    basket: IBasket | [],
};


// ACTION TYPES //

export interface AddToBasketAction {
    payload: IBasket,
    type: string,
}

export interface RemoveFromBasketAction {
    payload: string,
    type: string,
}

export interface SetBasketAction {
    payload: IBasket[],
    type: string,
}

export interface UpdateBasketAction {
    payload: Pick<ITourInBasket, 'numberOfTravellers' | 'id'>,
    type: string,
}

export interface GetTourAction extends CommonAction {
    payload: {
        data: ITour,
        showSuccessToast: boolean,
    }
}

export interface FilterToursAction extends CommonAction {
    payload: {
        data: {
            filteredTours: ITour[],
            remainingCount: number,
        }
        showSuccessToast: boolean,
    }
};

export interface GetToursAction extends CommonAction {
    payload: {
        data: ITour[],
        showSuccessToast: boolean
    }
}