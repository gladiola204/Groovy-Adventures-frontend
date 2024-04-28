import ImageGallery from "react-image-gallery";

import "react-image-gallery/styles/scss/image-gallery.scss";
import { useEffect, useState } from "react";
import clsx from "clsx";
import useAppDispatch from "../../hooks/useAppDispatch";
import { RootState } from "../../redux/store";
import useAppSelector from "../../hooks/useAppSelector";
import { useParams } from "react-router-dom";
import tourThunks from "../../redux/features/tour/tourThunks";
import ReviewsSection from "./components/reviewsSection/ReviewsSection";
import DepartureDaysSection from "./components/DepartureDaysSection";
import JourneyPlanSection from "./components/JourneyPlanSection";
import ReservationCard from "./components/reservationCard/ReservationCard";
import { selectTourState } from "../../redux/features/tour/tourSlice";

type ActiveSection = "general" | "journey-plan" | "date" | "reviews";

type ImageObject = {
    original: string,
    thumbnail: string,
    originalClass: string,
}

const Tour: React.FC = () => {
    const { slug } = useParams();
    const dispatch = useAppDispatch();
    const { tour, isError, errorMessage } = useAppSelector(selectTourState);
    const [activeSection, setActiveSection] = useState<ActiveSection>('general');
    const [images, setImages] = useState<ImageObject[]>([
        {
            original: "https://picsum.photos/id/1018/1000/600/",
            thumbnail: "https://picsum.photos/id/1018/250/150/",
            originalClass: 'photos-gallery__img'
        }
    ]);

    useEffect(() => {
        if (slug && slug !== tour?.slug) {
            dispatch(tourThunks.getTour(slug));
        }
    }, [isError, errorMessage, dispatch, slug]);

    useEffect(() => {
        if(tour !== null) {
            let newImages: ImageObject[] = [];

            tour?.images.forEach(image => {
                newImages.push({
                    original: image.originalFilePath,
                    thumbnail: image.differentSizes['thumbnail'].filePath,
                    originalClass: 'photos-gallery__img',
                });
            });

            setImages([...newImages]);
        };
    }, [tour]);

    const handleChangeActiveSection = (section: ActiveSection) => setActiveSection(section);

    const sectionClassNames = (section: ActiveSection) => {
        return clsx(`tour-page__info-section--${section} tour-page__info-section`, {
            "tour-page__info-section--hidden": activeSection !== section
        })
    };

    const navLinkClassName = (section: ActiveSection) => {
        return clsx("tour-page__nav-link", {
            "tour-page__nav-link--active": activeSection === section
        })
    };

    return(
        <div className='tour-page'>
            <div className="photos-gallery">
                <ImageGallery items={images} />
            </div>
            
            {tour ? <ReservationCard {...tour} /> : null}       

            <section className='tour-page__info'>
                <nav className='tour-page__nav'>
                    <ul className='tour-page__nav-list'>
                        <li onClick={e => handleChangeActiveSection('general')} className={navLinkClassName('general')}>General</li>
                        <li onClick={e => handleChangeActiveSection('journey-plan')} className={navLinkClassName('journey-plan')}>Journey Plan</li>
                        <li onClick={e => handleChangeActiveSection('date')} className={navLinkClassName("date")}>Date</li>
                        <li onClick={e => handleChangeActiveSection('reviews')} className={navLinkClassName('reviews')}>Reviews ({tour?.reviews.length})</li>
                    </ul>
                </nav>

                <section className={sectionClassNames('general')}>
                    <p className="tour-page__info-paragraph">{tour?.generalDescription}</p>

                    <p className="tour-page__info-paragraph">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid eius provident veniam <span className="tour-page__info-paragraph--bold">laudantium</span> recusandae fugit ea rerum quidem porro? Ratione repellendus recusandae ducimus repudiandae incidunt eum perferendis ipsam ipsa aliquid.</p>
                </section>

                <section className={sectionClassNames('journey-plan')}>
                    <JourneyPlanSection/>
                </section>

                <section className={sectionClassNames('date')}>
                    <DepartureDaysSection/>
                </section>

                <section className={sectionClassNames('reviews')}>
                    <ReviewsSection/>
                </section>
            </section>
        </div>
    )
};
export default Tour;
