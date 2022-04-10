import React, { createContext, useContext } from 'react';
import { useLocalStorage } from "../utils/use-localstorage";

const StateContext = createContext(undefined);

const StateProvider = ({ children }) => {
  const [favourites, setFavourites] = useLocalStorage('favourites', []);

  return (
    <StateContext.Provider value={{ favourites, setFavourites }}>
      {children}
    </StateContext.Provider>
  )
};

const useStateValue = () => useContext(StateContext);

export { StateContext, StateProvider, useStateValue };
