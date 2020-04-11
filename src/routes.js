import React, { lazy } from "react";
import { Switch, Route } from "react-router-dom";

const HomePage = lazy(() => import("pages/HomePage"));

const Routes = () => {
  return (
    <>
      <Switch>
        <Route path="/" exact component={HomePage} />
      </Switch>
    </>
  );
};
export default Routes;
