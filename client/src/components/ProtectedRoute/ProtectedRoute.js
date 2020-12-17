import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({
  isAuthenticated: isAuthenticated,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        {
          isAuthenticated ? (
            <Component />
          ) : (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
