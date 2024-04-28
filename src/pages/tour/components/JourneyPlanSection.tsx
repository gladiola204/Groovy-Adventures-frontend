import useAppSelector from "../../../hooks/useAppSelector";
import { selectTourState } from "../../../redux/features/tour/tourSlice";


const JourneyPlanSection = () => {
    const { tour } = useAppSelector(selectTourState);

    const renderJourneyPlan = tour?.dailyItineraryDescription.map((desc, index) => (
        <li key={index}>
            <h5 className="tour-page__info-header">Day {desc.day}:</h5>
            <ul className='p-bottom-medium'>
                {desc.listOfActivities.map((activity, index) => (
                    <li className="tour-page__day-info" key={index}>{activity}</li>
                ))}
            </ul>
        </li>
    ));

    return(
        <ul>
            {renderJourneyPlan}
        </ul>
    )
};

export default JourneyPlanSection;