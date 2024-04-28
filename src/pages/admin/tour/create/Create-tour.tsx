import useAdminAccessGuard from "../../../../hooks/useAdminAccessGuard";
import 'react-quill/dist/quill.snow.css';
import createTourValidationSchema from "./createTourValidationSchema";
import GenerateTourForm, { FormTourData } from "../generateTourForm";
import useAppDispatch from "../../../../hooks/useAppDispatch";
import useFormFieldErrors from "../../../../hooks/useFormFieldErrors";
import validateFormData from "../../helpers/validateFormData";
import tourThunks from "../../../../redux/features/tour/tourThunks";


  const CreateTour: React.FC = () => {
    useAdminAccessGuard('/login');
    const dispatch = useAppDispatch();
    const { setError } = useFormFieldErrors();

    const handleCreateTour = async(formData: FormTourData) => {
        const validatedFormData = await validateFormData(createTourValidationSchema, formData, setError);
        
        if(!validatedFormData) return;
        
        dispatch(tourThunks.createTour(formData));
    };

    return(
        <GenerateTourForm
            handleSubmitForm={handleCreateTour}
            goal='create'
        />
    )
};

export default CreateTour;