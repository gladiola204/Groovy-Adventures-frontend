import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import useCategoriesSelector from "../../../hooks/useCategoriesSelector";
import useFormFieldErrors from "../../../hooks/useFormFieldErrors";
import useImageUpload, { ImageState } from "../../../hooks/useImageUpload";
import useDailyItineraryDesc from "./customHooks/useDailyItineraryDesc";
import useFeaturesState from "./customHooks/useFeaturesState";
import useScheduleForm, { ScheduleState } from "./customHooks/useScheduleForm";
import useSelectedCategory from "./customHooks/useTourCategories";
import useAppSelector from "../../../hooks/useAppSelector";
import { RootState } from "../../../redux/store";
import { DailyItineraryDescription, Features, Schedule } from "../../../redux/features/tour/tourSlice.interface";

interface Props {
    handleSubmitForm: (formData: FormTourData) => Promise<void>,
    goal: 'create' | 'update',
    showFetchedImgs?: JSX.Element[] | undefined
    handleRemoveTour?: () => Promise<void>
}

export interface FormTourData {
    title: string,
    category: string,
    generalDescription: string,
    dailyItineraryDescription: DailyItineraryDescription,
    features: Features,
    destinations: string[],
    images: File[],
    schedule: FormattedSchedule[]
}

export interface FormattedSchedule extends Pick<Schedule, 'startDate' | 'endDate'> {
    id?: string,
    availability: number,
    price: number,
    discount: {
        isDiscounted: boolean;
        percentageOfDiscount: number;
        expiresAt: string;
    };
}

const GenerateTourForm: React.FC<Props> = ({ handleSubmitForm, goal, showFetchedImgs, handleRemoveTour }) => {
    const { tour, isLoading, isError, errorMessage } = useAppSelector((state: RootState) => state.tour);

    const { schedule, renderScheduleForm } = useScheduleForm();
    const { dailyItineraryDescription, renderDailyItineraryDesc } = useDailyItineraryDesc();
    const { selectedCategory, handleChangeSelectedCategory } = useSelectedCategory();
    const { categories } = useCategoriesSelector();
    const { features, renderFeaturesInputs } = useFeaturesState();
    const [generalDescription, setGeneralDescription] = useState(tour?.generalDescription ? tour?.generalDescription : '');
    const [destinations, setDestinations] = useState(tour?.destinations ? tour?.destinations : '');
    const [title, setTitle] = useState(tour?.title ? tour?.title : '');
    const { selectedImages, handleImageChange, resetImages } = useImageUpload();
    const { generateFormErrorMessage } = useFormFieldErrors();

    useEffect(() => {
        if (tour) {
          setTitle(tour.title);
          setGeneralDescription(tour.generalDescription || '');
          setDestinations(tour.destinations.join(', '));
        }
    }, [tour]);

    const renderCategoriesOptions = () => categories.map(category => (
        <option value={category.slug}>{category.title}</option>
    ));

    const showImagesThumbnail = () => selectedImages.map(img => <img src={img.preview} style={{ width: "100px" }}/>);

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formattedSchedule: FormattedSchedule[] = schedule.map(singleSchedule => {
            let { availability, price, discount } = singleSchedule
            availability = Number(availability);
            price = Number(price);
            discount.percentageOfDiscount = Number(discount.percentageOfDiscount);
            return singleSchedule as FormattedSchedule;
        })

        handleSubmitForm({
            title,
            category: selectedCategory,
            schedule: formattedSchedule,
            dailyItineraryDescription,
            generalDescription: generalDescription === '<p><br></p>' ? '' : generalDescription,
            features,
            images: selectedImages.map(img => img.data),
            destinations: typeof destinations === 'string' ? destinations.split(', ') : destinations
        })
    }

    return(
        <>
            {errorMessage ? errorMessage : 
            <form onSubmit={submit} encType="multipart/form-data">
                Create a new tour:
                <label>
                    Title
                    <input type='text' value={title} onChange={e => setTitle(e.target.value)}/>
                    {generateFormErrorMessage('title')}
                </label>
                <label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => handleImageChange(e.target.files)}
                    />

                    {showImagesThumbnail()}
                    {showFetchedImgs}
                    {generateFormErrorMessage('images')}
                </label>

                <label>
                    Choose a category of the tour
                    <select name="categories" value={selectedCategory} onChange={e => handleChangeSelectedCategory(e.target.value)}>
                        {renderCategoriesOptions()}
                    </select>
                </label>

                <label>
                    Write general description of the tour
                    <ReactQuill theme="snow" value={generalDescription} onChange={setGeneralDescription} />;
                    {generateFormErrorMessage('generalDescription')}
                </label>

                <label>
                    Daily itinerary description
                    <ul>
                        {renderDailyItineraryDesc()}
                    </ul>
                </label>

                <label>
                    Write 3 short features of the trip
                    {renderFeaturesInputs()}
                </label>

                <label>
                    Write destinations separated by comma
                    <input type='text' value={destinations} onChange={e => setDestinations(e.target.value)}/>
                    {generateFormErrorMessage('destinations')}
                </label>

                {renderScheduleForm()}

                <button type='submit'>{goal} the tour</button>
                {goal === 'update' && 
                    <button type='button' onClick={handleRemoveTour}>Remove the tour</button>
                }
            </form>}
        </>
        
    )
};

export default GenerateTourForm;