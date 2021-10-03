import React from "react";
import styles from "./StepAvatar.module.css";
const StepAvatar = ({ onNext }) => {
  return (
    <>
      <div>Step Avatar</div>
      <button onClick={onNext}></button>
    </>
  );
};
export default StepAvatar;
