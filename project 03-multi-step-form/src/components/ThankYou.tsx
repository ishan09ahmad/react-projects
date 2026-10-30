import icon from "../assets/icon-thank-you.svg";

export default function ThankYou() {
  return (
    <div className="w-full min-h-100 md:min-h-full flex flex-col items-center justify-center text-center px-2 py-10">
      <img src={icon} alt="tick-icon" className="w-20 h-20 mb-7" />

      <h1 className="text-[#02295A] text-3xl font-bold mb-4">Thank you!</h1>

      <p className="text-[#9699AB] text-base leading-relaxed max-w-112.5">
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com.
      </p>
    </div>
  );
}
