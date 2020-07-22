import React from "react";
import { NavLink } from "react-router-dom";

import "./index.scss";

import { mainRoute, favouritesRoute } from "../../variables";

const link1: string = "Main";
const link2: string = "Favourites";

const activeName: string = "active"

export default (): JSX.Element => (
  <header id="header">
    <NavLink exact to={mainRoute} activeClassName={activeName} title={mainRoute}>
      {link1}
    </NavLink>
    <NavLink
      exact
      to={favouritesRoute}
      activeClassName={activeName}
      title={favouritesRoute}
    >
      {link2}
    </NavLink>
  </header>
);
