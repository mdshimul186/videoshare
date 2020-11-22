// This file processes the objects into a list

import React from "react";
import tableStyle from "./TemplatesList.module.css";

/**
 * @description this loops through templates parameter and then for every loop, the data is handled as well as designed
 * @param {templates}
 * @returns {any}
 */
const TemplateList = ({ templates }) => {
  const templateList = templates.length ? (
    templates.map((template) => {
      return (
        <React.Fragment>
          <tr key={template.id} className={tableStyle.flexRow}>
            <td className={tableStyle.RowData}>{template.title}</td>
            <td className={tableStyle.RowData}>{template.date}</td>
            <td className={tableStyle.RowTripleDot}>
              <img src="/tripledot.svg" alt="tripledot"></img>
            </td>
          </tr>
          <div className={tableStyle.divider}></div>
        </React.Fragment>
      );
    })
  ) : (
    <p>You have no templates yet</p>
  );
  return (
    <div className={tableStyle.tableContainer}>
      <div className={tableStyle.ColumnWrapper}>
        <p className={tableStyle.ColumnTitle}>Title</p>
        <p className={tableStyle.ColumnTitle}>Date</p>
        <p className=""></p>
      </div>
      <div className={tableStyle.box}>
        <table>{templateList}</table>
        <div className={tableStyle.Pagination}>
          <p className={tableStyle.PaginationText}>
            1-4 {"\u003c"} {"\u003e"}
          </p>
        </div>
      </div>
    </div>
  );
};
export default TemplateList;
