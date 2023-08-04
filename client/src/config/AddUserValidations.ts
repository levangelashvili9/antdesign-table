import { Rule } from "antd/lib/form";

const nameValidationRules: Rule[] = [
  { required: true, message: "Please enter your name" },
  { whitespace: true, message: "Please enter your name" },
];

const emailValidationRules: Rule[] = [
  { required: true, message: "Please enter your email" },
  { type: "email", message: "Invalid format of email" },
];

const genderValidationRules: Rule[] = [
  { required: true, message: "Please select your gender" },
];

const streetValidationRules: Rule[] = [
  { required: true, message: "Please enter your street" },
  { whitespace: true, message: "Please enter your street" },
];

const cityValidationRules: Rule[] = [
  { required: true, message: "Please enter your city" },
  { whitespace: true, message: "Please enter your city" },
];

const phoneValidationRules: Rule[] = [
  { required: true, message: "Please enter your number" },
  {
    pattern: /^(?=[^A-Za-z]{9,}$).*$/,
    message: "Please enter a valid number",
  },
];

export const AddUserValidations = {
  name: nameValidationRules,
  email: emailValidationRules,
  gender: genderValidationRules,
  street: streetValidationRules,
  city: cityValidationRules,
  phone: phoneValidationRules,
};
