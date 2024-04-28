import { useEffect, useMemo, useState } from "react";
import useAdminAccessGuard from "../../../../hooks/useAdminAccessGuard";
import useAppDispatch from "../../../../hooks/useAppDispatch";
import { useParams } from "react-router-dom";
import useAppSelector from "../../../../hooks/useAppSelector";
import { RootState } from "../../../../redux/store";
import { IUpdateTour, ScheduleWithoutId } from "../../../../services/tourService";
import { Schedule } from "../../../../redux/features/tour/tourSlice.interface";
import updateTourValidationSchema from "./updateTourValidation";
import GenerateTourForm, { FormTourData } from "../generateTourForm";
import useFormFieldErrors from "../../../../hooks/useFormFieldErrors";
import validateFormData from "../../helpers/validateFormData";
import tourThunks from "../../../../redux/features/tour/tourThunks";

const UpdateTour: React.FC = () => {
    useAdminAccessGuard('/login');
    const { slug } = useParams();
    const dispatch = useAppDispatch();
    const { tour, isLoading, isError, errorMessage } = useAppSelector((state: RootState) => state.tour);
    const { setError } = useFormFieldErrors();

    const [removedImgs, setRemovedImgs] = useState<string[]>([]);
    
    useEffect(() => {
        if(!slug) return;

        dispatch(tourThunks.getTour(slug));
    }, []);
    
    const handleDeleteTour = async() => {
        if(!slug) return;

        await dispatch(tourThunks.deleteTour(slug));
    };

    const sendUpdatedTour = async(formData: FormTourData) => {
        const { title, category, generalDescription, dailyItineraryDescription, features, images, schedule } = formData;
        let updatedTour: IUpdateTour = {};

        if(tour?.title !== title) updatedTour.title = title;
        if(tour?.category.slug !== category) updatedTour.category = category;
        if(tour?.generalDescription !== generalDescription) updatedTour.generalDescription = generalDescription
        if(tour?.dailyItineraryDescription !== dailyItineraryDescription) updatedTour.dailyItineraryDescription = dailyItineraryDescription;
        if(tour?.features !== features) updatedTour.features = features;
        if(removedImgs.length > 0) updatedTour.removeImages = removedImgs;
        if(images && images.length > 0) updatedTour.images = images;
        //if(tour?.destinations !== destinations.split(',')) updatedTour.destinations = destinations.split(',');

        schedule.forEach(value => {
            const smth = tour?.schedule.filter(cos => cos.id === value.id) as Schedule[];
            
            if(smth.length === 0) {
                const typedValue = value as ScheduleWithoutId;
                if(!updatedTour.newSchedule) return updatedTour.newSchedule = [typedValue];
                updatedTour.newSchedule = [...updatedTour.newSchedule, typedValue];

                return;
            }
        });
        tour?.schedule.forEach(value => {
            const smth = schedule.filter(cos => cos.id === value.id) as Schedule[];

            if(smth.length > 1) return;
            if(smth.length === 0) {
                if(!updatedTour.deleteSchedule) return updatedTour.deleteSchedule = [value.id];
                updatedTour.deleteSchedule = [...updatedTour.deleteSchedule, value.id];

                return;
            }
            
            const updatedSchedule = smth[0];

            if(smth[0] !== value) {
                if(!updatedTour.updateSchedule) return updatedTour.updateSchedule = [updatedSchedule];
                updatedTour.updateSchedule = [...updatedTour.updateSchedule, updatedSchedule];
            }
        });

        const validatedFormData = await validateFormData(updateTourValidationSchema, updatedTour, setError);
        
        if(!validatedFormData) return;
        
        await dispatch(tourThunks.updateTour({slug: slug as string, tourData: updatedTour})); /// DO DOKOŃCZENIA
    }

    const showFetchedImages = useMemo(() => tour?.images.map(img => (
        <div>
            <img key={img.originalFilePublicId} src={img.differentSizes.thumbnail.filePath} style={{ width: "100px" }}/>
            <button onClick={_=> setRemovedImgs(prevValue => [...prevValue, img.originalFilePublicId])}>Remove image</button>
        </div>
        )),
    [tour?.images]);

    return(
        <GenerateTourForm
            handleSubmitForm={sendUpdatedTour}
            goal='update'
            showFetchedImgs={showFetchedImages}
            handleRemoveTour={handleDeleteTour}
        />
    )
};

export default UpdateTour;