import validateFormData from "../../helpers/validateFormData";
import createCategoryValidationSchema from "./createCategoryValidationSchema";
import useAppDispatch from "../../../../hooks/useAppDispatch";
import useFormFieldErrors from "../../../../hooks/useFormFieldErrors";
import useAdminAccessGuard from "../../../../hooks/useAdminAccessGuard";
import GenerateCategoryForm, { CategoryFormData } from "../generateCategoryForm";
import categoryThunks from "../../../../redux/features/category/categoryThunks";
import { ICreateCategory } from "../../../../services/categoryService";

const CreateCategory: React.FC = () => {
    useAdminAccessGuard('/login');
    const dispatch = useAppDispatch();
    const { setError } = useFormFieldErrors();

    const handleCreateCategory = async(formData: CategoryFormData) => {
        const validatedData = await validateFormData(createCategoryValidationSchema, formData, setError);
        
        if(!validatedData) return;

        await dispatch(categoryThunks.createCategory(formData as ICreateCategory));
    };

    return (
        <GenerateCategoryForm
            handleSubmit={handleCreateCategory}
            goal="Create"
        />
    )
}

export default CreateCategory;