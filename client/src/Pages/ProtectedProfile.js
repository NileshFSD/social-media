import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedProfile = (props) => {
  const navigate = useNavigate();
  const { Component } = props;
  useEffect(() => {
    let user = localStorage.getItem("hey-token");
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);
  return (
    <div>
      <Component />
    </div>
  );
};

export default ProtectedProfile;
