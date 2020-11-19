import React from "react";
import style from "./SideBarLink.module.css";

/**
 * @description a reusable component that handles sidebar link (call this if you want to add more links in the sidebar)
 * @param {any} props
 * @param {any} props.class responsible for css classes
 * @param {any} props.icon responsible for icon (must provide a name from a public folder)
 * @param {any} props.link this is a link to point to whenever the sidebarlink is clicked default is # which means none because I am hiding and displaying components only
 * @returns {any}
 */
const SideBarLink = (props) => {
  return (
    <div className={props.class}>
      <img className={style.dashboardIcon1} src={props.icon} alt={props.icon} />
      <a href={props.link}>{props.label}</a>
    </div>
  );
};

export default SideBarLink;
