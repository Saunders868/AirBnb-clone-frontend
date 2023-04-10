import * as Yup from "yup";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const placeValidationSchema = Yup.object({
  title: Yup.string().required("A title for your listing is required."),
  address: Yup.string().required(
    "Please let us know where you listing is located."
  ),
  description: Yup.string()
    .min(100, "Must be more that 100 characters")
    .required(
      "Describe your listing in a short paragraph so we van let users know what to expect."
    ),
  maxGuests: Yup.number()
    .min(1, "minimum of 1 guest")
    .required("Let us know the maximum amount of guests that we should allow."),
  price: Yup.number().required(
    "Let us know the cost per night for booking the listing."
  ),
});

export const bookingValidationSchema = Yup.object({
  maxGuests: Yup.number()
    .min(1, "minimum of 1 guest")
    .required(
      "Let us know the maximum amount of guests that we should expect."
    ),
  name: Yup.string().required(
    "Let us know what name to book this listing under."
  ),
  mobile: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Please provide a contact number."),
});

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Please enter your email..!"),
  password: Yup.string().required("Please enter your password...!"),
});

export const registerValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Please enter your email..!"),
  password: Yup.string().required("Please enter your password...!"),
  name: Yup.string().required("Please enter your name...!"),
});
