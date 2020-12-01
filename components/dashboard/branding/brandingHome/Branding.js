import React, { useState,useEffect } from "react";
import { useSelector } from 'react-redux'
import styles from "./Branding.module.css";
import Branding1 from "../Branding1/Branding1";
import Branding2 from "../Branding2/Branding2";
import Branding4 from "../Branding4/Branding4";
import Branding3 from "../Branding3/Branding3";
import Header from "../../dashboardHeader/Header";

const Branding = () => {
  const [tab, setTab] = useState("");

  const { userData } = useSelector(state => state.auth)

  useEffect(()=>{
      if(userData.accessType){
        if(userData.accessType.branding1){
          setTab("branding1")
        }else if(userData.accessType.branding2){
          setTab("branding2")
        }else if(userData.accessType.branding3){
          setTab("branding3")
        }else if(userData.accessType.branding4){
          setTab("branding4")
        }
      }
  },[userData.branding])

  return (
    <div>
      {true ? (
        <div className={styles.dashboardContent} id="dashboardSettings">
          <Header />
          <div className={styles.dashboardButtonsWrapper}>
            {
              userData && userData.accessType && userData.accessType.branding1 &&
              (
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
              )
            }

            {
              userData && userData.accessType && userData.accessType.branding2 &&
              (
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
              )
            }

            {
              userData && userData.accessType && userData.accessType.branding3 &&
              (
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
              )
            }

            {
              userData && userData.accessType && userData.accessType.branding4 &&
              (
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
              )
            }



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
