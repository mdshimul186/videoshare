import React from "react";
import style from "./Pagination.module.css";
import { connect } from "react-redux";

/**
 * @description this will keep track of things such as the current pages that we are on
 */

const mapStateToProps = (state) => {
  return { users: state.users };
};

const Pagination = (props) => {
  const currentPage = Number(props.users.currentPage);
  const usersPerPage = Number(props.users.usersPerPage);
  const totalUsers = Number(props.users.totalUsers);
  const minPage = Number(props.users.minPage);
  return (
    <div className="flex-row">
      <p className={style.pagination}>
        {minPage}-
        {currentPage * usersPerPage < totalUsers
          ? currentPage * usersPerPage
          : totalUsers}{" "}
        of {totalUsers}
      </p>
    </div>
  );
};

export default connect(mapStateToProps)(Pagination);
