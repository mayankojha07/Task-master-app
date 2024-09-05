import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { token } = useContext(UserContext);

  if (token === null) {
    return <Navigate to={"/login"} />;
  }

  return children;
};

export default PrivateRoute;
