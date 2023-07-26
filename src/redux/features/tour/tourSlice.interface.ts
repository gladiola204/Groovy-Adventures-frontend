import { IUserData } from "../../../services/authService";

export type IReview =  {
    _id: Object,
    user: Pick<IUserData, 'login'>,
    partialRatings: {
        cleanliness: number,
        valuePrice: number,
        food: number,
        communication: number,
        attractions: number,
        atmosphere: number,
    },
    averagePartialRating: number,
    comment: string,
};

export type ISchedule = [{
    _id: Object,
    startDate: Date,
    endDate: Date,
    availability: number,
    price: number,
    discount: {
        isDiscounted: true;
        percentageOfDiscount: number;
        expiresAt: Date;
    } | {
        isDiscounted: false;
    };
}]

export type IImage = {
    fileName: string,
    fileType: string,
    originalFilePath: string,
    originalFileSize: string,
    originalFilePublicId: string,
    differentSizes: [{
        size: string,
        filePath: string,
        filePublicId: string,
    }]
};

export interface ITour {
    title: string,
    slug: string,
    generalDescription: string,
    dailyItineraryDescription: string,
    averageRating: number,
    purchasesCount: number,
    category: string,
    schedule: ISchedule,
    reviews: IReview[],
    images: IImage[],
}