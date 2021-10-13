import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/shared/button/Button";
import Card from "../../../components/shared/card/Card";
import Loader from "../../../components/shared/loader/Loader";
import { activate } from "../../../http";
import { setAvatar } from "../../../store/activateSlice";
import { setAuth } from "../../../store/authSlice";
import styles from "./StepAvatar.module.css";

const StepAvatar = ({ onNext }) => {
  const [loading, setLoading] = useState(false);
  const [mount, setMount] = useState(false);
  const dispatch = useDispatch();
  const { name, avatar } = useSelector((state) => state.activate);
  const { gender } = useSelector((state) => state.activate);
  const [image, setImage] = useState(function () {
    if (gender === "male") {
      return "/images/boy.png";
    }
    return "/images/girl.png";
  });

  function captureImage(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      console.log(reader.result);
      setImage(reader.result);
      dispatch(setAvatar(reader.result));
    };
    console.log(e);
  }
  async function submit() {
    setLoading(true);
    try {
      const { data } = await activate({ name, avatar, gender });
      if (data.auth) {
        if (!mount) {
          dispatch(setAuth(data));
        }
      }
      console.log(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    return () => {
      setMount(true);
    };
  }, []);

  if (loading) return <Loader message="Activation in progress" />;
  return (
    <>
      <Card title={`Okay,${name}`} icon="specs">
        <p className={styles.subHeading}>How's this photo?</p>
        <div className={styles.avatarWrapper}>
          <img className={styles.avatarImage} src={image} alt="avatar" />
        </div>
        <div>
          <input
            onChange={captureImage}
            id="avatarInput"
            type="file"
            className={styles.avatarInput}
          />
          <label className={styles.avatarLabel} htmlFor="avatarInput">
            Choose a different Photo
          </label>
        </div>
        <div>
          <Button onClick={submit} text="Next" />
        </div>
      </Card>
    </>
  );
};
export default StepAvatar;
