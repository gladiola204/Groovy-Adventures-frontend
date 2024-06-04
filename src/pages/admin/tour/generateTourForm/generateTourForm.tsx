import { useEffect, useMemo} from "react";
import ReactQuill from "react-quill";
import useFormFieldErrors from "../../../../hooks/useFormFieldErrors";
import useAppSelector from "../../../../hooks/useAppSelector";
import { DailyItineraryDescription, IFeatures, IDestinationAttrs, ISchedule, ITour } from "../../../../redux/features/tour/tourSlice.interface";
import { selectTourState } from "../../../../redux/features/tour/tourSlice";
import useTourDataState from "../customHooks/useTourDataState/useTourDataState";
import DestinationList from "./subcomponents/DestinationList";
import useCategoriesState from "../../../../hooks/useCategoriesState";
import ScheduleForm from "./subcomponents/ScheduleForm";
import DailyItineraryDescList from "./subcomponents/DailyItineraryDescList";
import FeatureInputsList from "./subcomponents/FeatureInputsList";
import ImagesSection from "./subcomponents/ImagesSection";
import { ScheduleState } from "../customHooks/useTourDataState/helperHooks/useScheduleForm";

interface Props {
    handleSubmitForm: (formData: FormTourData) => Promise<void>,
    goal: 'create' | 'update',
    handleRemoveTour?: () => Promise<void>
    fetchedTourData?: ITour
}

export interface FormTourData {
    title: string,
    category: string,
    generalDescription: string,
    dailyItineraryDescription: DailyItineraryDescription,
    features: IFeatures,
    destinations: IDestinationAttrs[],
    images: File[],
    schedule: ScheduleState[]
};

const GenerateTourForm: React.FC<Props> = ({ handleSubmitForm, goal, handleRemoveTour }) => {
    const { tour, isError, errorMessage } = useAppSelector(selectTourState);
    const { categories } = useCategoriesState();
    const { 
        schedule, 
        dailyItineraryDescription, 
        selectedCategory, 
        features, 
        selectedImages, 
        removedImages, 
        title, 
        generalDescription,
        destinations
    } = useTourDataState();
    const { generateFormErrorMessage } = useFormFieldErrors();

    const renderCategoriesOptions = () => categories.map(category => (
        <option value={category.slug}>{category.title}</option>
    ));

    const submit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // const formattedSchedule: ScheduleState[] = schedule.state.map(singleSchedule => {
        //     let { availability, price, discount, startDate, endDate } = singleSchedule;

        //     const formattedDiscount = discount.isDiscounted === true &&
        //     discount.expiresAt !== undefined && 
        //     discount.percentageOfDiscount !== undefined ?
        //         {
        //             ...discount,
        //             percentageOfDiscount: Number(discount.percentageOfDiscount),
        //             expiresAt: new Date(discount.expiresAt),
        //         } :
        //         {
        //             isDiscounted: false,
        //         };

        //     const formattedSingleSchedule: ScheduleState = {
        //         ...singleSchedule,
        //         availability: Number(availability),
        //         price: Number(price),
        //         startDate: new Date(startDate),
        //         endDate: new Date(endDate),
        //         discount: formattedDiscount,
        //     }

        //     return formattedSingleSchedule;
        // });

        await handleSubmitForm({
            title: title.state,
            category: selectedCategory.state,
            schedule: schedule.state,
            dailyItineraryDescription: dailyItineraryDescription.state,
            generalDescription: generalDescription.state, 
            features: features.state,
            images: selectedImages.state.map(img => img.data),
            destinations: destinations.state,
        })
    }

    return(
        <>
            {errorMessage ? errorMessage : 
            <form onSubmit={submit} encType="multipart/form-data">
                Create a new tour:
                <label>
                    Title
                    <input type='text' value={title.state} onChange={e => title.changeState(e.target.value)}/>
                    {generateFormErrorMessage('title')}
                </label>

                <label>
                    Select images
                    <ImagesSection
                        selectedImagesState={selectedImages.state}
                        unselectImage={selectedImages.unselect}
                        updateState={selectedImages.changeState}
                        removeImage={removedImages.changeState}
                    />
                    
                </label>

                <label>
                    Choose a category of the tour
                    <select name="categories" value={selectedCategory.state} onChange={e => selectedCategory.changeState(e.target.value)}>
                        {renderCategoriesOptions()}
                    </select>
                </label>

                <label>
                    Write general description of the tour
                    <ReactQuill theme="snow" value={generalDescription.state} onChange={generalDescription.changeState} />;
                    {generateFormErrorMessage('generalDescription')}
                </label>

                <label>
                    Daily itinerary description
                    <DailyItineraryDescList
                        state={dailyItineraryDescription.state}
                        changeState={dailyItineraryDescription.update}
                    />
                </label>

                <label>
                    Write 3 short features of the trip
                    <FeatureInputsList
                        state={features.state}
                        update={features.update}
                        setState={features.set}
                    />
                </label>

                <label>
                    destinations included at the tour
                    <DestinationList
                        state={destinations.state}
                        add={destinations.add}
                        remove={destinations.remove}
                        update={destinations.update}
                    />
                    {generateFormErrorMessage('destinations')}
                </label>

                <label>
                    Add at least one schedule
                    <ScheduleForm
                        state={schedule.state}
                        add={schedule.add}
                        update={schedule.update}
                        remove={schedule.remove}
                    />
                </label>

                <button type='submit'>{goal} the tour</button>
                {goal === 'update' ?
                    <button type='button' onClick={handleRemoveTour}>Remove the tour</button>
                    : null
                }
            </form>}
        </>
        
    )
};

export default GenerateTourForm;