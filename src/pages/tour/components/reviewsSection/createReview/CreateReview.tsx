import { useState } from "react";
import useAppSelector from "../../../../../hooks/useAppSelector";
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'
import { PartialRatings } from "../../../../../redux/features/tour/tourSlice.interface";
import validateFormData from "../../../../admin/helpers/validateFormData";
import createReviewValidation from "./createReviewValidation";
import useFormFieldErrors from "../../../../../hooks/useFormFieldErrors";
import useAppDispatch from "../../../../../hooks/useAppDispatch";
import tourThunks from "../../../../../redux/features/tour/tourThunks";
import { selectTourState } from "../../../../../redux/features/tour/tourSlice";


const CreateReview: React.FC = () => {
    const { tour } = useAppSelector(selectTourState);
    const { setError } = useFormFieldErrors();
    const dispatch = useAppDispatch();
    
    const [partialRatings, setPartialRatings] = useState<PartialRatings>({
        cleanliness: 5,
        valuePrice: 5,
        food: 5,
        communication: 5,
        attractions: 5,
        atmosphere: 5,
    });
    const [comment, setComment] = useState('');

    const changePartialRating = (key: keyof PartialRatings, rate: number) => setPartialRatings(prevValue => ({
        ...prevValue,
        [key]: rate,
    }))

    const rating = Object.keys(partialRatings).map((key) => (
        <li>
            <label>
                <h3>{key}</h3>
                <Rater total={5} rating={partialRatings[key as keyof PartialRatings]} onRate={({rating}) => changePartialRating(key as keyof PartialRatings, rating)}/>
            </label>
        </li>
    ));

    const handleSubmitForm = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = {...partialRatings, comment};

        const validatedData = await validateFormData(createReviewValidation, formData, setError);

        if(!validatedData || !tour?.slug) return;

        dispatch(tourThunks.createReview({slug: tour.slug, reviewData: formData}))
    }
      
    return(
        <form onSubmit={handleSubmitForm}>
            Please rate:
            <ul>
                {rating}
            </ul>

            <label>
                Please add a comment
                <textarea maxLength={500} cols={4} rows={4} value={comment} onChange={e => setComment(e.target.value)}/>
            </label>
            <button type='submit'>Submit the review</button>
        </form>
    )
};

export default CreateReview;