export type navItemType = {
  id: number;
  step: string;
  name: string;
  route: string;
};


export type addOnsServicesType = {
  id: number;
  name: string;
  detail: string;
  monthlyPrice: string;
  yearlyPrice: string;
};

export type plansType = {
  id: number;
  name: string;
  monthlyPrice: string;
  yearlyPrice: string;
  icon: string;
};

export type FormType = {
  name: string;
  email: string;
  number: string;
};

export type FormErrorType = {
  name: string;
  email: string;
  number: string;
};
