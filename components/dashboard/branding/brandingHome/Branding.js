import React, { useState } from "react";
import styles from "./Branding.module.css";
import Branding1 from "../Branding1/Branding1";
import Branding2 from "../Branding2/Branding2";
import Branding4 from "../Branding4/Branding4";
import Branding3 from "../Branding3/Branding3";
import Header from "../../dashboardHeader/Header";

const Branding = () => {
  const [tab, setTab] = useState("branding1");
  return (
    <div>
      {true ? (
        <div className={styles.dashboardContent} id="dashboardSettings">
          <Header />
          <div className={styles.dashboardButtonsWrapper}>
            <div
              onClick={() => setTab("branding1")}
              className={
                tab === "branding1"
                  ? `${styles.DashboardContentButtonActive}`
                  : `${styles.DashboardContentButton}`
              }
            >
              <a href="#/">Branding 1</a>
            </div>

            <div
              onClick={() => setTab("branding2")}
              className={
                tab === "branding2"
                  ? `${styles.DashboardContentButtonActive}`
                  : `${styles.DashboardContentButton}`
              }
            >
              <a href="#/">Branding 2</a>
            </div>

            <div
              onClick={() => setTab("branding3")}
              className={
                tab === "branding3"
                  ? `${styles.DashboardContentButtonActive}`
                  : `${styles.DashboardContentButton}`
              }
            >
              <a href="#/">Branding 3</a>
            </div>

            <div
              onClick={() => setTab("branding4")}
              className={
                tab === "branding4"
                  ? `${styles.DashboardContentButtonActive}`
                  : `${styles.DashboardContentButton}`
              }
            >
              <a href="#/">Branding 4</a>
            </div>
          </div>

          {tab === "branding1" && <Branding1 />}
          {tab === "branding2" && <Branding2 />}
          {tab === "branding3" && <Branding3 />}
          {tab === "branding4" && <Branding4 />}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Branding;
