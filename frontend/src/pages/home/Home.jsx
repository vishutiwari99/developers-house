import React from "react";
import { useHistory } from "react-router-dom";
import Button from "../../components/shared/button/Button";
import Card from "../../components/shared/card/Card";
import styles from "./Home.module.css";
const Home = () => {
  function startRegister() {
    history.push("/authenticate");
    console.log("clicked");
  }
  const history = useHistory();
  return (
    <div className="cardWrapper">
      <Card title="Welcome to Developer's House" icon="logo">
        <p className={styles.text}>
          Welcome to the Developer's House. This is the place where we talk
          about the new technology, trends and innovation and help eachother to
          learn and grow. And we are pleased to have you here.Please make sure
          to maintain the decorum this displine and follow the Code of Coduct.
        </p>
        <div>
          <Button onClick={startRegister} text="Lets Go" />
        </div>
        <div className={styles.signInWrapper}>
          <span className={styles.hasInvite}>Have an invite?</span>
        </div>
      </Card>
    </div>
  );
};

export default Home;
