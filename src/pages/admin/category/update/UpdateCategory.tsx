import useAdminAccessGuard from "../../../../hooks/useAdminAccessGuard";
import useAppDispatch from "../../../../hooks/useAppDispatch";
import useFormFieldErrors from "../../../../hooks/useFormFieldErrors";
import useImageUpload from "../../../../hooks/useImageState";
import validateFormData from "../../helpers/validateFormData";
import createCategoryValidationSchema from "../create/createCategoryValidationSchema";
import GenerateCategoryForm, { CategoryFormData } from "../generateCategoryForm";
import useAppSelector from "../../../../hooks/useAppSelector";
import categoryThunks from "../../../../redux/features/category/categoryThunks";
import { RootState } from "../../../../redux/store";
import { useParams } from "react-router-dom";
import { IUpdateCategory } from "../../../../services/categoryService";
import updateCategoryValidationSchema from "./updateCategoryValidation";
import { useEffect } from "react";

const UpdateCategory: React.FC = () => {
    useAdminAccessGuard('/login');
    const dispatch = useAppDispatch();
    const { setError } = useFormFieldErrors();
    const { category, isError, errorMessage } = useAppSelector((state: RootState) => state.category);
    const { slug } = useParams();

    useEffect(() => {
        if(!slug) return;

        dispatch(categoryThunks.getCategory(slug));
    }, []);

    const handleSubmitForm = async(formData: CategoryFormData) => {
        if(!slug) return;

        let updatedData: IUpdateCategory = {};

        if(formData.title !== category?.title) updatedData.title = formData.title;
        if(formData.icon) updatedData.icon = formData.icon;

        if(!updatedData.icon && !updatedData.title) return;
        const validatedData = await validateFormData(updateCategoryValidationSchema, formData, setError);

        if(!validatedData) return;

        await dispatch(categoryThunks.updateCategory({slug, categoryData: updatedData}));
    };

    const handleRemoveCategory = async() => {
        if(!slug) return;
        await dispatch(categoryThunks.deleteCategory(slug))
    }
    
    return(
        <GenerateCategoryForm
            handleSubmit={handleSubmitForm}
            goal="Update"
            handleRemoveCategory={handleRemoveCategory}
        />
    )
}

export default UpdateCategory;