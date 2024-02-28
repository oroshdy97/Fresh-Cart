import React, { useContext } from "react";
import { authContext } from "../../Context/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  if (localStorage.getItem("token") === null) {
    return <Navigate to="/login"></Navigate>;
  }
  return <>{children}</>;
}

export default ProtectedRoute;
