import * as Yup from 'yup';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])/; // Add the regex for password validation
const phoneNumberRegex = /^9\d{9}$/;

export const RegisterValidationSchema = Yup.object().shape({
    name: Yup.string()
        .min(5, 'Name must be at least 5 characters long')
        .max(30, 'Name must be at most 30 characters long')
        .required('Name is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .matches(passwordRegex, 'Password must contain at least one uppercase letter and one lowercase letter')
        .required('Password is required'),
    phone: Yup.string()
        .matches(phoneNumberRegex, 'Enter a valid phone number')
        .required('Phone number is required')
});
