import React from "react";
import { BallTriangle } from "react-loader-spinner";

const Spinner = () => {
  return (
    <div className="spinner">
      <BallTriangle width={100} height={100} color="white" />
    </div>
  );
};

export default Spinner;
