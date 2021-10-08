import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../../../components/shared/button/Button";
import Card from "../../../components/shared/card/Card";
import { setGender as setGenderAction } from "../../../store/activateSlice";
import styles from "./StepGender.module.css";

const StepGender = ({ onNext }) => {
  const dispatch = useDispatch();
  const [gender, setGender] = useState("");
  function nextStep() {
    if (!gender) {
      return;
    }
    dispatch(setGenderAction(gender));
    onNext();
  }
  return (
    <>
      <Card title="Select your gender" icon="specs">
        <p>Pleas?</p>
        <div className={styles.genderWrapper}>
          <div
            style={{ marginRight: "10px" }}
            onClick={() => setGender("male")}
          >
            <input
              type="radio"
              value={gender}
              checked={gender === "male"}
              onClick={() => setGender("male")}
            />
            <label htmlFor="">Male</label>
          </div>
          <div onClick={() => setGender("female")}>
            <input
              type="radio"
              value={gender}
              checked={gender === "female"}
              onClick={() => setGender("female")}
            />
            <label htmlFor="">Female</label>
          </div>
        </div>
        <div>
          <Button onClick={nextStep} text="Next" />
        </div>
      </Card>
    </>
  );
};

export default StepGender;
