import * as Yup from 'yup';

export const loginSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required(),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .max(16, 'Password must be less than 16 characters')
    .required(),
});

// export const loginSchema = Yup.object({
//   email: Yup.string().email('Invalid email format').required(),
//   password: Yup.string()
//     .min(6, 'Password must be at least 6 characters')
//     .max(16, 'Password must be less than 16 characters')
//     .matches(
//       /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&\\+])[A-Za-z\d@$!%*?&\\+]{8,16}$/,
//       'Password must contain at least one uppercase letter, one lowercase letter, one number, one symbol.'
//     )
//     .required(),
// });
export const signupSchema = Yup.object({
  username: Yup.string().min(2).max(20).required(),
  email: Yup.string().email('Invalid email format').required(),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .max(16, 'Password must be less than 16 characters')
    .required(),
  confirm_password: Yup.string()
    .required()
    .oneOf([Yup.ref('password'), null], 'Password must Match...'),
});

// export const signupSchema = Yup.object({
//   username: Yup.string().min(2).max(20).required(),
//   email: Yup.string().email('Invalid email format').required(),
//   password: Yup.string()
//     .min(8, 'Password must be at least 8 characters')
//     .max(16, 'Password must be less than 16 characters')
//     .matches(
//       /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&\\+])[A-Za-z\d@$!%*?&\\+]{8,16}$/,
//       'Password must contain at least one uppercase letter, one lowercase letter, one number, one symbol.'
//     )
//     .required(),
//   confirm_password: Yup.string()
//     .required()
//     .oneOf([Yup.ref('password'), null], 'Passwords must match'),
// });
