import { useEffect, useState } from "react";
import { IDestination } from "../../../../../../redux/features/tour/tourSlice.interface";
import useAppSelector from "../../../../../../hooks/useAppSelector";
import { selectTourState } from "../../../../../../redux/features/tour/tourSlice";

const generateUniqueId = () => window.crypto.randomUUID();

const destinationTemplate = {
    name: '',
    place_id: '',
    input_id: generateUniqueId(),
}

const useDestinationsState = () => {
    const { tour } = useAppSelector(selectTourState);
    const [destinations, setDestinations] = useState<IDestination[]>([destinationTemplate]);
    
    useEffect(() => {
        if(!tour?.destinations) return;

        const initialState = tour.destinations.map(({ name, place_id }) => ({ 
            name,
            place_id,
            input_id: generateUniqueId(),
        }))
        setDestinations(initialState);
    }, [tour?.destinations]);
    
    const addDestination = () => setDestinations(prevValue => {
        return [...prevValue, { ...destinationTemplate, input_id: generateUniqueId() }]
    });

    const updateDestination = (inputId: string, newData: Omit<IDestination, 'input_id'>) => {
        setDestinations(prevValue => prevValue.map((dest) => {
            const { input_id } = dest;
            return input_id === inputId ? {...newData, input_id} : dest
        }));
    }

    const removeDestination = (inputIdToRemove: string) => {
        console.log('tutaj w remove');
        if(destinations.length <= 1) return;
        console.log('2');

        const filteredDests = destinations.filter(({ input_id }) => inputIdToRemove !== input_id);
        console.log('3');

        if(filteredDests.length <= 0) return setDestinations([destinationTemplate]);
        console.log('4');


        return setDestinations(filteredDests)
    };

    return { state: destinations, add: addDestination, remove: removeDestination, update: updateDestination };
};

export default useDestinationsState;