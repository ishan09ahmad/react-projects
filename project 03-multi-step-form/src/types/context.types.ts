import type { Dispatch, ReactNode } from "react";

export type AppContextPropsType = {
  children: ReactNode;
};

export type FormType = { name: string; email: string; number: string };

type PlanType = {
  name: string;
  monthlyPrice: string;
  yearlyPrice: string;
};

type AddOnsType = {
  id: number;
  name: string;
  monthlyPrice: string;
  yearlyPrice: string;
};

export type IntialStateType = {
  form: FormType;
  formError: FormType;
  plan: PlanType;
  addOns: AddOnsType[];
  isMonthly: boolean;
  isFormSubmitted: boolean;
};

export type ActionType =
  | {
      type: "FORM_INPUT";
      payload: { name: string; value: string };
    }
  | {
      type: "FORM_FILLED";
      payload: boolean;
    }
  | {
      type: "SUBMIT_FORM";
    }
  | {
      type: "SET_ERROR";
      payload: { name: string; email: string; number: string };
    }
  | {
      type: "SET_MONTHLYTOGGLE";
    }
  | {
      type: "ADD_PLAN";
      payload: { name: string; monthlyPrice: string; yearlyPrice: string };
    }
  | {
      type: "HANDLE_SERVICES";
      payload: {
        id: number;
        name: string;
        monthlyPrice: string;
        yearlyPrice: string;
      };
    }
  | {
      type: "TOGGLE_FORMSUBMIT";
      payload: boolean;
    };

export type AppContextType = {
  state: IntialStateType;
  dispatch: Dispatch<ActionType>;
};
