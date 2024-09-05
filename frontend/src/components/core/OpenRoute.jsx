import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Navigate } from "react-router-dom";

const OpenRoute = ({ children }) => {
  const { token } = useContext(UserContext);

  if (token !== null) {
    return <Navigate to={"/dashboard"} />;
  }

  return children;
};

export default OpenRoute;
