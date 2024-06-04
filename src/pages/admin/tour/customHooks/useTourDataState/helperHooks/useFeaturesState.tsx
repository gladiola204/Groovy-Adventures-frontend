import { useEffect, useState } from "react";
import { IFeatures } from "../../../../../../redux/features/tour/tourSlice.interface";
import useAppSelector from "../../../../../../hooks/useAppSelector";
import { selectTourState } from "../../../../../../redux/features/tour/tourSlice";

export enum FeatureKey {
    firstFeature = 'firstFeature',
    secondFeature = 'secondFeature',
    thirdFeature = 'thirdFeature',
};

const useFeaturesState = () => {
    const { tour } = useAppSelector(selectTourState);
    const [features, setFeatures] = useState<IFeatures>({
        firstFeature: '',
        secondFeature: '',
        thirdFeature: '',
    });
    
    useEffect(() => {
        if(!tour?.features) return;

        setState(tour.features);
    }, [tour?.schedule]);
    const changeFeature = (feature: FeatureKey, newValue: string) => setFeatures(prevState => ({
        ...prevState,
        [feature]: newValue,
    }));

    const setState = (data: IFeatures) => setFeatures(data);

    return {
        features,
        changeFeature,
        setFeatures: setState,
    }
};

export default useFeaturesState;