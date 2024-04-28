import * as Yup from 'yup';
import isValidFileType from '../../../../utils/file-validation-yup';

const requiredFieldMsg = 'The field is required';

const MAX_FILE_SIZE = 102400; //100KB

const createCategoryValidationSchema = Yup.object().shape({
    title: Yup.string().required(),
    icon: Yup
        .mixed()
        .required("Required")
        .test("is-valid-type", "Not a valid image type",
        (value: any) => {
        if (!value || typeof value.name !== 'string') {
            return false;
        }
        return isValidFileType(value.name);
    }
    )
    .test("is-valid-size", "Max allowed size is 100KB",
        (value: any) => value && value.size && value.size <= MAX_FILE_SIZE
    ),
});

export default createCategoryValidationSchema;