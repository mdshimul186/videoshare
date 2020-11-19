/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import AllUsers from "./AllUsers/AllUsers";

import axios from "axios";
import { useSelector } from "react-redux";
import { dashboardFetchUsers, changeTotalUsers } from "./usersAction";
import Header from "../dashboardHeader/Header";
import styles from "./users.module.css";
import { components } from "react-select";

import DottedStyles from "./SelectButtonStyles/DottedStyles";
import regeneratorRuntime from "regenerator-runtime";
import AllUsersData from "../dummydata/dummyUsers";

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
  return { users: state.users };
};
const mapDispatchToProps = (dispatch) => {
  return {
    dashboardFetchUsers: (data) => dispatch(dashboardFetchUsers(data)),
    changeTotalUsers: (data) => dispatch(changeTotalUsers(data)),
  };
};

/**
 * @description this is the dashboard content when you click scripts on the sidebar
 * @return {any}
 */

const Users = (props) => {
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
    //     props.dashboardFetchUsers(data);
    //     props.changeTotalUsers(data.length);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     return 400;
    //   });

    const data = AllUsersData;
    props.dashboardFetchUsers(data);
    props.changeTotalUsers(data.length);
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

  const {
    usersData,
    usersPerPage,
    currentPage,
    totalUsers,
    maxUsersPerPage,
  } = props.users;
  let nextPageButtonState = true;
  let prevPageButtonState = true;
  let totalPages = Math.ceil(totalUsers / usersPerPage);
  const indexOfLastUsers = currentPage * usersPerPage;
  const indexOfFirstUsers = indexOfLastUsers - usersPerPage;
  const currentUsers = usersData.slice(indexOfFirstUsers, indexOfLastUsers);
  const { minPage } = props.users;

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

  return (
    <div id="Users">
      <AllUsers
        minPage={minPage}
        totalScripts={totalUsers}
        usersToRender={currentUsers}
        totalPages={totalPages}
        pageNumber={currentPage}
        nextPageButtonState={nextPageButtonState}
        prevPageButtonState={prevPageButtonState}
        currentPage={currentPage}
        usersPerPage={usersPerPage}
        maxUsersPerPage={maxUsersPerPage}
      />
    </div>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Users);
