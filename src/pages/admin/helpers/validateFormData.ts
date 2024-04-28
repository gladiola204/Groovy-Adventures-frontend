import * as Yup from 'yup';
import useFormFieldErrors from '../../../hooks/useFormFieldErrors';

/**
 * Funkcja pomocnicza do walidacji danych formularza i obsługi błędów walidacji.
 * @param {Yup.ObjectSchema} validationSchema Schemat walidacji Yup dla danych formularza.
 * @param {Object} formData Dane formularza do walidacji.
 */
async function validateFormData(validationSchema: Yup.AnyObject, formData: Object, setError: (error: {
    field: string;
    message: string;
}[] | {
    field: string;
    message: string;
}) => void) {
    try {
        await validationSchema.validate(formData, { abortEarly: false });
        console.log('Validation passed');
        return true;
    } catch (err) {
        if (err instanceof Yup.ValidationError) {
            console.error(err.inner);
            const formattedErrors = err.inner.map(error => ({
                field: error.path || 'unknown', // Użycie 'unknown' jako fallback dla pól bez ścieżki
                message: error.message,
            }));
            setError(formattedErrors);
            return false;
        }
    }
}

export default validateFormData;