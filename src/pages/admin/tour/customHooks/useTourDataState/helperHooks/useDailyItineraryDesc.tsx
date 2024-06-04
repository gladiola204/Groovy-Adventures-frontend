import {useEffect, useReducer } from "react";
import { DailyItineraryDescription } from "../../../../../../redux/features/tour/tourSlice.interface";
import useAppSelector from "../../../../../../hooks/useAppSelector";
import { selectTourState } from "../../../../../../redux/features/tour/tourSlice";
export type ItineraryAction =
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
    const { tour } = useAppSelector(selectTourState);
    const [dailyItineraryDescription, dispatch] = useReducer(itineraryReducer, [{
        day: 1,
        listOfActivities: ['']
    }]);
    
    useEffect(() => {
        if(!tour?.dailyItineraryDescription) return;
    
        dispatch({ type: 'SET_STATE', newData: tour.dailyItineraryDescription });
    }, [tour?.dailyItineraryDescription]);
    
    return {
        dailyItineraryDescription,
        changeDailyItineraryDescription: dispatch
    }

};

export default useDailyItineraryDesc;