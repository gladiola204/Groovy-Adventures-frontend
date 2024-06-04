import { useEffect } from "react";
import useAppSelector from "../../../../../hooks/useAppSelector";
import useFormFieldErrors from "../../../../../hooks/useFormFieldErrors";
import { selectTourState } from "../../../../../redux/features/tour/tourSlice";
import { DailyItineraryDescription } from "../../../../../redux/features/tour/tourSlice.interface";
import { ItineraryAction } from "../../customHooks/useTourDataState/helperHooks/useDailyItineraryDesc";

interface Props {
    state: DailyItineraryDescription,
    changeState: React.Dispatch<ItineraryAction>
}

const DailyItineraryDescList: React.FC<Props> = ({ state, changeState }) => {
    const { generateFormErrorMessage } = useFormFieldErrors();

    return (
        <ul>
            { state.map(({ day, listOfActivities }, dayIndex) => {
                const numberOfActivities = listOfActivities.length - 1;
                const lastDay = state.length;

                const renderListOfActivities = listOfActivities.map((activity, activityIndex) => {
                    return (<li key={activityIndex}>
                        <input type='text' placeholder="Write activity" value={activity} onChange={e => changeState({type: 'UPDATE_ACTIVITY', dayIndex, activityIndex, newData: e.target.value})}/>

                        {activityIndex > 0 && 
                            <button type='button' onClick={_ => changeState({ type: 'REMOVE_ACTIVITY', dayIndex, activityIndex })}>X</button>
                        }

                        {activityIndex === numberOfActivities && 
                            <button type='button' onClick={_ => changeState({ type: 'ADD_ACTIVITY', dayIndex })}>Add one more activity</button>
                        }

                        {generateFormErrorMessage(`dailyItineraryDescription[${dayIndex}].listOfActivities["${activityIndex}"]`)}
                    </li>
                )});
                
                return(
                    <li key={day}>
                        Day {day}
                        {dayIndex > 0 &&
                            <button type='button' onClick={_ => changeState({ type: 'REMOVE_DAY', dayIndex })}>X</button>
                        }
                        <ul>
                            {renderListOfActivities}
                        </ul>
                        {day === lastDay &&
                            <button type='button' onClick={_ => changeState({ type: 'ADD_DAY' })}>Add one more day</button>
                        }
                    </li>
                )
            })}
        </ul>
    );
};

export default DailyItineraryDescList;