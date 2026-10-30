import {
  useContext,
  useEffect,
  type ChangeEvent,
  type SubmitEvent,
} from "react";
import { useNavigate } from "react-router";
import { AppContext } from "../context/AppContext";
import { validateForm } from "../utils/data.ts";

export default function Info() {
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

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.name === "number") {
      if (!/^\d*$/.test(e.target.value)) return;
    }
    dispatch({
      type: "FORM_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  }

  function handleForm(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!checkValidation()) return;
    dispatch({ type: "FORM_FILLED", payload: true });
    navigate("/plan");
  }

  useEffect(() => {
    if (state.isFormSubmitted) {
      dispatch({ type: "TOGGLE_FORMSUBMIT", payload: false });
    }
  }, []);
  return (
    <div className="w-full flex flex-col min-h-full relative">
      <section className="mb-8">
        <h1 className="text-[#02295A] text-3xl font-bold leading-tight mb-2">
          Personal info
        </h1>
        <p className="text-[#9699AB] text-base">
          Please provide your name, email address, and phone number.
        </p>
      </section>

      <form
        action=""
        className="flex flex-col gap-6 flex-1"
        onSubmit={handleForm}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label htmlFor="name" className="text-sm text-[#02295A]">
              Name
            </label>
            {state.formError.name && (
              <p className="text-[#ED3548] text-xs font-bold">
                {state.formError.name}
              </p>
            )}
          </div>

          <input
            type="text"
            id="name"
            name="name"
            value={state.form.name}
            placeholder="e.g. Stephen King"
            className={`w-full border rounded-lg px-4 py-3 text-sm font-medium text-[#02295A] outline-none placeholder:text-[#9699AB] focus:border-[#473DFF] ${
              state.formError.name ? "border-[#ED3548]" : "border-[#D6D9E6]"
            }`}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label htmlFor="email" className="text-sm text-[#02295A]">
              Email Address
            </label>
            {state.formError.email && (
              <p className="text-[#ED3548] text-xs font-bold">
                {state.formError.email}
              </p>
            )}
          </div>

          <input
            type="text"
            id="email"
            name="email"
            value={state.form.email}
            placeholder="e.g. stephenking@lorem.com"
            className={`w-full border rounded-lg px-4 py-3 text-sm font-medium text-[#02295A] outline-none placeholder:text-[#9699AB] focus:border-[#473DFF] ${
              state.formError.email ? "border-[#ED3548]" : "border-[#D6D9E6]"
            }`}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label htmlFor="number" className="text-sm text-[#02295A]">
              Phone Number
            </label>
            {state.formError.number && (
              <p className="text-[#ED3548] text-xs font-bold">
                {state.formError.number}
              </p>
            )}
          </div>

          <input
            type="text"
            id="number"
            name="number"
            inputMode="numeric"
            value={state.form.number}
            placeholder="e.g. +1 234 567 890"
            className={`w-full border rounded-lg px-4 py-3 text-sm font-medium text-[#02295A] outline-none placeholder:text-[#9699AB] focus:border-[#473DFF] ${
              state.formError.number ? "border-[#ED3548]" : "border-[#D6D9E6]"
            }`}
            onChange={handleChange}
          />
        </div>

        <section className="absolute bottom-0 left-0 right-0 bg-white p-4 flex justify-end md:static md:mt-auto md:p-0">
          <button
            type="submit"
            className="px-7 py-3 bg-[#02295A] hover:bg-[#174A8B] text-white text-sm font-medium cursor-pointer rounded-lg transition-colors"
          >
            Next Step
          </button>
        </section>
      </form>
    </div>
  );
}
