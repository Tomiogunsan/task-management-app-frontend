import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\-]).{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one special character"
    ),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Required"),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),

  password: yup.string().required("Password is required"),
});
