import React, { useState } from "react";
import Button from "../../../components/shared/button/Button";
import Card from "../../../components/shared/card/Card";
import TextInput from "../../../components/shared/textInput/TextInput";
import styles from "./StepOtp.module.css";
const StepOtp = ({ onNext }) => {
  const [otp, setOtp] = useState("");
  const next = () => {};
  return (
    <>
      <div className={styles.cardWrapper}>
        <Card title="Enter the code you just received" icon="lock">
          <TextInput value={otp} onChange={(e) => setOtp(e.target.value)} />
          <div className={styles.actionButtonWrapper}>
            <Button onClick={next} text="Next" />
          </div>
          <p className={styles.bottomParagraph}>
            By entering your email, you're agreeing to our Terms of Service and
            privacy Policy. Thanks!
          </p>
        </Card>
      </div>
    </>
  );
};

export default StepOtp;
