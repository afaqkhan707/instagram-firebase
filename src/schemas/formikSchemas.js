import * as Yup from 'yup';

export const loginSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required(),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required(),
});

export const signupSchema = Yup.object({
  name: Yup.string().min(2).max(20).required(),
  email: Yup.string().email('Invalid email format').required(),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required(),
  confirm_password: Yup.string()
    .required()
    .oneOf([Yup.ref('password'), null], 'Password must Match...'),
});
