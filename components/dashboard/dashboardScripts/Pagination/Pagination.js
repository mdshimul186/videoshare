import React from "react";
import style from "./Pagination.module.css";
import { connect } from "react-redux";

/**
 * @description this will keep track of things such as the current pages that we are on
 */

const mapStateToProps = (state) => {
  return { scripts: state.scripts };
};

const Pagination = (props) => {
  const currentPage = Number(props.scripts.currentPage);
  const scriptsPerPage = Number(props.scripts.scriptsPerPage);
  const totalScripts = Number(props.scripts.totalScripts);
  const minPage = Number(props.scripts.minPage);
  return (
    <div className="flex-row">
      <p className={style.pagination}>
        {minPage}-
        {currentPage * scriptsPerPage < totalScripts
          ? currentPage * scriptsPerPage
          : totalScripts}{" "}
        of {totalScripts}
      </p>
    </div>
  );
};

export default connect(mapStateToProps)(Pagination);
