import { createContext, useContext, useReducer } from "react";
import { LoginReducer, initialState } from "./reducer";

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

export function useAuthState() {
  const context = useContext(AuthStateContext);

  if (context === undefined) {
    throw new Error("error with auth context");
  }
  return context;
}

export function useAuthDispatch() {
  const context = useContext(AuthDispatchContext);

  if (context === undefined) {
    throw new Error("error with auth context");
  }
  return context;
}

export const AuthProvider = ({ children }) => {
  const [user, dispatch] = useReducer(LoginReducer, initialState);

  return (
    <AuthStateContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
