import { useEffect, useState } from "react";
import Autocomplete from "../../../utils/autocomplete";
import { IDestination } from "../../../../../redux/features/tour/tourSlice.interface";

interface Props {
    input_id: string,
    updateDestinationState: (inputId: string, newData: Omit<IDestination, "input_id">) => void
}

const AutocompleteInput: React.FC<Props> = ({ input_id, updateDestinationState }) => {
    const [hasAutocompleteBeenInitiated, setHasAutocompleteBeenInitiated] = useState(false);

    useEffect(() => {
        if(hasAutocompleteBeenInitiated === true) return;
        const autocomplete = new Autocomplete(input_id, updateDestinationState);

        setHasAutocompleteBeenInitiated(true);
        
        return () => {
            autocomplete.removeAutocomplete();
        }
    }, []);


    return(
        <input id={input_id} placeholder="Enter a place" type="text"/>
    )
};

export default AutocompleteInput