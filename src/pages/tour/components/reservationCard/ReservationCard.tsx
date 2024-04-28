import '../../../../sass/main.scss';
import { ImStarFull as FullStarIcon } from 'react-icons/im';
import { v4 as uuidv4 } from 'uuid';
import "react-image-gallery/styles/scss/image-gallery.scss";
import { useState } from 'react';
import CounterTravellersModal from '../../../../components/searchBar/components/CounterTravellersModal';
import useAppDispatch from '../../../../hooks/useAppDispatch';
import useCounterTravellersState from '../../../../hooks/useCounterTravellersState';
import useModalState from '../../../../hooks/useModalState';
import { selectAuthState } from '../../../../redux/features/auth/authSlice';
import { ADD_TO_BASKET } from '../../../../redux/features/tour/tourSlice';
import { formatDateRange } from '../../../../utils/format-date';
import { ITour } from '../../../../redux/features/tour/tourSlice.interface';
import validateFormData from '../../../admin/helpers/validateFormData';
import createOrderValidation from './createOrderValidation';
import useFormFieldErrors from '../../../../hooks/useFormFieldErrors';
import orderThunks from '../../../../redux/features/order/orderThunks';
import Dialog from '../../../../components/modals/shared/Dialog';
import Payment from '../../../Payment';
import { selectOrderState } from '../../../../redux/features/order/orderSlice';
import useAppSelector from '../../../../hooks/useAppSelector';

type Props = ITour

const ReservationCard: React.FC<Props> = ({ title, reviews, averageGeneralRating, schedule, id }) => {
    const { numberOfTravellers, countTravellers } = useCounterTravellersState();
    const { openedModal, handleCloseModal, handleOpenModal } = useModalState();
    const { isLoggedIn } = useAppSelector(selectAuthState);
    const { isSuccess } = useAppSelector(selectOrderState);
    const dispatch = useAppDispatch();
    const [selectedDate, setSelectedDate] = useState(schedule[0]);
    const { setError } = useFormFieldErrors();

    const handleReserveTour = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!isLoggedIn) return;
        const orderData = [{ scheduleId: selectedDate.id, numberOfParticipants: numberOfTravellers}]

        const validatedData = await validateFormData(createOrderValidation, orderData, setError);

        if(!validatedData) return;

        dispatch(orderThunks.createOrder({orderData}));
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedIdOfSchedule = event.target.value;
        const selectedSchedule = schedule.find((sch) => sch.id === selectedIdOfSchedule);

        if(!selectedSchedule) return setSelectedDate(schedule[0]);

        setSelectedDate(selectedSchedule);
    };

    const dateOptions = schedule.map(singleSchedule => {
        const dateRange =  formatDateRange(new Date(singleSchedule.startDate), new Date(singleSchedule.endDate));
        return (
            <option value={singleSchedule.id}>{dateRange}</option>
        )
    });

    const handleAddToBasket = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        const basket = {
            id: uuidv4(),
            tourId: id,
            scheduleId: selectedDate.id,
            numberOfTravellers: numberOfTravellers,
        }

        dispatch(ADD_TO_BASKET(basket));
    }

    return(
        <div className='reservation-card'>
            <h4 className='reservation-card__header'>{title}</h4>

            <div className='reservation-card__rating'>
                <FullStarIcon className='reservation-card__star'/> 
                <p className='reservation-card__rate'>
                    {averageGeneralRating} ({reviews.length} reviews)
                </p>
            </div>

            <form className='reservation-card__form' onSubmit={(e) => handleReserveTour(e)}>

                <div className="reservation-card__wrapper-inputs">

                    <button className='reservation-card__people' onClick={e => handleOpenModal('counter')}>
                        <div className=''>Who</div>
                        <div className=''>{numberOfTravellers} people</div>
                        <CounterTravellersModal isModalOpen={openedModal === 'counter'} closeModal={handleCloseModal} numberOfTravellers={numberOfTravellers} countTravellers={countTravellers}/>
                    </button>

                    <label className='reservation-card__date'>Pick dates:
                        <select name="dates" className="reservation-card__selector" onChange={handleDateChange}
                        value={selectedDate.id}>
                            {dateOptions}
                        </select>
                    </label>

                </div>

                <button className='reservation-card__reserve-btn' type='submit'>Reserve</button>
                <button className='reservation-card__reserve-btn' type='button' onClick={handleAddToBasket}>add to backpack</button>
            </form>

            <p className='reservation-card__cost-title'>Per person</p>
            <p className='reservation-card__cost'>${selectedDate.price}</p>
            <p className='reservation-card__total'>Total</p>
            <p className='reservation-card__total-price'>${selectedDate.price * numberOfTravellers}</p>


            {isSuccess ? 
                <Dialog classNameModal='' closeDialog={handleCloseModal} shouldBeOpen={isSuccess}>
                    <Payment/>
                </Dialog>
                : null
            }
        </div>
    )
};

export default ReservationCard;