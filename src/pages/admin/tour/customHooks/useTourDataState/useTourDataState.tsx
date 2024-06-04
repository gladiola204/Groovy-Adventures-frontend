import useAppSelector from "../../../../../hooks/useAppSelector";
import useImageState from "../../../../../hooks/useImageState";
import { selectTourState } from "../../../../../redux/features/tour/tourSlice";
import useDailyItineraryDesc from "./helperHooks/useDailyItineraryDesc";
import useDestinationsState from "./helperHooks/useDestinationsState";
import useFeaturesState from "./helperHooks/useFeaturesState";
import useScheduleForm from "./helperHooks/useScheduleForm";
import useSelectedCategory from "./helperHooks/useTourCategories";
import { useEffect, useState } from "react";

const useTourDataState = () =>  {
    const { tour } = useAppSelector(selectTourState);

    // Hooks
    const { schedule, updateSchedule, removeSchedule, addSchedule } = useScheduleForm();
    const { dailyItineraryDescription, changeDailyItineraryDescription } = useDailyItineraryDesc();
    const { selectedCategory, handleChangeSelectedCategory } = useSelectedCategory();
    const { features, setFeatures, changeFeature } = useFeaturesState();
    const { selectedImages, handleImageChange, resetImages, unselectImage } = useImageState();
    const { state: destinations, add: addDestination, remove: removeDestination, update: updateDestination} = useDestinationsState();

    // States
    const [removedImgs, setRemovedImgs] = useState<string[]>([]);
    const [title, setTitle] = useState('');
    const [generalDescription, setGeneralDescription] = useState('');

    const changeRemovedImgs = (publicId: string ) => setRemovedImgs(prevState => [...prevState, publicId]);

    useEffect(() => {
        if (!tour) return;

        setTitle(tour.title);
        setGeneralDescription(tour.generalDescription);
    }, [tour]);

    const updateGeneralDesc = (newData: string) => setGeneralDescription(_ => newData === '<p><br></p>' ? '' : newData)

    return {
        schedule: { 
            state: schedule, 
            update: updateSchedule,
            remove: removeSchedule,
            add: addSchedule,
        },
        dailyItineraryDescription: { 
            state: dailyItineraryDescription, 
            update: changeDailyItineraryDescription,
        },
        selectedCategory: { 
            state: selectedCategory, 
            changeState: handleChangeSelectedCategory 
        },
        features: { 
            state: features, 
            update: changeFeature,
            set: setFeatures
        },
        selectedImages: { 
            state: selectedImages, 
            changeState: handleImageChange, 
            resetState: resetImages,
            unselect: unselectImage,
        },
        removedImages: {
            state: removedImgs,
            changeState: changeRemovedImgs,
        },
        title: {
            state: title,
            changeState: setTitle,
        },
        generalDescription: {
            state: generalDescription,
            changeState: updateGeneralDesc
        },
        destinations: {
            state: destinations,
            add: addDestination,
            remove: removeDestination,
            update: updateDestination,
        },
    }
}

export default useTourDataState;