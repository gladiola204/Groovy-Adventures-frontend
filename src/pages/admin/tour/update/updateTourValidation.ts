import * as Yup from 'yup';

const requiredFieldMsg = 'The field is required';

export interface IUpdateTour {
    removeImages?: string[],
}

const updateTourValidationSchema = Yup.object().shape({
    title: Yup.string(),
    category: Yup.string(),
    dailyItineraryDescription: Yup.array().of(Yup.object().shape({
        day: Yup.number()
        .positive('Day must be a positive number')
        .integer('Day must be an integer')
        .required('Day is required'),
        listOfActivities: Yup.array()
        .of(Yup.string().required('The input cannot be empty'))
        .min(1, 'At least one activity is required')
        .required()
    })),
    destinations: Yup.array().of(Yup.string()),
    features: Yup.object().shape({
        firstFeature: Yup.string(),
        secondFeature: Yup.string(),
        thirdFeature: Yup.string(),
    }),
    newSchedule: Yup.array().of(Yup.object().shape({
        startDate: Yup.string().required(requiredFieldMsg).test('is-discounted-validation', 'The start date should be later than today', function(value) {
            if (new Date(value) <= new Date()) {
                return false;
            }
            return true;
        }),
        endDate: Yup.string().required(requiredFieldMsg).test('is-discounted-validation', 'The end date should be later than start date', function(value) {
            const { startDate } = this.parent;
            if(!value) {
                return false;
            }
            if (new Date(value) <= new Date() || new Date(startDate) >= new Date(value)) {
                return false;
            }
            return true;
        }).required(requiredFieldMsg),
        price: Yup.number().positive('Price must be a positive number').min(1).required(requiredFieldMsg),
        availability: Yup.number().positive().integer().min(1).required(requiredFieldMsg),
        discount: Yup.object().shape({
            isDiscounted: Yup.boolean(),
            percentageOfDiscount: Yup.number().test('is-discounted-validation', 'Niepoprawna wartość zniżki', function(value) {
                const { isDiscounted } = this.parent;
                if (isDiscounted && (value === undefined || value <= 0 || !Number.isInteger(value))) {
                    return false;
                }
                return true;
            }),
            expiresAt: Yup.date().test('is-discounted-validation', 'Niepoprawna wartość zniżki', function(value) {
                const { isDiscounted } = this.parent;

                if(!isDiscounted) {
                    return true;
                } else if (value === undefined || value <= new Date()) {
                    return false;
                }
                return true;
            }),
        }),
    }).optional()),
    updateSchedule: Yup.array().of(Yup.object().shape({
        id: Yup.string().required('Id of updated schedule is required'),
        startDate: Yup.string().required(requiredFieldMsg).test('is-discounted-validation', 'The start date should be later than today', function(value) {
            if (new Date(value) <= new Date()) {
                return false;
            }
            return true;
        }),
        endDate: Yup.string().required(requiredFieldMsg).test('is-discounted-validation', 'The end date should be later than start date', function(value) {
            const { startDate } = this.parent;
            if(!value) {
                return false;
            }
            if (new Date(value) <= new Date() || new Date(startDate) >= new Date(value)) {
                return false;
            }
            return true;
        }).required(requiredFieldMsg),
        price: Yup.number().positive('Price must be a positive number').min(1).required(requiredFieldMsg),
        availability: Yup.number().positive().integer().min(1).required(requiredFieldMsg),
        discount: Yup.object().shape({
            isDiscounted: Yup.boolean(),
            percentageOfDiscount: Yup.number().test('is-discounted-validation', 'Niepoprawna wartość zniżki', function(value) {
                const { isDiscounted } = this.parent;
                if (isDiscounted && (value === undefined || value <= 0 || !Number.isInteger(value))) {
                    return false;
                }
                return true;
            }),
            expiresAt: Yup.date().test('is-discounted-validation', 'Niepoprawna wartość zniżki', function(value) {
                const { isDiscounted } = this.parent;

                if(!value && !isDiscounted) {
                    return true;
                } else if (isDiscounted && value !== undefined && value <= new Date()) {
                    return false;
                }
                return true;
            }),
        }).optional(),
    })),
    deleteSchedule: Yup.array().of(Yup.string()),
    removeImages: Yup.array().of(Yup.string()),
    generalDescription: Yup.string(),
    images: Yup.array().min(1, 'Please upload at least one image'),
  });

  export default updateTourValidationSchema;