import React from "react";
import styles from "./StepName.module.css";
const StepName = ({ onNext }) => {
  return (
    <>
      <div>Phone or Email</div>
      <button onClick={onNext}></button>
    </>
  );
};
export default StepName;
