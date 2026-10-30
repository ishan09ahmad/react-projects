import { useContext } from "react";
import { Link, Navigate } from "react-router";
import { AppContext } from "../context/AppContext";
import checkIcon from "../assets/icon-checkmark.svg";
import { addOnsServices } from "../utils/data";
import type { addOnsServicesType } from "../types/types"; 


export default function AddOns() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("error");
  }
  const { state, dispatch } = context;

  function handleServices(service: addOnsServicesType) {
    dispatch({
      type: "HANDLE_SERVICES",
      payload: {
        id: service.id,
        name: service.name,
        monthlyPrice: service.monthlyPrice,
        yearlyPrice: service.yearlyPrice,
      },
    });
  }
  
  if (state.isFormSubmitted) return <Navigate to="/" />;
  return (
    <div className="w-full flex flex-col min-h-full relative">
      <section className="mb-8">
        <h2 className="text-[#02295A] text-3xl font-bold mb-2">Pick add-ons</h2>
        <p className="text-[#9699AB] text-base">
          Add-ons help enhance your gaming experience.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        {addOnsServices.map((service) => (
          <div
            onClick={() => handleServices(service)}
            key={service.id}
            className={`border rounded-lg cursor-pointer p-4 flex items-center gap-5 transition-colors ${
              state.addOns.find((item) => item.id === service.id)
                ? "border-[#473DFF] bg-[#F8F9FE]"
                : "border-[#D6D9E6] hover:border-[#473DFF]"
            }`}
          >
            <div className="shrink-0">
              {state.addOns.find((item) => item.id === service.id) ? (
                <div className="w-5 h-5 rounded-md flex items-center justify-center bg-[#473DFF] p-1">
                  <img src={checkIcon} alt="check-icon" className="w-full" />
                </div>
              ) : (
                <div className="w-5 h-5 rounded-md border border-[#D6D9E6] bg-white" />
              )}
            </div>

            <div className="flex flex-col flex-1 gap-1">
              <p className="text-sm font-bold text-[#02295A]">{service.name}</p>
              <p className="text-sm text-[#9699AB]">{service.detail}</p>
            </div>

            <div className="text-sm text-[#473DFF] font-medium">
              +$
              {state.isMonthly ? service.monthlyPrice : service.yearlyPrice}
              {state.isMonthly ? "/mo" : "/yr"}
            </div>
          </div>
        ))}
      </section>

      <section className="absolute bottom-0 left-0 right-0 bg-white p-4 flex items-center justify-between md:static md:mt-auto md:p-0">
        <Link
          to="/plan"
          className="text-[#9699AB] hover:text-[#02295A] text-sm font-medium"
        >
          Go Back
        </Link>

        <Link
          to="/summary"
          className="px-7 py-3 bg-[#02295A] hover:bg-[#174A8B] text-white text-sm rounded-lg transition-colors"
        >
          Next Step
        </Link>
      </section>
    </div>
  );
}
