import { createContext, useReducer } from "react";

export const ShopContext = createContext();

const initialState = {
  cart: [],
  order: [],
  orderPlaced: false,
};

function reducer(state, action) {
  switch (action.type) {

    case "ADD_TO_CART": {
      return { ...state, cart: [...state.cart, action.payload] };
    }

    case "CLEAR_CART": {
      return { ...state, cart: [] };
    }

    case "DECREMENT_QUANTITY": {
      return {
        ...state,
        cart: state.cart
          .map((item) => {
            if (item.id === action.payload) {
              return { ...item, quantity: item.quantity - 1 };
            } else {
              return item;
            }
          })
          .filter((item) => item.quantity !== 0),
      };
    }

    case "INCREMENT_QUANTITY": {
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item.id === action.payload) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        }),
      };
    }

    case "REMOVE_FROM_CART": {
      return {
        ...state,
        cart: state.cart.filter((i) => i.id !== action.payload),
      };
    }

    case "PLACE_ORDER":return{
      ...state,
cart:[],
order:state.cart,
orderPlaced:true
    }

    case "RESET":return{
      ...state,
cart:[],
order:[],
orderPlaced:false
    }
    
    default: {
      return state;
    }
  }
}

export default function ShopProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ShopContext.Provider value={{ state, dispatch }}>
      {children}
    </ShopContext.Provider>
  );
}
