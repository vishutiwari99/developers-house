import React, { useState } from "react";
import styles from "./Register.module.css";
import StepPhoneEmail from "../steps/stepPhoneEmail/StepPhoneEmail";
import StepAvatar from "../steps/stepAvatar/StepAvatar";
import StepName from "../steps/stepName/StepName";
import StepOtp from "../steps/stepOtp/StepOtp";
import StepUsername from "../steps/stepUsername/StepUsername";
const steps = {
  1: StepPhoneEmail,
  2: StepOtp,
  3: StepName,
  4: StepAvatar,
  5: StepUsername,
};

const Register = () => {
  const [step, setStep] = useState(1);
  const Step = steps[step];
  function onNext() {
    setStep((step) => step + 1);
  }
  return (
    <div>
      <Step onNext={onNext} />
    </div>
  );
};

export default Register;
