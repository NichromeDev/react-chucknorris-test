import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import FavouritesContext from "./context/FavouritesContext";
import { useFavourites } from "./hooks/favourites.hook";

import {Header} from "./components"
import Routes from "./Routes";

import "./styles/App.scss"

export default (): JSX.Element => {
  const { add, remove, clear, favourites } = useFavourites();

  return (
    <FavouritesContext.Provider
      value={{
        add,
        remove,
        clear,
        favourites,
      }}
    >
      <div className="App">
        <Router>
          <Header />
          <Routes />
        </Router>
      </div>
    </FavouritesContext.Provider>
  );
};
