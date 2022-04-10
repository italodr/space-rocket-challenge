import React, { createContext, useContext } from 'react';

import { useLocalStorage } from "../utils/use-localstorage";
import { showParticles } from "../utils/particles";

const StateContext = createContext(undefined);

const StateProvider = ({ children }) => {
  const [favourites, setFavourites] = useLocalStorage('favourites', []);

  const launchIsFavourite = (launch) => favourites.find(item => item.flight_number === launch.flight_number);

  const handleFavouriteLaunch = (event, launch) => {
    event.preventDefault();

    if (launchIsFavourite(launch)) {
      const filteredFavourites = favourites.filter(item => item.flight_number !== launch.flight_number);
      setFavourites(filteredFavourites);
    } else {
      showParticles(event);
      setFavourites([...favourites, launch]);
    }
  };

  return (
    <StateContext.Provider value={{ favourites, setFavourites, launchIsFavourite, handleFavouriteLaunch }}>
      {children}
    </StateContext.Provider>
  )
};

const useStateValue = () => useContext(StateContext);

export { StateContext, StateProvider, useStateValue };
