import { useEffect, useState } from "react";
import { Features } from "../../../../redux/features/tour/tourSlice.interface";
import useFormFieldErrors from "../../../../hooks/useFormFieldErrors";
import useAppSelector from "../../../../hooks/useAppSelector";
import { RootState } from "../../../../redux/store";

enum FeatureKey {
    firstFeature = 'firstFeature',
    secondFeature = 'secondFeature',
    thirdFeature = 'thirdFeature',
};

const useFeaturesState = () => {
    const { generateFormErrorMessage } = useFormFieldErrors();
    const { tour } = useAppSelector((state: RootState) => state.tour);
    
    const [features, setFeatures] = useState<Features>({
        firstFeature: '',
        secondFeature: '',
        thirdFeature: '',
    });

    const changeFeature = (feature: FeatureKey, newValue: string) => setFeatures(prevState => ({
        ...prevState,
        [feature]: newValue,
    }));

    useEffect(() => {
        if(!tour?.features) return;
        
        setFeatures(tour.features)
    }, [tour?.features]);

    const renderFeaturesInputs = () => {
        const inputs: JSX.Element[] = [];

        for (const feat in features) {
            const featureKey = feat as FeatureKey;
            const placeholder = () => {
                let placeholder = '';
                if(featureKey === FeatureKey.firstFeature) placeholder = '1st feature'
                else if(featureKey === FeatureKey.secondFeature) placeholder = '2nd feature'
                else if (featureKey === FeatureKey.thirdFeature) placeholder = '3rd feature'

                return placeholder;
            }

            inputs.push(
                <>
                    <input type="text" placeholder={placeholder()} value={features[featureKey]} onChange={e => changeFeature(FeatureKey[featureKey], e.target.value)}/>
                    {generateFormErrorMessage(`features.${featureKey}`)}
                </>
            )
        }

        return inputs;
    }

    return {
        features,
        renderFeaturesInputs,
    }
};

export default useFeaturesState;