import { useEffect, useState } from "react";
import { IoPricetagOutline } from "react-icons/io5";
import useFormFieldErrors from "../../../../hooks/useFormFieldErrors";
import { formatDate } from "../../../../utils/format-date";
import { ScheduleWithoutId } from "../../../../services/tourService";
import { Schedule } from "../../../../redux/features/tour/tourSlice.interface";
import useAppSelector from "../../../../hooks/useAppSelector";
import { RootState } from "../../../../redux/store";

type ScheduleField = keyof Omit<Schedule, 'id' | 'discount'>;
type DiscountField = keyof Schedule['discount'];
type Field = ScheduleField | DiscountField;

export interface ScheduleState extends Pick<Schedule, 'startDate' | 'endDate'> {
    id?: string,
    availability: number | string,
    price: number | string,
    discount: {
        isDiscounted: boolean;
        percentageOfDiscount: number | string;
        expiresAt: string;
    };
}

const scheduleTemplate: ScheduleState = {
    startDate: '',
    endDate: '',
    price: 0,
    availability: 0,
    discount: {
        isDiscounted: false,
        percentageOfDiscount: 0,
        expiresAt: '',
    },
};

const useScheduleForm = () => {
    const { generateFormErrorMessage } = useFormFieldErrors();
    const [schedule, setSchedule] = useState<ScheduleState[]>([scheduleTemplate]);
    const { tour } = useAppSelector((state: RootState) => state.tour);

    useEffect(() => {
        if(!tour?.schedule) return;

        setSchedule(tour.schedule);
    }, [tour?.schedule]);

    function handleChangeSchedule<T extends Field>(
        index: number,
        field: T,
        newValue: T extends ScheduleField ? ScheduleState[T] : ScheduleState['discount'][Extract<T, DiscountField>],
        isDiscountField: boolean = false
    ) {
        setSchedule(prev => { 
            return prev.map((item, idx) => {
                if (idx !== index) return item;
                
                if (isDiscountField) {

                    const currentFieldValue = item.discount ? item.discount[field as keyof Schedule['discount']] : undefined;
                    if (JSON.stringify(currentFieldValue) === JSON.stringify(newValue)) {
                        return item;
                    }
                    return {
                        ...item,
                        discount: {
                            ...item.discount,
                            [field]: newValue,
                        },
                    };
                }

                if (JSON.stringify(item[field as keyof ScheduleState]) === JSON.stringify(newValue) ||
                    Number(newValue) <= -1
                ) {
                    return item;
                }

                return {
                    ...item,
                    [field]: newValue,
                };
            });
        
        })
    }

    const removeSchedule = (scheduleId: number) => {
        const newSchedule = schedule.filter((_, index) => index !== scheduleId);
        setSchedule(newSchedule);
    };

    const renderScheduleForm = () => (
        <label>
            Add at least one schedule
            <ul>
                {schedule.map((schedule, index) => {
                    const { startDate, endDate, price, availability, discount } = schedule;

                    return (
                        <div key={index}>
                            <li>
                                <label>
                                    Start date of trip
                                    <input type='date' value={startDate} onChange={e => handleChangeSchedule(index, 'startDate', e.target.value)}/>
                                    {generateFormErrorMessage(`schedule[${index}].startDate`)}
                                </label>
                                
                                <label>
                                    End date of trip
                                    <input type='date' value={endDate} onChange={e => handleChangeSchedule(index, 'endDate', e.target.value)}/>
                                    {generateFormErrorMessage(`schedule[${index}].endDate`)}
                                </label>

                                <label>
                                    Price per person
                                    <input type='number' value={price} onChange={e => {
                                        const value = e.target.value;
                                        handleChangeSchedule(index, 'price', value === '' ? '' : Number(value));
                                        {generateFormErrorMessage(`schedule[${index}].price`)}
                                    }}/>
                                </label>

                                <label>
                                    Set availability of this schedule
                                    <input type='number' value={availability} onChange={e => {
                                        const value = e.target.value;
                                        handleChangeSchedule(index, 'availability', value === '' ? '' : Number(value))
                                        {generateFormErrorMessage(`schedule[${index}].availability`)}
                                    }}/>
                                </label>

                                {!schedule.discount.isDiscounted && <button type='button' onClick={_ => handleChangeSchedule(index, 'isDiscounted', true, true)}>Add discount</button>}
                                {schedule.discount.isDiscounted && <>
                                    <label>
                                        Set percentage of discount
                                        <input type='number' value={discount.percentageOfDiscount} onChange={e => {
                                            const value = e.target.value;
                                            handleChangeSchedule(index, 'percentageOfDiscount', value === '' ? '' : Number(value), true)
                                        }}
                                        />
                                    </label>
                                    <label>
                                        Set expires date of discount
                                        <input type='date' value={discount.expiresAt} onChange={e => handleChangeSchedule(index, 'expiresAt', e.target.value, true)}/>
                                    </label>
                                    <button onClick={_ => handleChangeSchedule(index, 'isDiscounted', false, true)}>Remove the discount</button>
                                </>}
                            </li>

                            {index > 0 &&
                                <button type='button' onClick={() => removeSchedule(index)}>Remove Schedule</button>
                            }
                        </div>
                    )
                }
                )}
            </ul>
            <button type='button' onClick={_ => setSchedule(prevValue => [...prevValue, scheduleTemplate])}>Add One More Schedule</button>
        </label>
    )

    return {
        renderScheduleForm,
        schedule,
    }
}

export default useScheduleForm;