import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ children, userLoggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        window.localStorage.getItem("jwt") !== null ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
