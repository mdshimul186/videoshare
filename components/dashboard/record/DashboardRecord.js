import React from "react";
import Header from "../dashboardHeader/Header";
import styles from "./DashboardRecord.module.css";

/**
 * @date 2020-09-09
 * @description this is the dashboard record when you click dashboard on the sidebar
 * @returns {any}
 */
const DashboardRecord = () => {
  return (
    <div className={styles.MainDiv}>
      <Header />
    </div>
  );
};

export default DashboardRecord;
