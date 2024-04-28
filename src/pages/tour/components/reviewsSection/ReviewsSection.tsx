import useAppSelector from "../../../../hooks/useAppSelector";
import Review from "./Review";
import CreateReview from "./createReview/CreateReview";
import { selectTourState } from "../../../../redux/features/tour/tourSlice";
import { selectAuthState } from "../../../../redux/features/auth/authSlice";
import { ImStarFull as FullStarIcon } from 'react-icons/im';
import { useMemo } from "react";
import PartialRatingList from "./RatingList";

const ReviewsSection: React.FC = () => {
    const { user } = useAppSelector(selectAuthState);
    const { tour } = useAppSelector(selectTourState);
    
    const isUserBoughtTour = user?.purchasedTours.includes(tour ? tour.id : '');

    const generateReviews = useMemo(() => tour?.reviews.map(review => <Review
        review={review}
    />),
    [tour?.reviews])

    return(
        <div>
            <div className='flex-row flex-row--flex-start'>
                <FullStarIcon className=''/> 
                <p className=''>
                    {tour?.averageGeneralRating} ({tour?.reviews.length} reviews)
                </p>
            </div>

            {tour?.averagePartialRating && 
                <PartialRatingList ratings={tour.averagePartialRating}/>
            }


            {isUserBoughtTour && 
                <CreateReview/>
            }

            <ul>
                {generateReviews}
            </ul>
        </div>
    )
};

export default ReviewsSection;