import { createContext } from "react";

export const GlobalContext = createContext();

export const GlobalContextProvider = (props) => {
  return (
    <GlobalContext.Provider value="hello products">
      {props.children}
    </GlobalContext.Provider>
  );
};
