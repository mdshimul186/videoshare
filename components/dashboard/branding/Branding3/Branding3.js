import styles from "./Branding3.module.css";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SpinnerComponent } from "react-element-spinner";

const Branding3 = () => {
  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();

  const [isPassModal, setPassModal] = useState(true);

  return (
    <div className={styles.brandingContainer}>
      <SpinnerComponent loading={false} position="global" />

      <p className={styles.brandingText}>Branding 3</p>
    </div>
  );
};

export default Branding3;
