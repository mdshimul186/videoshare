/* eslint-disable react/prop-types */
import React from "react";
import styles from "./AllScripts.module.css";
import AllScriptsTable from "../AllScriptsTable/AllScriptsTable";
import Pagination from "../Pagination/Pagination";
import { connect } from "react-redux";
import Header from "../../dashboardHeader/Header";
import Select from "react-select";

import {
  toggleCurrentDashboardScriptPage,
  changeMinPage,
  changeScriptsPerPage,
  toggleNewScriptButton,
} from "./actions/scriptsAction";

const mapDispatchToProps = (dispatch) => {
  return {
    // This fires if you click the new script button on the top right
    toggleNewScriptButton: () => dispatch(toggleNewScriptButton()),
    //change page to next page
    /**
     * @param {number} number page number
     * @return {void}
     * @description changeMinPage means changing the indicator number below (1-8 of 19) the number 1 is the minpage
     * it also has formula minPage+scriptsPerPage
     * the minPage will be incremented depending on how many scripts per page there is
     */
    toggleCurrentDashboardScriptPage: (number) =>
      dispatch(toggleCurrentDashboardScriptPage(number)),
    changeMinPage: (data) => dispatch(changeMinPage(data)),
    changeScriptsPerPage: (data) => dispatch(changeScriptsPerPage(data)),
  };
};
/**
 * @description This is the AllScripts component which displays all the scripts when scripts on dashboard sidebar is clicked
 * @param {number} minPage minimum number of page to be set
 * @param {Array} scriptToRender all scripts to be seen here on the page
 * @param {number} pageNumber current page number
 * @param {boolean} nextPageButtonState next page button state keeps track of the next button if it is available to be clicked or no
 * @param {boolean} prevPageButtonState prev page button state keeps track of the next button if it is available to be clicked or no
 * @param {number} scriptsPerPage number of scripts per page
 */

const newScriptOptions = [
  { value: "Draft", label: "Draft" },
  { value: "Template", label: "Template" },
  { value: "Summary", label: "Summary" },
];

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#0182FE" : "",
    color: state.isFocused ? "#FFFFFF" : "#9FA2B4",
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
    width: "126px",
    marginTop: "25px",
    marginLeft: "5px",
    height: "40px",
    background: "#0182fe",
    border: "1px solid #F0F1F7",
    boxSizing: "border-box",
    borderRadius: " 8px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
  placeholder: () => ({
    fontFamily: "Mulish",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "20px",
    textAlign: "center",
    letterSpacing: "0.2px",
    color: "#ffffff",
    width: "126px",
    height: "40px",
    outline: "none",
    border: "none",
    cursor: "pointer",
    marginTop: "20px",
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
    const transition = "opacity 300ms";
    const position = "block";
    const marginTop = "20px";
    const fontFamily = "Mulish";
    const fontStyle = "normal";
    const fontWeight = "600";
    const fontSize = "14px";
    const lineHeight = "20px";
    const letterSpacing = "0.3px";
    const color = "white";
    const display = "flex";
    const justifyContent = "center";
    const alignItems = "center";
    const textAlign = "center";

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

const AllScripts = (props) => {
  const {
    minPage,
    scriptToRender,
    maxScriptPerPage,
    pageNumber,
    prevPageButtonState,
    nextPageButtonState,
    scriptsPerPage,
    handleSelectValue,
  } = props;
  //initialize an empty array for us to store fetched data from the database
  const scriptsPerPageArr = [];

  //generates numbers for the number of pages dropdown at the bottom of the ui
  for (let i = 1; i <= maxScriptPerPage; i++) {
    scriptsPerPageArr.push(i);
  }

  /**
   * @description this function is responsible for reseting the page back to page 1
   * whenever a change in the scriptsPerPage was fired.
   * @param {void} props properties of main component it is in.
   * @param {event} event passed from the component that was called.
   */
  const handleScriptsPerPage = (props, event) => {
    props.changeScriptsPerPage(event.target.value);
    props.toggleCurrentDashboardScriptPage(1);
    props.changeMinPage(1);
  };
  /**
   *
   * @param {number} number accepts page number
   */
  const handleNextPageButton = (number) => {
    props.toggleCurrentDashboardScriptPage(number + 1);
    props.changeMinPage(Number(minPage) + Number(scriptsPerPage));
  };
  const handlePrevPageButton = (number) => {
    props.toggleCurrentDashboardScriptPage(number - 1);
    props.changeMinPage(Number(minPage) - Number(scriptsPerPage));
  };

  const ScriptOptions = () => {
    let tempScriptOptions = [];
    {
      scriptsPerPageArr.map(function (n) {
        tempScriptOptions.push(
          <option className={styles.DropdownOptions} key={n} value={n}>
            {n}
          </option>
        );
      });
    }
    return tempScriptOptions;
  };

  return (
    <div className={styles.dashboardScriptsContent}>
      <Header />
      <div className={styles.contentScripts}>
        <div className={styles.allScriptsWrapper}>
          <p className={styles.allScripts}>All scripts</p>
          <div className={styles.inputWithSearchGroup}>
            <img
              className={styles.searchIcon}
              alt="search"
              src="/scriptsearch.svg"
            ></img>
            <input
              className={styles.scriptSearchInput}
              placeholder="Search script"
            ></input>
          </div>
          {/* <button
						onClick={() => props.toggleNewScriptButton()}
						className={styles.scriptButton}
					>
						New script
					</button>
					 */}
          <Select
            components={{
              IndicatorSeparator: () => null,
              DropdownIndicator: () => null,
            }}
            onChange={handleSelectValue}
            className="react-select-container"
            classNamePrefix="react-select"
            styles={customStyles}
            isSearchable={false}
            options={newScriptOptions}
            placeholder="New Script"
          />
        </div>
        {/* table goes here */}
        <div className={styles.scriptTableContainer}>
          <div className={styles.scriptTable}>
            <div className={`flex-row ${styles.AllScriptTable}`}>
              <p className={styles.AllScriptTableTitle}>Title</p>
              <p className={styles.AllScriptTableStatus}>Status</p>
              <p className={styles.AllScriptTableScriptType}>Script Type</p>
              <p className={styles.AllScriptTableDate}>Date</p>
            </div>
            <div className={`${styles.divider} ${styles.scriptDivider}`}></div>
            <AllScriptsTable scriptToRender={scriptToRender} />
          </div>
        </div>
        <div className={`flex-row ${styles.AllScriptPaginationContainer}`}>
          <div className={styles.rowsPerPage}>
            <p className={styles.rowsPerPageText}>Rows per page:</p>
            <select
              className={styles.DropdownWrapper}
              name="select"
              onChange={(event) => {
                handleScriptsPerPage(props, event);
              }}
              defaultValue={scriptsPerPage}
              value={scriptsPerPage}
            >
              <ScriptOptions />
            </select>
          </div>
          <div className={styles.paginator}>
            <Pagination />
            <button
              className={styles.prevScriptButton}
              disabled={!prevPageButtonState}
              onClick={() => handlePrevPageButton(pageNumber)}
            ></button>
            <button
              className={styles.nextScriptButton}
              disabled={!nextPageButtonState}
              onClick={() => handleNextPageButton(pageNumber)}
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default connect(null, mapDispatchToProps)(AllScripts);
