import { useEffect, useState } from "react";
import useFormFieldErrors from "../../../../../../hooks/useFormFieldErrors";
import { ISchedule } from "../../../../../../redux/features/tour/tourSlice.interface";
import useAppSelector from "../../../../../../hooks/useAppSelector";
import { RootState } from "../../../../../../redux/store";
import { selectTourState } from "../../../../../../redux/features/tour/tourSlice";
import { formatDate } from "../../../../../../utils/format-date";

type ScheduleField = keyof Omit<ISchedule, 'id' | 'discount'>;
type DiscountField = keyof ISchedule['discount'];
type Field = ScheduleField | DiscountField;

export type IUpdateScheduleStateProps = <T extends Field>(index: number, field: T, newValue: T extends ScheduleField ? ScheduleState[T] : ScheduleState['discount'][Extract<T, DiscountField>], isDiscountField?: boolean) =>  void


export interface ScheduleState extends Omit<ISchedule, 'id'> {
    id?: string,
}

const scheduleTemplate: ScheduleState = {
    startDate: formatDate(new Date()),
    endDate: formatDate(new Date()),
    price: 0,
    availability: 0,
    discount: {
        isDiscounted: false,
    },
} 

const useScheduleForm = () => {
    const [schedule, setSchedule] = useState<ScheduleState[]>([scheduleTemplate]);
    const { tour } = useAppSelector(selectTourState);

    useEffect(() => {
        if(!tour?.schedule) return;

        // const convertedSchedule = tour.schedule.map((sch) => {
        //     const { discount, startDate, endDate } = sch;
        //     const formattedDiscount = discount.isDiscounted === true ? {
        //         ...discount,
        //         expiresAt: discount.expiresAt ? formatDate(discount.expiresAt) : '',
        //     } : { isDiscounted: false };

        //     const newSch = {
        //         ...sch,
        //         startDate: formatDate(startDate),
        //         endDate: formatDate(endDate),
        //         discount: formattedDiscount,
        //     };
        //     return newSch;
        // });
        // console.log(convertedSchedule);

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
                    const ddd = {
                        ...item,
                        discount: {
                            ...item.discount,
                            [field]: newValue,
                        },
                    };
                    return ddd;
                }

                if (Number(newValue) <= -1) {
                    return item;
                }

                return {
                    ...item,
                    [field]: newValue,
                };
            });
        
        })
    }

    const addNewSchedule = () => setSchedule(prevState => [...prevState, scheduleTemplate])

    const removeSchedule = (scheduleId: number) => {
        const newSchedule = schedule.filter((_, index) => index !== scheduleId);
        setSchedule(newSchedule);
    };

    return {
        schedule,
        updateSchedule: handleChangeSchedule,
        removeSchedule: removeSchedule,
        addSchedule: addNewSchedule,
    }
}

export default useScheduleForm;