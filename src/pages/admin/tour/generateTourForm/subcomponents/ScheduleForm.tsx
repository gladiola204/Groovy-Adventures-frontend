import { useEffect, useState } from "react";
import useFormFieldErrors from "../../../../../hooks/useFormFieldErrors";
import { IUpdateScheduleStateProps, ScheduleState } from "../../customHooks/useTourDataState/helperHooks/useScheduleForm";
import { formatDate } from "../../../../../utils/format-date";

interface Props {
    state: ScheduleState[],
    update: IUpdateScheduleStateProps,
    remove: (scheduleId: number) => void,
    add: () => void,
};

type Discount = {
    isDiscounted: boolean;
    expiresAt?: string;
    percentageOfDiscount?: string;
};

interface FormattedState {
    id?: string,
    startDate: string,
    endDate: string,
    discount: Discount,
    availability: string,
    price: string,
}

const formatState = (state: ScheduleState[]) => state.map(sch => {
    let { startDate, endDate, discount } = sch;
    const formattedDate = (data: string) => formatDate(new Date(data), 'YYYY-MM-DD');

    startDate = formattedDate(startDate);
    endDate = formattedDate(endDate);
    const price= `${sch.price}`;
    const availability = `${sch.availability}`;
    const percentageOfDiscount = sch.discount.percentageOfDiscount ? `${sch.discount.percentageOfDiscount}` : '';
    const expiresAt = discount.expiresAt ? formattedDate(discount.expiresAt) : undefined;

    const formattedDiscount: Discount = sch.discount.isDiscounted === true ? {
        ...sch.discount,
        expiresAt,
        percentageOfDiscount,
    } : { 
        isDiscounted: false 
    };

    const newObj: FormattedState = {
        startDate,
        endDate,
        price,
        availability,
        discount: formattedDiscount,
    };

    return newObj
})


const ScheduleForm: React.FC<Props> = ({ state, update, remove, add }) => {
    const { generateFormErrorMessage } = useFormFieldErrors();
    const [formattedState, setFormattedState] = useState<FormattedState[]>(formatState(state));
    
    useEffect(() => setFormattedState(formatState(state)), [state])

    return(
        <>
            <ul>
                {formattedState.map((schedule, index) => {
                    const { startDate, endDate, price, availability, discount } = schedule;

                    return (
                        <div key={index}>
                            <li>
                                <label>
                                    Start date of trip
                                    <input type='date' value={startDate} onChange={({ target }) => update(index, 'startDate', formatDate(new Date(target.value)))}/>
                                    {generateFormErrorMessage(`schedule[${index}].startDate`)}
                                </label>
                                
                                <label>
                                    End date of trip
                                    <input type='date' value={endDate} onChange={({ target }) => update(index, 'endDate', formatDate(new Date(target.value)))}/>
                                    {generateFormErrorMessage(`schedule[${index}].endDate`)}
                                </label>

                                <label>
                                    Price per person
                                    <input type='number' value={price} onChange={e => {
                                        const value = e.target.value;
                                        update(index, 'price', value === '' ? 0 : Number(value));
                                        {generateFormErrorMessage(`schedule[${index}].price`)}
                                    }}/>
                                </label>

                                <label>
                                    Set availability of this schedule
                                    <input type='number' value={availability} onChange={e => {
                                        const value = e.target.value;
                                        update(index, 'availability', value === '' ? 0 : Number(value))
                                        {generateFormErrorMessage(`schedule[${index}].availability`)}
                                    }}/>
                                </label>

                                {!schedule.discount.isDiscounted ? 
                                <button 
                                    type='button' 
                                    onClick={_ => update(index, 'isDiscounted', true, true)}>
                                        Add discount
                                </button> :

                                <>
                                    <label>
                                        Set percentage of discount
                                        <input type='number' value={discount.percentageOfDiscount} onChange={e => {
                                            const value = e.target.value;
                                            update(index, 'percentageOfDiscount', value === '' ? 0 : Number(value), true)
                                        }}
                                        />
                                    </label>

                                    <label>
                                        Set expires date of discount
                                        <input type='date' value={discount.expiresAt} onChange={({ target }) => update(index, 'expiresAt', formatDate(new Date(target.value)), true)}/>
                                    </label>
                                    
                                    <button onClick={_ => update(index, 'isDiscounted', false, true)}>Remove the discount</button>
                                </>}
                            </li>

                            {index > 0 ?
                                <button type='button' onClick={() => remove(index)}>Remove Schedule</button>
                            : null}
                        </div>
                    )
                }
                )}
            </ul>
            <button type='button' onClick={add}>Add One More Schedule</button>
    </>)
};

export default ScheduleForm;