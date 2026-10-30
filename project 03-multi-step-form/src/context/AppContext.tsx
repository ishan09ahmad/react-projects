import { createContext, useReducer } from "react";
import type { AppContextPropsType } from "../types/context.types.ts";
import type { AppContextType } from "../types/context.types.ts";
import { reducerFunc } from "../utils/data.ts";
import { initialState } from "../utils/data.ts";



export const AppContext = createContext<AppContextType | undefined>(undefined);

export default function AppContextProvider({ children }: AppContextPropsType) {
  const [state, dispatch] = useReducer(reducerFunc, initialState);
  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
