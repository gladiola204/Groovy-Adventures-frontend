import * as Yup from 'yup';
import isValidEmail from '../isValidEmail';

const loginValidationSchema = Yup.object().shape({
    email: Yup.string().trim().test('is-valid-email', 'Email', (value) => typeof value === 'string' && isValidEmail(value)).required(),
    password: Yup.string().trim().min(6).max(40).required()
})

export default loginValidationSchema;