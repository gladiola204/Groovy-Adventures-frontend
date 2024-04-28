import { useState } from "react";


const useGlobalIsLoading = () => {
    const [isLoading, setIsLoading] = useState(false);

    const changeIsLoading = (newValue: boolean) => setIsLoading(newValue);

    return { isLoading, changeIsLoading };
};

export default useGlobalIsLoading;