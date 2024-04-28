import { IoIosArrowForward as ArrowRightIcon } from 'react-icons/io';
import { ReviewDoc } from '../../../../redux/features/tour/tourSlice.interface';
import useAppSelector from '../../../../hooks/useAppSelector';
import { selectAuthState } from '../../../../redux/features/auth/authSlice';
import useAppDispatch from '../../../../hooks/useAppDispatch';
import tourThunks from '../../../../redux/features/tour/tourThunks';

interface Props {
    review: ReviewDoc
}

const Review: React.FC<Props> = ({ review }) => {
    const { user } = useAppSelector(selectAuthState);
    const { login, role } = user;
    const dispatch = useAppDispatch();
    const reviewDate = new Date(review.createdAt);
    const month = reviewDate.toLocaleString('default', { month: 'long' })
    const year = reviewDate.getFullYear();

    const isUserAllowedToDeleteReview = login === review.user.login || role === 'admin';

    const handleDeleteReview = () => {
        dispatch(tourThunks.deleteReview(review.id));
    }

    return (
        <li className="tour-page__review" key={review.id.toString()}>
            <h5 className="tour-page__review-header">
                <span className="tour-page__user-rate tour-page__bigger-rate">{review.averagePartialRating}</span>
                <span className='tour-page__user-rate'>/5</span> 
                <span className="flex-column flex-column--align-left">
                    {review.user.login}
                    <span className="tour-page__review-date">
                        {month}, {year}
                    </span>
                </span>
            </h5>

            <p className='tour-page__comment'>{review.comment}</p>

            {review.comment.length > 400 && 
            <button className="tour-page__btn-show-more flex-row">
                Show more <ArrowRightIcon className="tour-page__arrow-right"/>
            </button>}

            {isUserAllowedToDeleteReview && 
            <button onClick={handleDeleteReview}>
                Delete the review
            </button>}
        </li>
    );
};

export default Review;