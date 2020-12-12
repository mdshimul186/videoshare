// This file processes the objects into a list

import React,{useState,useEffect} from "react";
import tableStyle from "./TemplatesList.module.css";
import Select from "react-select";

/**
 * @description this loops through templates parameter and then for every loop, the data is handled as well as designed
 * @param {templates}
 * @returns {any}
 * 
 * 
 */


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


const TemplateList = ({ templates,sendValue,deletefunc }) => {

  


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




  let handleOption = (e, template) => {

    //console.log(userid);
    //alert(e.value,userid);
    if (e.value === 'delete') {
      
      deletefunc(template)
      

    }else if(e.value === 'edit'){
      sendValue(template)
    }}
 
  const templateList = render.length ? (
    render.map((template) => {
      const date = new Date(template.createdAt);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const hh = date.getHours();
    const mm = date.getMinutes();
    // const ss = date.getSeconds();
    const amorpm = hh >= 12 ? "PM" : "AM";
    const time = `${hh}:${mm} ${amorpm}`;
    const finaldate = `${month} ${day}, ${year}`;
      return (
        <React.Fragment>
          <tr key={template._id} className={tableStyle.flexRow}>
            <td className={tableStyle.RowData}>{template.title}</td>
            <td className={tableStyle.RowData}>{finaldate}</td>
            <td className={tableStyle.RowTripleDot}>
            <Select
                components={{
                  IndicatorSeparator: () => null,
                  DropdownIndicator: () => true,
                }}
                onChange={(e) => handleOption(e, template)}
                className="react-select-container"
                classNamePrefix="react-select"
                styles={customStyles}
                isSearchable={false}
                options={usersOption}
                value={null}
                placeholder={<img src="/tripledot.svg" alt="tripledot"></img>}
              />
              
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
