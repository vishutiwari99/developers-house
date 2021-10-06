import React, { useState } from "react";
import Button from "../../../../components/shared/button/Button";
import Card from "../../../../components/shared/card/Card";
import TextInput from "../../../../components/shared/textInput/TextInput";
import styles from "../StepPhoneEmail.module.css";
const Email = ({ onNext }) => {
  const [email, setEmail] = useState("");
  return (
    <Card title="Enter your email id" icon="email">
      <TextInput value={email} onChange={(e) => setEmail(e.target.value)} />
      <div>
        <div className={styles.actionButtonWrapper}>
          <Button text="Next" onClick={onNext} />
        </div>
        <p className={styles.bottomParagraph}>
          By entering your email, you're agreeing to our Terms of Service and
          privacy Policy. Thanks!
        </p>
      </div>
    </Card>
  );
};

export default Email;
