import React from "react";
import { connect } from "react-redux";
import style from "./AllScriptsTable.module.css";

const mapStateToProps = (state) => {
  return { scripts: state.scripts };
};

const AllScriptsTable = ({ scriptToRender }) => {
  const scripts = scriptToRender;

  const AllScriptsList = scripts.map((script) => {
    const date = new Date(script.date);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const hh = date.getHours();
    const mm = date.getMinutes();
    // const ss = date.getSeconds();
    const amorpm = hh >= 12 ? "PM" : "AM";
    const time = `${hh}:${mm} ${amorpm}`;
    const finaldate = `${time}, ${month} ${day}, ${year}`;
    return (
      <React.Fragment key={script.SCRIPTID}>
        <div className={`flex-row ${style.AllScriptTable}`}>
          <p className={style.title}>{script.TITLE}</p>
          <p
            className={`${style.status} ${
              script.STATUS === "RECORDED" ? style.statusRecorded : ""
            } ${script.STATUS === "DRAFT" ? style.statusDraft : ""}
			${script.STATUS === "SAVED" ? style.statusSaved : ""}
			`}
          >
            {script.STATUS}
          </p>
          <p
            className={`${style.scriptType} ${
              script.SCRIPTTYPE === "SUMMARY" ? style.scriptTypeSummary : ""
            } ${
              script.SCRIPTTYPE === "TEMPLATE" ? style.scriptTypeTemplate : ""
            } ${script.SCRIPTTYPE === "SCRIPT" ? style.scriptTypeScript : ""}`}
          >
            {script.SCRIPTTYPE}
          </p>
          <p className={style.date}>{finaldate}</p>
        </div>
        <div className="divider script-divider"></div>
      </React.Fragment>
    );
  });
  if (scripts.loading) {
    return <p className={style.LoadingText}>Scripts are loading</p>;
  } else if (scripts.length === 0) {
    return <p className={style.NoScriptText}>You have no scripts yet!.</p>;
  } else {
    return <div>{AllScriptsList}</div>;
  }
};

export default connect(mapStateToProps)(AllScriptsTable);
