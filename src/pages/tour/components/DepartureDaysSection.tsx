import useAppSelector from "../../../hooks/useAppSelector";
import { selectTourState } from "../../../redux/features/tour/tourSlice";
import { formatDate } from "../../../utils/format-date";

const DepartureDaysSection: React.FC = () => {
    const { tour } = useAppSelector(selectTourState);

    const renderDepartureDays = tour?.schedule.map((singleSchedule, index) => {
        const startDate = formatDate(new Date(singleSchedule.startDate));
        const endDate = formatDate(new Date(singleSchedule.endDate));

        return <li className="tour-page__day-info" key={index}>{startDate} - {endDate}</li>
    })
    
    return(
        <>
            <h5 className="tour-page__info-header tour-page__border-bottom p-bottom-small">Possible departure dates:</h5>
            <ul className="tour-page__day-info-list">
                {renderDepartureDays}
            </ul>
        </>
    )
};

export default DepartureDaysSection;