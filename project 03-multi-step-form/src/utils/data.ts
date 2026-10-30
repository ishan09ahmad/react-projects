import arcadeImage from "../assets/icon-arcade.svg";
import advacedImage from "../assets/icon-advanced.svg";
import proImage from "../assets/icon-pro.svg";
import type { navItemType } from "../types/types.ts";
import type { addOnsServicesType } from "../types/types.ts";
import type { plansType } from "../types/types.ts";
import type { IntialStateType } from "../types/context.types.ts";
import type { ActionType } from "../types/context.types.ts";
import type { FormType } from "../types/types.ts";
import type { FormErrorType } from "../types/types.ts";

export const nav: navItemType[] = [
  { id: 1, step: "Step1", name: "YOUR INFO", route: "/" },
  { id: 2, step: "Step2", name: "SELECT PLAN", route: "/plan" },
  { id: 3, step: "Step3", name: "ADD-ONS", route: "/add-ons" },
  { id: 4, step: "Step4", name: "SUMMARY", route: "/summary" },
];

export const addOnsServices: addOnsServicesType[] = [
  {
    id: 1,
    name: "Online service",
    monthlyPrice: "1",
    yearlyPrice: "10",
    detail: "Access to multiplayer games",
  },
  {
    id: 2,
    name: "Larger storage",
    monthlyPrice: "2",
    yearlyPrice: "20",
    detail: "Extra 1TB of cloud save",
  },
  {
    id: 3,
    name: " Customizable Profile",
    monthlyPrice: "2",
    yearlyPrice: "20",
    detail: "Custom theme on your profile",
  },
];

export const plans: plansType[] = [
  {
    id: 1,
    name: "Arcade",
    monthlyPrice: "9",
    yearlyPrice: "90",
    icon: arcadeImage,
  },
  {
    id: 2,
    name: "Advanced",
    monthlyPrice: "12",
    yearlyPrice: "120",
    icon: advacedImage,
  },
  {
    id: 3,
    name: "Pro",
    monthlyPrice: "15",
    yearlyPrice: "150",
    icon: proImage,
  },
];

export const initialState: IntialStateType = {
  form: { name: "", email: "", number: "" },
  formError: { name: "", email: "", number: "" },
  plan: { name: "Arcade", monthlyPrice: "9", yearlyPrice: "90" },
  addOns: [],
  isMonthly: true,
  isFormSubmitted: false,
};

export function reducerFunc(
  state: IntialStateType,
  action: ActionType,
): IntialStateType {
  switch (action.type) {
    case "FORM_INPUT":
      return {
        ...state,
        form: { ...state.form, [action.payload.name]: action.payload.value },
        formError: { ...state.formError, [action.payload.name]: "" },
      };

    case "SUBMIT_FORM":
      return {
        form: { name: "", email: "", number: "" },
        formError: { name: "", email: "", number: "" },
        plan: { name: "Arcade", monthlyPrice: "9", yearlyPrice: "90" },
        addOns: [],
        isMonthly: true,
        isFormSubmitted: true,
      };

    case "SET_ERROR":
      return { ...state, formError: action.payload };

    case "SET_MONTHLYTOGGLE":
      return {
        ...state,
        isMonthly: !state.isMonthly,
      };

    case "ADD_PLAN":
      return { ...state, plan: action.payload };

    case "HANDLE_SERVICES":
      return {
        ...state,
        addOns: state.addOns.find((item) => item.id === action.payload.id)
          ? state.addOns.filter((item) => item.id !== action.payload.id)
          : [...state.addOns, action.payload],
      };
    case "TOGGLE_FORMSUBMIT":
      return { ...state, isFormSubmitted: action.payload };

    default:
      return state;
  }
}

export function validateForm(form: FormType): FormErrorType {
  const error: FormErrorType = {
    name: "",
    email: "",
    number: "",
  };

  const name = form.name.trim();
  const email = form.email.trim();
  const number = form.number.trim();

  if (!name) {
    error.name = "This field is required";
  } else if (!/^[A-Za-z]+( [A-Za-z]+)*$/.test(name)) {
    error.name = "Only alphabets and spaces allowed";
  }

  if (!email) {
    error.email = "This field is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    error.email = "Enter a valid email address";
  }

  if (!number) {
    error.number = "This field is required";
  } else if (number.length !== 10) {
    error.number = "Must contain 10 digits";
  }

  return error;
}
