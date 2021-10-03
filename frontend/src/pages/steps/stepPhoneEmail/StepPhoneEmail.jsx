import React from "react";
import styles from "./StepPhoneEmail.module.css";
const StepPhoneEmail = ({ onNext }) => {
  return (
    <>
      <div>Phone or Email a</div>
      <button onClick={onNext}>Next</button>
    </>
  );
};

export default StepPhoneEmail;
