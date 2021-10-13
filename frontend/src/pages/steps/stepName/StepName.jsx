import React, { useState } from "react";
import Button from "../../../components/shared/button/Button";
import Card from "../../../components/shared/card/Card";
import TextInput from "../../../components/shared/textInput/TextInput";
import styles from "./StepName.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "../../../store/activateSlice";

const StepName = ({ onNext }) => {
  const { name } = useSelector((state) => state.activate);
  const dispatch = useDispatch();
  const [fullname, setFullname] = useState(name);
  function nextStep() {
    if (!fullname) {
      return;
    }
    dispatch(setName(fullname));
    onNext();
  }
  return (
    <>
      <Card title="Enter your fullname" icon="specs">
        <TextInput
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
        <p className={styles.paragraph}>
          People must use real names at Developers House :) !
        </p>
        <div>
          <Button onClick={nextStep} text="Next" />
        </div>
      </Card>
    </>
  );
};
export default StepName;
