import { ImStarHalf as HalfStarIcon, ImStarFull as FullStarIcon, ImStarEmpty as EmptyStarIcon } from 'react-icons/im';
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from 'react';
import { HeartSwitch } from '@anatoliygatt/heart-switch';
import { ITour } from '../../redux/features/tour/tourSlice.interface';
import { selectAuthState } from '../../redux/features/auth/authSlice';
import { useSelector } from 'react-redux';
import useAppDispatch from '../../hooks/useAppDispatch';
import authThunks from '../../redux/features/auth/authThunks';

interface Props {
    tour: ITour
}

const TourCard: React.FC<Props> = ({ tour }) => {
    const [checked, setChecked] = useState(false);
    const { schedule, features, averageGeneralRating, title, generalDescription, slug, images, id } = tour;
    const { isLoggedIn } = useSelector(selectAuthState);
    const dispatch = useAppDispatch();
    const [firstlyInstalled, setFirstlyInstalled] = useState(false);

    useEffect(() => {
        if(checked) {
            if(isLoggedIn) {
                dispatch(authThunks.addToWishlist({tourId: id}));
            }
        } else {
            if(isLoggedIn && firstlyInstalled) {
                dispatch(authThunks.removeFromWishlist(id));
            }
        }
        setFirstlyInstalled(true);
    }, [checked]);

    const cheapestPrice = schedule.reduce((minPrice, product) => {
        return product.price < minPrice ? product.price : minPrice;
    }, Infinity);

    const renderStars = useMemo(() => {
        const number = averageGeneralRating;
        const fullStars = Math.floor(number);
        const halfStar = () => {
            if(number - fullStars < 1 && number - fullStars > 0) {
                return 1;
            }
            return 0;
        }
        const emptyStars = 5 - fullStars - halfStar();
        const stars = [];
    
        for (let i = 0; i < fullStars; i++) {
          stars.push(<FullStarIcon className='tours-list__star-icon tours-list__star-icon--1'/>);
        }
    
        if (halfStar()) {
          stars.push(<HalfStarIcon className='tours-list__star-icon tours-list__star-icon--5'/>);
        }

        for (let i = 0; i < emptyStars; i++) {
            stars.push(<EmptyStarIcon className='tours-list__star-icon tours-list__star-icon--5'/>);
        }
        return stars;
    }, [averageGeneralRating]);

    const shortDescription = generalDescription.slice(0, 50) + '...';

    const transformedFeatures = Object.entries(features).map(([key, value]) => (
        <li key={key} className='tours-list__feature'>
            <h5 className='tours-list__feature-header tours-list__feature-header--1'>Feature</h5>
            <p className='tours-list__feature-paragraph tours-list__feature-paragraph--1'>{value}</p>
        </li>
    ));

    return(
        <li className="tours-list__card">
            <div className='tours-list__top-section-wrapper'>
                <p className="tours-list__price">from ${cheapestPrice}</p>
                <span className='tours-list__heart-icon'>
                    <HeartSwitch
                    size="sm"
                    inactiveTrackFillColor="hsla(0 0% 0% / 0.4)"
                    inactiveTrackStrokeColor="#ffffff"
                    activeTrackFillColor="#ffffff"
                    activeTrackStrokeColor="#ffffff"
                    inactiveThumbColor="#ecfeff"
                    activeThumbColor="hsla(0 0% 0% / 0.2)"
                    checked={checked}
                    onChange={(event) => {
                        setChecked(event.target.checked);
                    }}
                    aria-label="Add to wishlist"
                    />
                </span>
                <img src={images[0].originalFilePath} className='tours-list__img'/>
            </div>
            <div className='tours-list__down-section-wrapper'>
                <div className='tours-list__left-wrapper'>
                    <h4 className='tours-list__name'>{title}</h4>
                    <p className="tours-list__description">{shortDescription}</p>
                    {renderStars}
                </div>

                <ul className='tours-list__features-list'>
                    {transformedFeatures}
                </ul>
                
                <Link to={`/tour/${slug}`} className="btn-pill tours-list__details-link">More details</Link>
            </div>
        </li>
    )
};

export default TourCard;