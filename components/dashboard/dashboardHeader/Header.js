import React, { useEffect } from "react";
import styles from "./header.module.css";
import { useSelector } from "react-redux";
import Select from "react-select";
import Cookies from "js-cookie";
import Router from "next/router";

const usersOption = [
  { value: "logout", label: "Logout" },
];


const customStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#FFFFFF" : "",
    color:
      state.value === "logout"
        ? "#EB5757"
        : state.isFocused
          ? "#FFFFFF"
          : "#9FA2B4",
    fontFamily: "Mulish",
    fontStyle: "normal",
    fontWeight: "800",
    fontSize: "14px",
    lineHeight: "20px",
    letterSpacing: "0.2px",
    marginTop: "0",
    textAlign:"left",
    cursor:"pointer"
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
    const marginTop = "-5px";
    const marginLeft = "-85px";
    const width = "126px";
    return { ...provided, marginTop, width, marginLeft };
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

const Header = (props) => {
  const currentState = useSelector((state) => state);

  const { userData } = currentState.auth;

  const { MainText } = props;

  let handleOption = (e) => {
    if (e.value === 'logout') {
      Cookies.remove("videoshare_token");
      Router.push("/login");       
    }
  };
  return (
    <div className={styles.dashboardHeader}>
      <p className={styles.settingText}>{MainText}</p>
      {/* <img
        className={styles.dashboardSearch}
        src="/dashboardSearch.svg"
        alt="search"
      ></img>
      <img
        className={styles.dashboardNotification}
        src="/dashboardNotificationBell.svg"
        alt="notification"
      ></img>
      <p className={styles.dashboardDivider}></p> */}
      <div className={styles.dashboardUserWrapper}>
        <p
          className={styles.dashboardUsername}
        >{`${userData.firstName} ${userData.lastName}`} ({userData.role})</p>
        <Select
          components={{
            IndicatorSeparator: () => null,
            DropdownIndicator: () => false,
          }}
          onChange={(e) => handleOption(e)}
          className="react-select-container"
          classNamePrefix="react-select"
          styles={customStyles}
          isSearchable={false}
          options={usersOption}
          placeholder={<img
            className={styles.dashboardAvatar}
            src={userData.profilePicture || "/dashboardAvatar.svg"}
            alt="avatar"
          ></img>}
        />

      </div>
    </div>
  );
};
export default Header;
