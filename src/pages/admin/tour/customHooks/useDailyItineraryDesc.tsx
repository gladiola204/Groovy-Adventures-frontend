import { useEffect, useReducer } from "react";
import { DailyItineraryDescription } from "../../../../redux/features/tour/tourSlice.interface";
import useFormFieldErrors from "../../../../hooks/useFormFieldErrors";
import { v4 as uuidv4 } from 'uuid';
import useAppSelector from "../../../../hooks/useAppSelector";
import { RootState } from "../../../../redux/store";

type ItineraryAction =
    { type: 'ADD_DAY' }
  | { type: 'REMOVE_DAY'; dayIndex: number }
  | { type: 'ADD_ACTIVITY'; dayIndex: number }
  | { type: 'REMOVE_ACTIVITY'; dayIndex: number; activityIndex: number }
  | { type: 'UPDATE_ACTIVITY'; dayIndex: number; activityIndex: number; newData: string }
  | { type: 'SET_STATE'; newData: DailyItineraryDescription};

const itineraryReducer = (state: DailyItineraryDescription, action: ItineraryAction): {
    day: number;
    listOfActivities: string[];
}[] => {
    switch (action.type) {
        case 'SET_STATE':
            return action.newData;
        case 'ADD_DAY':
            return [...state, { day: state.length + 1, listOfActivities: [''] }];
        case 'REMOVE_DAY':
            return state.filter((_, index) => index !== action.dayIndex);
        case 'ADD_ACTIVITY':
            return state.map(({day, listOfActivities}, index) => index === action.dayIndex ? { day, listOfActivities: [...listOfActivities, ''] } : {day, listOfActivities});
        case 'REMOVE_ACTIVITY':
            return state.map(({day, listOfActivities}, index) => index === action.dayIndex ? { day, listOfActivities: listOfActivities.filter((_, idx) => idx !== action.activityIndex) } : {day, listOfActivities});
        case 'UPDATE_ACTIVITY':
            return state.map(({day, listOfActivities}, index) => index === action.dayIndex ? { day, listOfActivities: listOfActivities.map((activity, idx) => idx === action.activityIndex ? action.newData : activity) } : {day, listOfActivities});
        default:
            throw new Error('Nieobsługiwany typ akcji');
    }
}

const useDailyItineraryDesc = () => {
    const { generateFormErrorMessage } = useFormFieldErrors();
    const { tour } = useAppSelector((state: RootState) => state.tour);

    const [dailyItineraryDescription, dispatch] = useReducer(itineraryReducer, [{
        day: 1,
        listOfActivities: ['']
    }]);

    useEffect(() => {
        if(!tour?.dailyItineraryDescription) return;
        
        dispatch({ type: 'SET_STATE', newData: tour.dailyItineraryDescription })
    }, [tour?.dailyItineraryDescription]);

    const renderDailyItineraryDesc = () => {
        return dailyItineraryDescription.map(({ day, listOfActivities }, dayIndex) => {
            const numberOfActivities = listOfActivities.length - 1;
            const lastDay = dailyItineraryDescription.length;

            const renderListOfActivities = listOfActivities.map((activity, activityIndex) => {
                const uniqueId = uuidv4();
                return (<li key={activityIndex}>
                    <input type='text' placeholder="Write activity" value={activity} onChange={e => dispatch({type: 'UPDATE_ACTIVITY', dayIndex, activityIndex, newData: e.target.value})}/>

                    {activityIndex > 0 && 
                        <button type='button' onClick={_ => dispatch({ type: 'REMOVE_ACTIVITY', dayIndex, activityIndex })}>X</button>
                    }

                    {activityIndex === numberOfActivities && 
                        <button type='button' onClick={_ => dispatch({ type: 'ADD_ACTIVITY', dayIndex })}>Add one more activity</button>
                    }

                    {generateFormErrorMessage(`dailyItineraryDescription[${dayIndex}].listOfActivities["${activityIndex}"]`)}
                </li>
            )});
            
            return(
                <li key={day}>
                    Day {day}
                    {dayIndex > 0 &&
                        <button type='button' onClick={_ => dispatch({ type: 'REMOVE_DAY', dayIndex })}>X</button>
                    }
                    <ul>
                        {renderListOfActivities}
                    </ul>
                    {day === lastDay &&
                        <button type='button' onClick={_ => dispatch({ type: 'ADD_DAY' })}>Add one more day</button>
                    }
                </li>
            )
        });
        
    }

    return {
        dailyItineraryDescription,
        renderDailyItineraryDesc,
    }

};

export default useDailyItineraryDesc;