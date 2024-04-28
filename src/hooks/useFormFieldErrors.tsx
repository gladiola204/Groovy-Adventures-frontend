import { useState } from "react";
import ErrorMessage from "../components/ErrorMessage";

type Error = {
    field: string,
    message: string,
    arrayIndex?: number,
}

interface ClearErrorProps {
    field: string,
    arrayIndex?: number,
};


const useFormFieldErrors = () => {
    const [formErrors, setFormErrors] = useState<Error[]>([]);

    const setError = (error: Error | Error[]) => {
        if(Array.isArray(error)) {
            error.forEach(err => setFormErrors(currentErrors => [...currentErrors, err]));
            return;
        };
        setFormErrors(currentErrors => [...currentErrors, error]);
    }

    const clearError = (data: ClearErrorProps | ClearErrorProps[]) => {
        if(Array.isArray(data)) {
            data.forEach(err => {
                const { field, arrayIndex } = err
                setFormErrors(currentErrors => currentErrors.filter(error => error.field !== field || (arrayIndex !== undefined && error.arrayIndex !== arrayIndex)))
            })
            return;
        };
        const { field, arrayIndex } = data;
        setFormErrors(currentErrors => currentErrors.filter(error => error.field !== field || (arrayIndex !== undefined && error.arrayIndex !== arrayIndex)));
    };

    const clearAllErrors = () => {
        setFormErrors([]);
    }

    const generateFormErrorMessage = (field: string, arrayIndex?: number) => {
        const error = formErrors.find(error => error.field === field && (arrayIndex === undefined || error.arrayIndex === arrayIndex));
        return error ? <ErrorMessage msg={error.message}/> : null;
    };

    return { setError, clearError, clearAllErrors, generateFormErrorMessage };
};

export default useFormFieldErrors;