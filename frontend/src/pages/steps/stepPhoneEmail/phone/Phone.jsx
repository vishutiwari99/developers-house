import React, { useState } from "react";
import Button from "../../../../components/shared/button/Button";
import Card from "../../../../components/shared/card/Card";
import TextInput from "../../../../components/shared/textInput/TextInput";
import styles from "../StepPhoneEmail.module.css";
import { sendOtp } from "../../../../http/index";
import { useDispatch } from "react-redux";
import { setOtp } from "../../../../store/authSlice";

const Phone = ({ onNext }) => {
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();

  async function submit() {
    // server request
    if (!phone) return;
    const { data } = await sendOtp({ phone });
    console.log(data);
    dispatch(setOtp({ phone: data.phone, hash: data.hash }));
    onNext();
  }

  return (
    <Card title="Enter your phone number" icon="phone">
      <TextInput value={phone} onChange={(e) => setPhone(e.target.value)} />
      <div>
        <div className={styles.actionButtonWrapper}>
          <Button text="Next" onClick={submit} />
        </div>
        <p className={styles.bottomParagraph}>
          By entering your number, you're agreeing to our Terms of Service and
          privacy Policy. Thanks!
        </p>
      </div>
    </Card>
  );
};

export default Phone;
