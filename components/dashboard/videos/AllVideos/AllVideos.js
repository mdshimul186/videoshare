import React from "react";
import styles from "./AllVideos.module.css";
import Select from "react-select";

const newScriptOptions = [
  { value: "copyLink", label: "Copy link" },
  { value: "download", label: "Download" },
  { value: "delete", label: "Delete" },
];

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#0182FE" : "",
    color:
      state.value === "delete"
        ? "#EB5757"
        : state.isFocused
        ? "#FFFFFF"
        : "#9FA2B4",
    fontFamily: "Mulish",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "20px",
    letterSpacing: "0.2px",
    marginTop: "0",
  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",

    cursor: "pointer",
  }),
  placeholder: () => ({
    fontFamily: "Mulish",
  }),
  valueContainer: () => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  }),
  menu: (provided) => {
    const marginTop = "-10px";
    const width = "126px";
    return { ...provided, marginTop, width };
  },
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;

    return {
      ...provided,
      display,
      textAlign,
      justifyContent,
      alignItems,
      transition,
      opacity,
      marginTop,
      position,
      fontFamily,
      fontStyle,
      fontWeight,
      color,
      lineHeight,
      fontSize,
      letterSpacing,
    };
  },
};

const AllVideos = (props) => {
  const { Videos } = props;
  let AllVideosList = [];
  let handleOption = (e) => {
    alert(e.value);
  };
  Videos.forEach((video, i) => {
    AllVideosList.push(
      <React.Fragment key={video.id}>
        <div className={styles.VideoItems}>
          <div className={styles.videoThumbnail}>
            <img className={styles.thumbnailImage} src="videoman.png"></img>
            {video.isPlayed ? (
              <div className={styles.progressbar}>
                <div data-progress={"95"} className={styles.progress}></div>
              </div>
            ) : (
              <div className={styles.iconCircle}>
                <img className={styles.playIcon} src="play.png"></img>
              </div>
            )}
          </div>
          <div className={styles.videContent}>
            <div className={styles.column1}>
              <div className={styles.videoTitle}>{video.title}</div>
              <div className={styles.videoDescription}>{video.msg}</div>
            </div>
            <div className={styles.column2}>
              {!video.isPlayed && (
                <div className={styles.videoDuration}>
                  <p className={styles.videoDurationContent}>00:01:24</p>
                </div>
              )}

              <div className={styles.column3}>
                <p className={styles.videoCreatedAt}>14 april 2020</p>
              </div>
            </div>
            {!video.isPlayed && (
              <div>
                <Select
                  components={{
                    IndicatorSeparator: () => null,
                    DropdownIndicator: () => null,
                  }}
                  onChange={(e) => handleOption(e)}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  styles={customStyles}
                  isSearchable={false}
                  options={newScriptOptions}
                  value={null}
                  placeholder={<img src="/verticalThreedots.svg"></img>}
                />
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  });
  return (
    <div>
      <div className={styles.VideoWrapper}>{AllVideosList}</div>
    </div>
  );
};
export default AllVideos;
