import React from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "../../components/shared/button/Button";
import Card from "../../components/shared/card/Card";
import styles from "./Home.module.css";
const Home = () => {
  const signInLink = {
    color: "#0077ff",
    fontWeight: "bold",
    textDecoration: "none",
    marginLeft: "10px",
  };

  function startRegister() {
    history.push("/register");
    console.log("clicked");
  }
  const history = useHistory();
  return (
    <div className={styles.cardWrapper}>
      <Card title="Welcome to CodersHouse" icon="logo">
        <p className={styles.text}>
          loreudiwdw djwhdw dwduhwudhwd wjdhwudhwwwwwhshqshqshqisqsihsihqishiqh
          ishiqhsiqhsiqihsiqi suqhgsuqsh suhq
        </p>
        <div>
          <Button onClick={startRegister} text="Get your username" />
        </div>
        <div className={styles.signInWrapper}>
          <span className={styles.hasInvite}>Have an invite?</span>
          <Link style={signInLink} to="/login">
            Signin
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Home;
