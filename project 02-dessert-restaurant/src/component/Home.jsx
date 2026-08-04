import { useContext } from "react";
import Products from "./Products";
import Cart from "./Cart";
import tick from "../assets/images/icon-order-confirmed.svg";
import products from "../utils/data";
import {  ShopContext } from "../context/ShopProvider";
export default function Home() {
  const { state, dispatch } = useContext(ShopContext);
  const totalAmount = state.order.reduce(
    (tot, item) => tot + item.quantity * item.price,
    0,
  );
  return (
    <main className="max-w-7xl mx-auto px-8 pb-16 pt-8 sm:pt-16 md:py-20  ">
      <div className="flex flex-col items-start  gap-8 md:flex-row md:gap-6  ">
        <Products />
        <Cart />
      </div>

      {state.orderPlaced && (
        <div
          className=" bg-white w-full sm:max-w-100  fixed top-0 left-0 right-0 bottom-0
     sm:top-1/2 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2
     sm:bottom-auto sm:right-auto sm:rounded-xl 
    z-50 p-6"
        >
          <div>
            <img src={tick} alt="Order confirmed check icon" className="mb-4" />
            <p className="text-3xl font-bold mb-2 ">Order Confirmed</p>
            <p className="text-[#ad8985] mb-2">We hope you enjoy your food!</p>

            <div className="bg-[#f4edeb] rounded-lg flex flex-col gap-4  mb-4 ">
              <ul className="max-h-70 overflow-y-auto px-4 pt-3 ">
                {state.order.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between gap-3 border-b border-[#ad8985]  py-4"
                  >
                    <div className="flex  items-center gap-2">
                      <img
                        src={item.thumbnail}
                        alt={`Thumbnail of ${item.name}`}
                        className=" w-12.5"
                      />

                      <div className="">
                        <p className="font-semibold text-sm">{item.name}</p>
                        <div className="flex items-center gap-4 ">
                          <p className="text-base text-[hsl(14,86%,42%)] font-semibold">
                            {item.quantity}x
                          </p>
                          <p className="text-base text-[#ad8985]">
                            @ ${item.price}
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="text-base text-[#87635a] font-semibold">
                      ${item.quantity * item.price}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between px-4 pb-4 ">
                <p className="font-semibold text-[#87635a]">Order Total</p>
                <p className="font-bold text-3xl">${totalAmount}</p>
              </div>
            </div>

            <button
              className="font-medium text-lg text-center w-full cursor-pointer bg-[#c73a0f]  p-4 rounded-[50px] text-white hover:bg-[hsl(12,20%,44%)] "
              onClick={() => {
                dispatch({ type: "RESET" });
              }}
            >
              Start new Order
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
