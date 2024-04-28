import { useState, ChangeEvent } from "react";


const useDestinationState = () => {
    const [destination, setDestination] = useState<string>();

    const handleChangeDestination = (e: ChangeEvent<HTMLInputElement>) => {
        setDestination(e.target.value)
    };

    return { destination, handleChangeDestination };
};

export default useDestinationState;