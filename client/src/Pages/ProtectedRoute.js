import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const { Component } = props;
  let user = localStorage.getItem("hey-token");
  if (user) {
    console.log(user);
  } else {
    navigate("/login");
  }
  return (
    <div>
      <Component />
    </div>
  );
};

export default ProtectedRoute;
