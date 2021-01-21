import { createContext, useContext, useReducer } from "react";
import { ContextReducer, initialState } from "./accountReducer/accountReducer";

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

export function useAuthState() {
  const context = useContext(AuthStateContext);

  if (context === undefined) {
    throw new Error("error with Auth State Context");
  }
  return context;
}

export function useAuthDispatch() {
  const context = useContext(AuthDispatchContext);

  if (context === undefined) {
    throw new Error("Error with Auth Dispatch Context");
  }
  return context;
}

export const AuthProvider = ({ children }) => {
  const [context, dispatch] = useReducer(ContextReducer, initialState);

  return (
    <AuthStateContext.Provider value={context}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
