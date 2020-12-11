// This file processes the objects into a list

import React,{useState,useEffect} from "react";
import tableStyle from "./TemplatesList.module.css";

/**
 * @description this loops through templates parameter and then for every loop, the data is handled as well as designed
 * @param {templates}
 * @returns {any}
 */
const TemplateList = ({ templates }) => {
  const [total ,setTotal] = useState([])
  const [render ,setRender] = useState([])
  const [totalItems, setTotalItems] = useState(0)
  const [current, setCurrent] = useState(0)

  useEffect(()=>{
      setTotal(templates)
      setTotalItems(templates.length)
      setRender(templates.slice(0,4))
  },[templates])

  const templateToRender=()=>{

  }
 
  const templateList = render.length ? (
    render.map((template) => {
      return (
        <React.Fragment>
          <tr key={template._id} className={tableStyle.flexRow}>
            <td className={tableStyle.RowData}>{template.title}</td>
            <td className={tableStyle.RowData}>date</td>
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
