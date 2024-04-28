import * as Yup from 'yup';


export interface IOrderData {
    orderData: {
        scheduleId: string,
        numberOfParticipants: number,
    }[],
};


const createOrderValidation = Yup.array().of(Yup.object().shape({
    scheduleId: Yup.string().trim().required(),
    numberOfParticipants: Yup.number().integer().required(),
}));

export default createOrderValidation;