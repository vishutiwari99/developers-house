import React from "react";
import styles from "./StepUsername.module.css";
const StepUsername = ({ onNext }) => {
  return (
    <>
      <div>Step Username</div>
      <button onClick={onNext}></button>
    </>
  );
};
export default StepUsername;
