import React, { Suspense, lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Spin } from "antd";

import { favouritesRoute, mainRoute } from "./variables";

const Main: React.LazyExoticComponent<() => JSX.Element> = lazy(() =>
  import("./pages/Main")
);
const Favourites: React.LazyExoticComponent<() => JSX.Element> = lazy(() =>
  import("./pages/Favourites")
);

export default (): JSX.Element => (
  <Suspense fallback={<Spin size="large" />}>
    <Switch>
      <Route exact path={mainRoute}>
        <Main />
      </Route>
      <Route exact path={favouritesRoute}>
        <Favourites />
      </Route>
      <Redirect to={mainRoute} />
    </Switch>
  </Suspense>
);
