import React from "react";
import StepPhoneEmail from "../steps/stepPhoneEmail/StepPhoneEmail";
import StepOtp from "../steps/stepOtp/StepOtp";
import { useState } from "react";

const steps = {
  1: StepPhoneEmail,
  2: StepOtp,
};
const Login = () => {
  const [step, setStep] = useState(1);
  const Step = steps[step];
  function onNext() {
    setStep((step) => step + 1);
  }
  return <Step onNext={onNext} />;
};

export default Login;
