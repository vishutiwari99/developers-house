import React, { useState } from "react";
import StepName from "../steps/stepName/StepName";
import StepAvatar from "../steps/stepAvatar/StepAvatar";
import StepGender from "../steps/stepGender/StepGender";
const steps = {
  1: StepName,
  2: StepGender,
  3: StepAvatar,
};
const Activate = () => {
  const [step, setStep] = useState(1);
  const Step = steps[step];
  return (
    <div className="cardWrapper">
      <Step onNext={() => setStep(step + 1)}></Step>
    </div>
  );
};

export default Activate;
