import { useEffect, useMemo, useState } from "react";
import useAdminAccessGuard from "../../../../hooks/useAdminAccessGuard";
import useAppDispatch from "../../../../hooks/useAppDispatch";
import { useParams } from "react-router-dom";
import useAppSelector from "../../../../hooks/useAppSelector";
import { RootState } from "../../../../redux/store";
import { IUpdateTour } from "../../../../services/tourService";
import { ISchedule, IScheduleAttrs, ITour } from "../../../../redux/features/tour/tourSlice.interface";
import updateTourValidationSchema from "./updateTourValidation";
import GenerateTourForm, { FormTourData } from "../generateTourForm/generateTourForm";
import useFormFieldErrors from "../../../../hooks/useFormFieldErrors";
import validateFormData from "../../helpers/validateFormData";
import tourThunks from "../../../../redux/features/tour/tourThunks";
import { selectTourState } from "../../../../redux/features/tour/tourSlice";
import { toast } from "react-toastify";

function addToUpdatedTour<T extends keyof IUpdateTour>(updatedTour: IUpdateTour, field: T, value: IUpdateTour[T], tourStateValue?: IUpdateTour[T]): void {
    if (!updatedTour[field]) {
        if(tourStateValue && tourStateValue === value) return;

        updatedTour[field] = value;
    } else if(Array.isArray(value) && updatedTour[field]) {
        (updatedTour[field] as (typeof value)).push(...value);
    }
}

const UpdateTour: React.FC = () => {
    useAdminAccessGuard('/login');
    const { slug } = useParams();
    const dispatch = useAppDispatch();
    const { tour, isError, errorMessage } = useAppSelector(selectTourState);
    const { setError } = useFormFieldErrors();
    
    useEffect(() => {
        if(!slug) return;

        dispatch(tourThunks.getTour(slug));
    }, []);
    
    const handleDeleteTour = async() => {
        if(!slug) return;

        await dispatch(tourThunks.deleteTour(slug));
    };

    const sendUpdatedTour = async(formData: FormTourData) => {
        const { title, category, generalDescription, dailyItineraryDescription, features, images, schedule, destinations } = formData;
        let updatedTour: IUpdateTour = {};

        if(!tour) return;
        const ttt = {
            title: tour.title,
            category: tour.category.slug,
            generalDescription: tour.generalDescription,
            features: tour.features,
            dailyItineraryDescription: tour.dailyItineraryDescription,
        }

        Object.entries(ttt).forEach(([key, value]) => {
            const typedKey = key as keyof typeof ttt;
            console.log('key: ', typedKey, 'newValue ', formData[typedKey], 'oldValue: ', value);

            addToUpdatedTour(updatedTour, typedKey, formData[typedKey], value)
        });

        //if(removedImgs.length > 0) updatedTour.removeImages = removedImgs;
        if(images && images.length > 0) updatedTour.images = images;

        destinations.forEach((dest) => {
            const existingDoc = tour?.destinations.some(({ place_id }) => place_id === dest.place_id);
            if(!existingDoc) {
                addToUpdatedTour(updatedTour, 'newDestinations', [dest])
            }
        })

        tour.destinations.forEach((dest) => {
            const existing = destinations.find(({ place_id }) => place_id === dest.place_id);

            if(!existing) {
                addToUpdatedTour(updatedTour, 'removeDestinations', [dest.id])
            }
        })

        schedule.forEach(value => {
            const existingScheduleDoc = tour?.schedule.some(({ id }) => id === value.id);
            
            if(!existingScheduleDoc) {
                const typedValue = value as IScheduleAttrs;
                addToUpdatedTour(updatedTour, 'newSchedule', [typedValue])
            }
        });
        tour?.schedule.forEach(value => {
            const existing = schedule.find(({ id }) => id === value.id) as ISchedule;
            
            if (!existing) {
                addToUpdatedTour(updatedTour, 'deleteSchedule', [value.id]);
            } else if (existing !== value) {
                console.log('w hooku: ', existing);
                console.log('z tour.schedule: ', value);
                addToUpdatedTour(updatedTour, 'updateSchedule', [existing]);
            }
        });

        const validatedFormData = await validateFormData(updateTourValidationSchema, updatedTour, setError);
        
        if(!validatedFormData) return;
        
        if(Object.keys(updatedTour).length === 0){
            toast.info('You have to change at least one field to update the tour')
        } else {
            await dispatch(tourThunks.updateTour({slug: slug as string, tourData: updatedTour})); /// DO DOKOŃCZENIA
        }
    }

    return(
        <GenerateTourForm
            handleSubmitForm={sendUpdatedTour}
            goal='update'
            handleRemoveTour={handleDeleteTour}
            fetchedTourData={tour ? tour : undefined}
        />
    )
};

export default UpdateTour;