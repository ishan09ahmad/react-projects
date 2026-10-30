import { useContext } from "react";
import { Link, Navigate } from "react-router";
import { AppContext } from "../context/AppContext";
import type { plansType } from "../types/types";
import { plans } from "../utils/data";



export default function Plan() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("error");
  }

  const { state, dispatch } = context;

  function handleMontlyToggle() {
    dispatch({ type: "SET_MONTHLYTOGGLE" });
  }

  function handlePlan(plan: plansType) {
    dispatch({
      type: "ADD_PLAN",
      payload: {
        name: plan.name,
        monthlyPrice: plan.monthlyPrice,
        yearlyPrice: plan.yearlyPrice,
      },
    });
  }
  if (state.isFormSubmitted) return <Navigate to="/" />;

 return (
  <div className="w-full flex flex-col min-h-full relative">
    <section className="mb-8">
      <h2 className="text-[#02295A] text-3xl font-bold mb-2">
        Select your plan
      </h2>
      <p className="text-[#9699AB] text-base">
        You have the option of monthly or yearly billing.
      </p>
    </section>

    <section className="flex flex-col gap-6">
     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => handlePlan(plan)}
            className={`border rounded-lg p-4 md:p-4 flex md:flex-col items-center md:items-start gap-4 md:gap-10 cursor-pointer transition-colors ${
              state.plan.name === plan.name
                ? "border-[#473DFF] bg-[#F8F9FE]"
                : "border-[#D6D9E6] hover:border-[#473DFF]"
            }`}
          >
            <img
              src={plan.icon}
              alt="planicons"
              className="w-10 h-10"
            />

            <div className="flex flex-col gap-1">
              <p className="text-[#02295A] font-bold text-base">
                {plan.name}
              </p>

              <p className="text-[#9699AB] text-sm">
                ${state.isMonthly ? plan.monthlyPrice : plan.yearlyPrice}
                {state.isMonthly ? "/mo" : "/yr"}
              </p>

              {!state.isMonthly && (
                <p className="text-[#02295A] text-xs font-medium mt-1">
                  2 months free
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Monthly / Yearly toggle */}
      <div className="flex items-center justify-center gap-6 bg-[#F8F9FE] rounded-lg py-4">
        <p
          className={`text-sm font-bold ${
            state.isMonthly ? "text-[#02295A]" : "text-[#9699AB]"
          }`}
        >
          Monthly
        </p>

        <div
          onClick={handleMontlyToggle}
          className={`w-10 h-5 bg-[#02295A] flex items-center px-1 cursor-pointer rounded-full ${
            state.isMonthly ? "justify-start" : "justify-end"
          }`}
        >
          <div className="bg-white w-3 h-3 rounded-full" />
        </div>

        <p
          className={`text-sm font-bold ${
            !state.isMonthly ? "text-[#02295A]" : "text-[#9699AB]"
          }`}
        >
          Yearly
        </p>
      </div>
    </section>

    {/* Navigation */}
    <section className="absolute bottom-0 left-0 right-0 bg-white p-4 flex items-center justify-between md:static md:mt-auto md:p-0">
      <Link
        to="/"
        className="text-[#9699AB] hover:text-[#02295A] text-sm font-medium"
      >
        Go Back
      </Link>

      <Link
        to="/add-ons"
        className="px-7 py-3 bg-[#02295A] hover:bg-[#174A8B] text-white text-sm rounded-lg transition-colors"
      >
        Next Step
      </Link>
    </section>
  </div>
);
}
