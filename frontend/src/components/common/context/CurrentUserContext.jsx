import { createContext, useContext } from "react";

const CurrentUserContext = createContext(null);

export const CurrentUserProvider = ({ value, children }) => {
  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => {
  return useContext(CurrentUserContext);
};