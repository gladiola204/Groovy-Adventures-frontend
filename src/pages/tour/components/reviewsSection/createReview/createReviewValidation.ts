import * as Yup from 'yup';


const createReviewValidation = Yup.object().shape({
    cleanliness: Yup.number().min(1).max(5).integer().required(),
    valuePrice: Yup.number().min(1).max(5).integer().required(),
    food: Yup.number().min(1).max(5).integer().required(),
    communication: Yup.number().min(1).max(5).integer().required(),
    attractions: Yup.number().min(1).max(5).integer().required(),
    atmosphere: Yup.number().min(1).max(5).integer().required(),
    comment: Yup.string().max(1000).min(10).trim().required(),
})

export default createReviewValidation;