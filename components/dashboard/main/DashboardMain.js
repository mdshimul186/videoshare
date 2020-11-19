import React from "react";
import Header from "../dashboardHeader/Header";
import styles from "./DashboardMain.module.css";

const DashboardAnalyticsCard = (props) => {
  return (
    <div className={styles.analyticsCard}>
      <p className={styles.analyticsCardTitle}>{props.title}</p>
      <p className={styles.analyticsCardNumber}>{props.number}</p>
    </div>
  );
};

const DashboardVideos = (props) => {
  return (
    <div className={styles.videosCard}>
      <video></video>
      <p>{props.videoTitle}</p>
      <p>{props.videoDescription}</p>
      <p>{props.videoTime}</p>
      <p>{props.videoDate}</p>
      <p>{props.status}</p>
    </div>
  );
};

/**
 * @date 2020-09-09
 * @description this is the dashboard content when you click dashboard on the sidebar
 * @returns {any}
 */
const DashboardMain = () => {
  return (
    <div className={styles.MainDiv}>
      <Header />
      <div className={styles.Content}>
        {/* Row 1 */}
        <div className={styles.analytics}>
          <DashboardAnalyticsCard title="Videos" number="60" />
          <DashboardAnalyticsCard title="Total minutes" number="16" />
          <DashboardAnalyticsCard title="Open" number="43" />
          <DashboardAnalyticsCard title="On hold" number="64" />
        </div>
        {/* Row 2 */}
        <div className={styles.recentVideos}>
          {/* text wrappers */}
          <div className={styles.recentVideosWrapper}>
            <div className={styles.recentVideosTextWrapper}>
              <p className={styles.recentVideosText}>Recent Videos</p>
              <p className={styles.recentVideosAsOf}>
                as of 25 May 2019, 09:41 PM
              </p>
            </div>
            <button className={styles.recordVideo}>Record video</button>
          </div>

          {/* videos */}
          <div className={styles.recentMainVideos}>
            <DashboardVideos />
            <DashboardVideos />
            <DashboardVideos />
          </div>
        </div>
        {/* Row 3 */}
        <div className={styles.scriptsAndTasks}>
          <div className={styles.latestScripts}>
            <p>Latest scripts</p>
            <a href="#/#">View all</a>
            {/* insert table here */}
          </div>
          <div className={styles.tasks}>
            <p>Tasks</p>
            <p>Today</p>
            <a href="#/#">View all</a>
            {/* insert table here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
