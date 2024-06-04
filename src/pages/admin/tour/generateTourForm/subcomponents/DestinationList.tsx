import AutocompleteInput from "./AutocompleteInput";
import { IDestination } from "../../../../../redux/features/tour/tourSlice.interface";

interface Props {
    state: IDestination[]; 
    add: () => void; 
    remove: (inputIdToRemove: string) => void; 
    update: (inputId: string, newData: Omit<IDestination, "input_id">) => void
}

const DestinationList: React.FC<Props> = ({ state, add, remove, update }) => {

    const addNewAutocompleteInput = () => add();
    const removeAutocompleteInput = (inputId: string) => remove(inputId);

    const renderAutocompleteInputs = state.map(({ input_id, place_id, name }, index) => {
        if(place_id !== '' && name !== '') return(
            <li key={input_id}>
                <button type="button" onClick={() => removeAutocompleteInput(input_id)}>-</button>
                <input type="text" disabled value={name} className="pac-target-input"/>
                {index === state.length - 1 ? <button type="button" onClick={addNewAutocompleteInput}>+</button> : null}
            </li>
        )
        return (
            <li key={input_id}>
                {index !== 0 ? <button type="button" onClick={() => removeAutocompleteInput(input_id)}>-</button> : null} 
                <AutocompleteInput input_id={input_id} updateDestinationState={update} />
                {index === state.length - 1 ? <button type="button" onClick={addNewAutocompleteInput}>+</button> : null}
            </li>
        )
    })
    
    return(
        <ul>
            {renderAutocompleteInputs}
        </ul>
    )
};

export default DestinationList;