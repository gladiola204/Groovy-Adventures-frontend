import { useEffect, useMemo } from "react";
import TourCard from "./TourCard";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import SearchButton from "../../components/SearchButton";
import Header from "../../layouts/header/Header";
import { useLocation } from "react-router-dom";
import qs from 'qs';
import tourThunks from "../../redux/features/tour/tourThunks";
import '../sass/main.scss';
import { selectTourState } from "../../redux/features/tour/tourSlice";
import CategoriesList from "../../layouts/CategoriesList";


const Tours: React.FC = () => {
    const dispatch = useAppDispatch();
    const { filteredTours } = useAppSelector(selectTourState);
    const location = useLocation();

    useEffect(() => {
        if(filteredTours.length === 0) {
            const query = qs.parse(location.search, { ignoreQueryPrefix: true });
            const { page, limit } = query;

            if(page !== null && limit !== null && Number(page) && Number(limit)) {
                dispatch(tourThunks.filterTours({
                    page: Number(page),
                    limit: Number(limit),
                    ...query
                }));
            }
        }
    }, [dispatch, filteredTours]);

    const tourCard = useMemo(() => filteredTours?.map(tour => <TourCard tour={tour}/>), [filteredTours]);

    return(
        <>
            <a className="skip-to-content" href="#main">Skip to content</a>
            
            <Header variant='main'/>
            <div className='category-search-bar'>
                <CategoriesList />
                <SearchButton />
            </div>

            <main>
                <ul className='tours-list'>
                    {tourCard}
                </ul>
            </main>
        </>
    )
}

export default Tours;