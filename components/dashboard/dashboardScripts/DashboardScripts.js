/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import AllScripts from "./AllScripts/AllScripts";
import NewScripts from "./NewScripts/NewScripts";
import NewSummaryMain from "./NewSummaryMain/NewSummaryMain";
import axios from "axios";
import { useSelector } from "react-redux";
import { dashboardFetchScript, changeTotalScripts } from "./scriptsAction";
import Header from "../dashboardHeader/Header";
import styles from "./DashboardScripts.module.css";
import { components } from "react-select";
import NewTemplateMain from "./NewTemplateMain/NewTemplateMain";
import DottedStyles from "./SelectButtonStyles/DottedStyles";
import regeneratorRuntime from "regenerator-runtime";
import AllSCRIPTData from "../dummydata/dummyscripts";

/**
 * @description this function gets the data asyncronously
 * it waits for the data to be retrieved and then updates the state
 * payload is AllScriptData (all scripts)
 * and AllScriptData.length (how long is the data or simply, how many data is stored)
 */
/**
 * @description
 * map state to props lets us get the state from the store and then bind it as props
 * you can see here that it was binded as scripts props
 * you can call it on default function DashboardScripts(props)
 * as props.scripts (this should give us the state)
 * @param {any} state state of the scripts
 * @return {any} scripts
 */
const mapStateToProps = (state) => {
  return { scripts: state.scripts };
};
const mapDispatchToProps = (dispatch) => {
  return {
    dashboardFetchScript: (data) => dispatch(dashboardFetchScript(data)),
    changeTotalScripts: (data) => dispatch(changeTotalScripts(data)),
  };
};

/**
 * @description this is the dashboard content when you click scripts on the sidebar
 * @return {any}
 */

const DashboardScripts = (props) => {
  const currentState = useSelector((state) => state);
  const { USERID } = currentState.auth.userData;
  // eslint-disable-next-line no-undef
  const { API_LINK } = process.env;
  const [selectedComponent, setSelectedComponent] = useState(null);
  console.log(selectedComponent);

  /**
   *
   * @param {any} props pass USERID as props
   */
  async function getDataFromApi(props) {
    // axios
    //   .post(API_LINK + "/scripts/getScripts", { USERID: USERID })
    //   .then((response) => {
    //     const { data } = response;
    //     console.log(data);
    //     props.dashboardFetchScript(data);
    //     props.changeTotalScripts(data.length);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     return 400;
    //   });

    const data = AllSCRIPTData;
    props.dashboardFetchScript(data);
    props.changeTotalScripts(data.length);
    // console.log(data);
  }

  const [didMount, setDidMount] = useState(false);
  const [selectedOption] = useState(null);

  /**
   * @description fire the getDataFromApi once
   */
  useEffect(() => {
    setDidMount(true);
    getDataFromApi(props);
    return () => setDidMount(false);
  }, []);

  if (!didMount) {
    return null;
  }
  // eslint-disable-next-line no-unused-vars
  const { newScriptButton } = props.scripts;
  const {
    scriptData,
    scriptsPerPage,
    currentPage,
    totalScripts,
    maxScriptPerPage,
  } = props.scripts;
  let nextPageButtonState = true;
  let prevPageButtonState = true;
  let totalPages = Math.ceil(totalScripts / scriptsPerPage);
  const indexOfLastScript = currentPage * scriptsPerPage;
  const indexOfFirstScript = indexOfLastScript - scriptsPerPage;
  const currentScripts = scriptData.slice(
    indexOfFirstScript,
    indexOfLastScript
  );
  const { minPage } = props.scripts;

  // activate next page button if there are data there
  if (currentPage === totalPages) {
    nextPageButtonState = false;
  } else {
    nextPageButtonState = true;
  }

  // activate previous button if page is greater than 1
  if (currentPage > 1) {
    prevPageButtonState = true;
  } else {
    prevPageButtonState = false;
  }

  if (totalPages === 0) {
    prevPageButtonState = false;
    nextPageButtonState = false;
    totalPages = 1;
  }
  const newScriptOptions = [
    { value: "Draft", label: "Draft" },
    { value: "Template", label: "Template" },
    { value: "Summary", label: "Summary" },
  ];

  const handleSelectValue = (selectedOption) => {
    const finalSelectedOption = selectedOption;
    console.log(finalSelectedOption);
    setSelectedComponent(finalSelectedOption.value);
  };
  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props} className="allScriptSelect">
        <SelectIcon />
      </components.DropdownIndicator>
    );
  };
  const SelectIcon = () => {
    return <img src="/tripledot.svg" alt="tripledot" />;
  };
  if (selectedComponent === "Draft") {
    return (
      <div id="Scripts">
        <NewScripts setSelectedComponent={setSelectedComponent} />
      </div>
    );
  }
  if (selectedComponent === "Template") {
    return (
      <div id="Template">
        <div className={styles.dashboardScriptsContent}>
          <Header />
          <div
            onClick={() => setSelectedComponent(null)}
            className={styles.backToScriptDashboardWrapper}
          >
            <img
              className={styles.blueLeftArrow}
              src="blueLeftArrow.svg"
              alt="arrow"
            />
            <p className={styles.backToScriptDashboardText}>
              Back to script dashboard
            </p>
          </div>
          <div className={styles.newScriptWrapper}>
            <NewTemplateMain
              handleSelectValue={handleSelectValue}
              DropdownIndicator={DropdownIndicator}
              customStyles={DottedStyles}
              newScriptOptions={newScriptOptions}
              selectedOption={selectedOption}
              setSelectedComponent={setSelectedComponent}
            />
          </div>
        </div>
      </div>
    );
  }
  if (selectedComponent === "Summary") {
    return (
      <div id="Summary">
        <div className={styles.dashboardScriptsSummary}>
          <Header />
          <div
            onClick={() => setSelectedComponent(null)}
            className={styles.backToScriptDashboardWrapper}
          >
            <img
              className={styles.blueLeftArrow}
              src="blueLeftArrow.svg"
              alt="arrow"
            />
            <p className={styles.backToScriptDashboardText}>
              Back to script dashboard
            </p>
          </div>
          <div className={styles.newScriptWrapper}>
            <NewSummaryMain
              handleSelectValue={handleSelectValue}
              DropdownIndicator={DropdownIndicator}
              customStyles={DottedStyles}
              newScriptOptions={newScriptOptions}
              selectedOption={selectedOption}
              setSelectedComponent={setSelectedComponent}
            />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div id="Scripts">
      <AllScripts
        minPage={minPage}
        totalScripts={totalScripts}
        scriptToRender={currentScripts}
        totalPages={totalPages}
        pageNumber={currentPage}
        nextPageButtonState={nextPageButtonState}
        prevPageButtonState={prevPageButtonState}
        currentPage={currentPage}
        scriptsPerPage={scriptsPerPage}
        maxScriptPerPage={maxScriptPerPage}
        setSelectedComponent={setSelectedComponent}
        handleSelectValue={handleSelectValue}
      />
    </div>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(DashboardScripts);
