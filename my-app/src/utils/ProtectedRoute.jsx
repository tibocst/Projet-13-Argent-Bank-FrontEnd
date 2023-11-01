import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getLoginLogged } from "../features/login";

const ProtectedRoute = ({ children }) => {
  const logged = useSelector(getLoginLogged);
  let location = useLocation();

  if (logged === false ) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
