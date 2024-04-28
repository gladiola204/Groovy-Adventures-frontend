type ValidationError = {
    index?: number,
    field: string,
    message: string
};

type ValidatableValue = string | number | boolean | ValidatableValue[] | { [key: string]: ValidatableValue } | File;

// Funkcja pomocnicza do walidacji wartości
const validateValue = (key: string, value: ValidatableValue, errors: ValidationError[], path: string = '', index?: number) => {
    const fullPath = `${path}${path ? '.' : ''}${key}${typeof index === 'number' ? `[${index}]` : ''}`;

    if (typeof value === 'number' && value <= 0) {
        errors.push({
            field: fullPath,
            message: `${fullPath} must be greater than 0.`
        });
    } else if (Array.isArray(value)) {
        value.forEach((item, idx) => validateValue(key, item, errors, path, idx));
    } else if (typeof value === 'object' && value !== null) {
        Object.entries(value).forEach(([nestedKey, nestedValue]) => {
            validateValue(nestedKey, nestedValue, errors, fullPath);
        });
    } else if(typeof value === 'string' && value.trim() === '') {
        errors.push({
            index,
            field: fullPath,
            message: `${fullPath} mustn't be empty.`
        });
    } else if (value === null || value === undefined) {
        errors.push({
            index,
            field: fullPath,
            message: `${fullPath} mustn't be empty.`
        });
    }
};

// Główna funkcja walidacji
const validateForm = (data: { [key: string]: ValidatableValue }): ValidationError[] => {
    let errors: ValidationError[] = [];

    Object.entries(data).forEach(([key, value]) => {
        validateValue(key, value, errors);
    });

    return errors;
};

export default validateForm;