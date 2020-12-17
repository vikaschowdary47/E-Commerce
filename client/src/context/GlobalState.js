import { createContext, useReducer } from "react";
import { Redirect } from "react-router-dom";
import { reducer } from "./Reducer";

const initialState = {
  user: null,
  email: null,
  isAuthenticated: true,
  jwt_token: null,
};
export const GlobalContext = createContext(initialState);

export const GlobalContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const Logout = () => {
    console.log("Logout called");
    state.isAuthenticated = false;
    Redirect("/");
    dispatch({
      type: "LOGOUT",
    });
  };
  return (
    <GlobalContext.Provider value={{ state, Logout }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
