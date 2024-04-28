import * as Yup from 'yup';
import isValidFileType from '../../../../utils/file-validation-yup';

const MAX_FILE_SIZE = 102400; //100KB

const updateCategoryValidationSchema = Yup.object().shape({
    title: Yup.string().optional(),
    icon: Yup
        .mixed()
        .optional()
        .test("is-valid-type", "Not a valid image type",
        (value: any) => {
            if (!value) {
                return true;
            }
            if (typeof value.name !== 'string') {
                return false;
            }
            return isValidFileType(value.name);
        })
        .test("is-valid-size", "Max allowed size is 100KB",
            (value: any) => {
                if (!value || !value.size) {
                    return true;
                }
                return value.size <= MAX_FILE_SIZE;
            }
        )
});

export default updateCategoryValidationSchema;