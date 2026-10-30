import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router";
import ThankYou from "../components/ThankYou";
import { validateForm } from "../utils/data";

export default function Summary() {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("error");
  }
  const { state, dispatch } = context;
  function checkValidation() {
    const error = validateForm(state.form);

    dispatch({ type: "SET_ERROR", payload: error });

    return !error.name && !error.email && !error.number;
  }
  function handleFormSubmit() {
    if (!checkValidation()) {
      navigate("/");
    } else dispatch({ type: "SUBMIT_FORM" });
  }

  if (state.isFormSubmitted) return <ThankYou />;
  return (
    <div className="w-full flex flex-col min-h-full relative">
      <section className="mb-8">
        <h2 className="text-[#02295A] text-3xl font-bold mb-2">Finishing up</h2>
        <p className="text-[#9699AB] text-base">
          Double-check everything looks OK before confirming.
        </p>
      </section>

      <section className="bg-[#F8F9FE] rounded-lg p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[#02295A] font-bold text-sm">
              {state.plan.name} ({state.isMonthly ? "Monthly" : "Yearly"})
            </p>

            <Link
              to="/plan"
              className="text-[#9699AB] underline text-sm hover:text-[#473DFF]"
            >
              Change
            </Link>
          </div>

          <p className="text-[#02295A] font-bold text-sm">
            +$
            {state.isMonthly ? state.plan.monthlyPrice : state.plan.yearlyPrice}
            /{state.isMonthly ? "mo" : "yr"}
          </p>
        </div>

        <div className="border-t border-[#D6D9E6]" />

        {/* Selected add-ons */}
        <div className="flex flex-col gap-4">
          {state.addOns.map((service) => (
            <div key={service.id} className="flex items-center justify-between">
              <p className="text-[#9699AB] text-sm">{service.name}</p>

              <p className="text-[#02295A] text-sm font-medium">
                +${state.isMonthly ? service.monthlyPrice : service.yearlyPrice}
                /{state.isMonthly ? "mo" : "yr"}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex items-center justify-between px-5 py-6">
        <p className="text-[#9699AB] text-sm">
          Total (per {state.isMonthly ? "month" : "year"})
        </p>

        <p className="text-[#473DFF] font-bold text-xl">
          +$
          {Number(
            state.isMonthly ? state.plan.monthlyPrice : state.plan.yearlyPrice,
          ) +
            state.addOns.reduce(
              (total, service) =>
                total +
                Number(
                  state.isMonthly ? service.monthlyPrice : service.yearlyPrice,
                ),
              0,
            )}
          /{state.isMonthly ? "mo" : "yr"}
        </p>
      </section>

      {/* Navigation */}
      <section className="absolute bottom-0 left-0 right-0 bg-white p-4 flex items-center justify-between md:static md:mt-auto md:p-0">
        <Link
          to="/add-ons"
          className="text-[#9699AB] hover:text-[#02295A] text-sm font-medium"
        >
          Go Back
        </Link>

        <button
          onClick={handleFormSubmit}
          className="px-7 py-3 bg-[#473DFF] hover:bg-[#928CFF] text-white text-sm rounded-lg transition-colors cursor-pointer"
        >
          Confirm
        </button>
      </section>
    </div>
  );
}
