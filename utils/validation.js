import * as Yup from 'yup'

export const validationSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string().trim().min(8, 'Password must be atleast 8 characters').required("Password is required"),
})


export const registerValidationSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  first_name: Yup.string().min(3, 'Name must be atleast 3 characters').required("Name is required"),
  last_name: Yup.string().min(3, 'Name must be atleast 3 characters').required("Name is required"),
  password: Yup.string().trim().min(8, 'Password must be atleast 8 characters').required("Password is required"),
})