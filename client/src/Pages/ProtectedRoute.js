import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  let user = localStorage.getItem("hey-token");
  return user ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRoute;
