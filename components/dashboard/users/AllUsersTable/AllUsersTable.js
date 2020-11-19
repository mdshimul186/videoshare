import React from "react";
import { connect } from "react-redux";
import style from "./AllUsersTable.module.css";
import Select from "react-select";

const mapStateToProps = (state) => {
  return { users: state.users };
};

const usersOption = [
  { value: "edit", label: "Edit" },
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
    const marginLeft = "-130px";
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

const AllUsersTable = ({ usersToRender }) => {
  let handleOption = (e) => {
    alert(e.value);
  };
  const users = usersToRender;

  const AllUsersList =
    users &&
    users.map((user) => {
      return (
        <React.Fragment key={user.USERID}>
          <div className={`flex-row ${style.AllUsersTable}`}>
            <div className={style.userinfo}>
              <img className={style.userAvatar} src="videoman.png"></img>
              <p className={style.userName}>{user.NAME}</p>
            </div>
            <p className={`${style.role} ${style.userRole}	`}>{user.ROLE}</p>
            <p className={`${style.branding} ${style.userBranding}`}>
              {user.BRANDING}
            </p>
            <div className={style.action}>
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
                options={usersOption}
                value={null}
                placeholder={<img src="/verticalThreedots.svg"></img>}
              />
            </div>
          </div>
          <div className="divider script-divider"></div>
        </React.Fragment>
      );
    });
  if (users.loading) {
    return <p className={style.LoadingText}>Users are loading</p>;
  } else if (users.length === 0) {
    return <p className={style.NoScriptText}>You have no users yet!.</p>;
  } else {
    return <div>{AllUsersList}</div>;
  }
};

export default connect(mapStateToProps)(AllUsersTable);
