/* eslint-disable react/prop-types */
import React from "react";
import styles from "./AllUsers.module.css";
import AllUsersTable from "../AllUsersTable/AllUsersTable";
import Pagination from "../Pagination/Pagination";
import { connect } from "react-redux";
import Header from "../../dashboardHeader/Header";
import Select from "react-select";

import {
  toggleCurrentDashboardUsersPage,
  changeMinPage,
  changeUsersPerPage,
} from "./actions/usersAction";

const mapStateToProps = (state) => {
  return { users: state.users };
};

const mapDispatchToProps = (dispatch) => {
  return {
    /**
     * @param {number} number page number
     * @return {void}
     * @description changeMinPage means changing the indicator number below (1-8 of 19) the number 1 is the minpage
     * it also has formula minPage+usersPerPage
     * the minPage will be incremented depending on how many users per page there is
     */
    toggleCurrentDashboardUsersPage: (number) =>
      dispatch(toggleCurrentDashboardUsersPage(number)),
    changeMinPage: (data) => dispatch(changeMinPage(data)),
    changeUsersPerPage: (data) => dispatch(changeUsersPerPage(data)),
  };
};
/**
 * @description This is the Allusers component which displays all the scripts when scripts on dashboard sidebar is clicked
 * @param {number} minPage minimum number of page to be set
 * @param {Array} usersToRender all users to be seen here on the page
 * @param {number} pageNumber current page number
 * @param {boolean} nextPageButtonState next page button state keeps track of the next button if it is available to be clicked or no
 * @param {boolean} prevPageButtonState prev page button state keeps track of the next button if it is available to be clicked or no
 * @param {number} usersPerPage number of users per page
 */

const ALLUsers = (props) => {
  const {
    minPage,
    usersToRender,
    maxUsersPerPage,
    pageNumber,
    prevPageButtonState,
    nextPageButtonState,
    usersPerPage,
  } = props;
  //initialize an empty array for us to store fetched data from the database
  const usersPerPageArr = [];

  //generates numbers for the number of pages dropdown at the bottom of the ui
  for (let i = 1; i <= maxUsersPerPage; i++) {
    usersPerPageArr.push(i);
  }

  /**
   * @description this function is responsible for reseting the page back to page 1
   * whenever a change in the scriptsPerPage was fired.
   * @param {void} props properties of main component it is in.
   * @param {event} event passed from the component that was called.
   */
  const handleUsersPerPage = (props, event) => {
    props.changeUsersPerPage(event.target.value);
    props.toggleCurrentDashboardUsersPage(1);
    props.changeMinPage(1);
  };
  /**
   *
   * @param {number} number accepts page number
   */
  const handleNextPageButton = (number) => {
    props.toggleCurrentDashboardUsersPage(number + 1);

    props.changeMinPage(Number(minPage) + Number(usersPerPage));
  };
  const handlePrevPageButton = (number) => {
    props.toggleCurrentDashboardUsersPage(number - 1);

    props.changeMinPage(Number(minPage) - Number(usersPerPage));
  };

  const UsersOptions = () => {
    let tempUsersOptions = [];
    {
      usersPerPageArr.map(function (n) {
        tempUsersOptions.push(
          <option className={styles.DropdownOptions} key={n} value={n}>
            {n}
          </option>
        );
      });
    }
    return tempUsersOptions;
  };

  return (
    <div className={styles.dashboardUsersContent}>
      <Header />
      <div className={styles.contentUsers}>
        <div className={styles.allUsersWrapper}>
          <p className={styles.allUsers}>Users</p>
          <div className={styles.inputWithSearchGroup}>
            <img
              className={styles.searchIcon}
              alt="search"
              src="/scriptsearch.svg"
            ></img>
            <input
              className={styles.usersSearchInput}
              placeholder="Search User"
            ></input>
          </div>
          <button className={styles.newUserButton}>New User</button>
        </div>
        {/* table goes here */}
        <div className={styles.usersTableContainer}>
          <div className={styles.userTable}>
            <div className={`flex-row ${styles.AllUsersTable}`}>
              <p className={styles.AllUsersTableName}>Full name</p>
              <p className={styles.AllUsersTableRole}>Job Role</p>
              <p className={styles.AllUsersTableBranding}>Branding</p>
              <p className={styles.AllUsersTableAction}></p>
            </div>
            <div className={`${styles.divider} ${styles.usersDivider}`}></div>
            <AllUsersTable usersToRender={usersToRender} />
          </div>
        </div>
        <div className={`flex-row ${styles.AllUsersPaginationContainer}`}>
          <div className={styles.rowsPerPage}>
            <p className={styles.rowsPerPageText}>Rows per page:</p>
            <select
              className={styles.DropdownWrapper}
              name="select"
              onChange={(event) => {
                handleUsersPerPage(props, event);
              }}
              defaultValue={usersPerPage}
              value={usersPerPage}
            >
              <UsersOptions />
            </select>
          </div>
          <div className={styles.paginator}>
            <Pagination />
            <button
              className={styles.prevUsersButton}
              disabled={!prevPageButtonState}
              onClick={() => handlePrevPageButton(pageNumber)}
            ></button>
            <button
              className={styles.nextUsersButton}
              disabled={!nextPageButtonState}
              onClick={() => handleNextPageButton(pageNumber)}
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(ALLUsers);
