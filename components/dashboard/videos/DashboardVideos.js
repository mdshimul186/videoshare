import React from "react";
import Header from "../dashboardHeader/Header";
import styles from "./DashboardVideos.module.css";
import AllVideos from "./AllVideos/AllVideos";
/**
 * @description videos component that will be displayed if clicked from sidebar
 * @returns {any}
 */

const Videos = [
  {
    id: 1,
    title: "test video1",
    msg: "wew",
    isPlayed: true,
  },
  {
    id: 2,
    title: "test video2",
    msg: "wew",
    isPlayed: false,
  },
  {
    id: 3,
    title: "test video3",
    msg: "wew",
    isPlayed: false,
  },
  {
    id: 4,
    title: "test video4",
    msg: "wew",
    isPlayed: false,
  },
  {
    id: 5,
    title: "test video5",
    msg: "wew",
    isPlayed: true,
  },
  // {
  //   id: 6,
  //   title: "test video5",
  //   msg: "wew",
  //   isPlayed: false,
  // },
];

const DashboardVideos = () => {
  return (
    <div className={styles.Main}>
      <Header />
      <div className={styles.Content}>
        <div className={styles.Navigation}>
          {/* <input
            className={styles.searchInput}
            placeholder="Search Video"
          ></input> */}
          <div className={styles.searchInput}>
            <div className={styles.inputWithSearchGroup}>
              <img
                className={styles.searchIcon}
                alt="search"
                src="/scriptsearch.svg"
              ></img>
              <input
                className={styles.videoSearchInput}
                placeholder="Search videos"
              ></input>
            </div>
          </div>
          {/* <button className={styles.sortButton}>Sort</button>
          <button className={styles.listButton}>List</button>
          <button className={styles.recordVideo}>Record Video</button> */}
          <button className={styles.gridButton}>
            <div className={styles.gridButtonContent}>
              <img className={styles.gridButtonImage} src="grid.png"></img>
              <p className={styles.gridButtonText}>Grid</p>
            </div>
          </button>
        </div>
        <div className={styles.Videos}>
          <AllVideos Videos={Videos} />
        </div>
      </div>
    </div>
  );
};

export default DashboardVideos;
