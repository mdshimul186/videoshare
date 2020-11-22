import styles from "./Branding4.module.css";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SpinnerComponent } from "react-element-spinner";

const Branding4 = () => {
  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();

  const [isPassModal, setPassModal] = useState(true);

  return (
    <div className={styles.brandingContainer}>
      <SpinnerComponent loading={false} position="global" />

      <p className={styles.brandingText}>Branding 4</p>
    </div>
  );
};

export default Branding4;
