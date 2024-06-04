import { useEffect } from "react";
import useAppSelector from "../../../../../hooks/useAppSelector";
import useFormFieldErrors from "../../../../../hooks/useFormFieldErrors";
import { selectTourState } from "../../../../../redux/features/tour/tourSlice";
import { IFeatures } from "../../../../../redux/features/tour/tourSlice.interface";
import { FeatureKey } from "../../customHooks/useTourDataState/helperHooks/useFeaturesState";

interface Props {
    state: IFeatures,
    update: (feature: FeatureKey, newValue: string) => void,
    setState: (data: IFeatures) => void
}

const FeatureInputsList: React.FC<Props> = ({ state, update, setState }) => {
    const { generateFormErrorMessage } = useFormFieldErrors();
    const { tour } = useAppSelector(selectTourState);

    useEffect(() => {
        if(!tour?.features) return;
        
        setState(tour.features)
    }, [tour?.features]);

    const generatePlaceholder = (key: FeatureKey) => {
        let placeholder = '';
        if(key === FeatureKey.firstFeature) placeholder = '1st feature'
        else if(key === FeatureKey.secondFeature) placeholder = '2nd feature'
        else if (key === FeatureKey.thirdFeature) placeholder = '3rd feature'

        return placeholder;
    }
    const renderFeatureInputs = () => Object.entries(state).map(([key, value]) => {
        const featureKey = key as FeatureKey;
        //state[featureKey]
        return(
            <li key={key}>
                <input
                    type="text" 
                    placeholder={generatePlaceholder(featureKey)} 
                    value={value} 
                    onChange={e => update(FeatureKey[featureKey], e.target.value)}
                />
                {generateFormErrorMessage(`features.${featureKey}`)}
            </li>
        )
    });

    return(
        <ul>
            {renderFeatureInputs()}
        </ul>
    )
};

export default FeatureInputsList;