import React from "react";
import Card from "../card/Card";
import styles from "./Loader.module.css";
const Loader = ({ message }) => {
  return (
    <div className="cardWrapper">
      <Card>
        <svg
          className={styles.spinner}
          width="41"
          height="42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.778 1.001A20 20 0 1 1 .542 25.627l3.876-.922a16.016 16.016 0 1 0 15.404-19.72l-.044-3.984Z"
            fill="#5453E0"
          />
        </svg>
        <span className={styles.message}>{message}</span>
      </Card>
    </div>
  );
};

export default Loader;
