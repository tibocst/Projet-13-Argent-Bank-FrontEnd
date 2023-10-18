import React from "react";
import { useSelector } from "react-redux";
import {Navigate, useLocation} from "react-router-dom"

const ProtectedRoute = ({ children }) => {
    const check = useSelector((state) => state.login.isLogged)
    console.log("passéProctected")
    let location = useLocation();

  if (check === false) {
    return <Navigate to="/login" state={{ from: location}} replace />
  }
  return children;
};

export default ProtectedRoute;
