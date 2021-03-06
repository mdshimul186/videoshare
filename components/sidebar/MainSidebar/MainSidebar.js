import React, { useState } from "react";
import SideBarLink from "../SideBarLink/SideBarLink";
import style from "./MainSidebar.module.css";
import { useSelector } from "react-redux";

/**
 * @description this file is responsible for the sidebar component this can be seen on the left side part of the dashboard
 * @param {any} dashboard this keep tracks  of the states of each link
 * @param {any} activateDashboard this is an onclick handler for sidebar link
 * @param {any} activateRecord this is an onclick handler for sidebar link
 * @param {any} activateScript this is an onclick handler for sidebar link
 * @param {any} activateVideos this is an onclick handler for sidebar link
 * @param {any} activateSettings this is an onclick handler for sidebar link
 * @param {any} activateSubscriptions this is an onclick handler for sidebar link
 * @returns {any}
 */
const MainSideBar = ({
  isDashboardLinkActive,
  isRecordLinkActive,
  isScriptLinkActive,
  isSettingsLinkActive,
  isSubscriptionLinkActive,
  isVideosLinkActive,
  isUsersLinkActive,
  isBrandingLinkActive,
  activateDashboard,
  activateRecord,
  activateScript,
  activateSettings,
  activateSubscriptions,
  activateVideos,
  activateUsers,
  activateBranding,
}) => {
  const { userData } = useSelector((state) => state.auth);

  return (
    <div className={style.dashboardSidebar}>
      <div className={style.dashboardSidebarContent}>
        <img
          className={style.dashboardVideoshareLogo}
          src="logoWhite.svg"
          alt="VideoShare Logo"
        ></img>
        <div className={style.dashboardSideBarLinkWrapper}>

        {
          userData && userData.role === 'hide' &&
          (
            <div onClick={activateDashboard}>
            <SideBarLink
              class={
                isDashboardLinkActive
                  ? `${style.dashboardLinkActive}`
                  : `${style.SideBarLinkStyle1}`
              }
              icon={
                isDashboardLinkActive
                  ? "/sidebarDashboardIconActive.svg"
                  : "/sidebarDashboardIcon.svg"
              }
              label="Dashboard"
              link="#/"
            />
          </div>
          )
        }
          

          {
            userData && userData.role === 'hide' &&
            (
              <div onClick={activateRecord}>
            <SideBarLink
              class={
                isRecordLinkActive
                  ? `${style.dashboardLinkActive2}`
                  : `${style.SideBarLinkStyle2}`
              }
              icon={
                isRecordLinkActive
                  ? "/sidebarRecordIcon.svg"
                  : "/sidebarRecordIcon.svg"
              }
              label="Record"
              link="#/"
            />
          </div>
            )
          }
          

          {userData && userData.role !== 'admin' && userData.accessType && userData.accessType.script && (
            <div onClick={activateScript}>
              <SideBarLink
                class={
                  isScriptLinkActive
                    ? `${style.dashboardLinkActive}`
                    : `${style.SideBarLinkStyle1}`
                }
                icon={
                  isScriptLinkActive
                    ? "/sidebarScriptsIconActive.svg"
                    : "/sidebarScriptsIcon.svg"
                }
                label="Scripts"
                link="#/"
              />
            </div>
          )}


          {
            userData && userData.role !== 'admin' &&
            (
              <div onClick={activateVideos}>
            <SideBarLink
              class={
                isVideosLinkActive
                  ? `${style.dashboardLinkActive}`
                  : `${style.SideBarLinkStyle1}`
              }
              icon={
                isVideosLinkActive
                  ? "/sidebarVideoIconActive.svg"
                  : "/sidebarVideoIcon.svg"
              }
              label="Videos"
              link="#/"
            />
          </div>
            )
          }
          
          <div className={style.dashboardSidebarLowerLinksWrapper}>
          {
            userData && userData.role !== 'user' && 
            (
              <div onClick={activateUsers}>
              <SideBarLink
                class={
                  isUsersLinkActive
                    ? `${style.dashboardLinkActive}`
                    : `${style.SideBarLinkStyle1}`
                }
                icon={
                  isUsersLinkActive
                    ? "/sidebarUsersIconActive.svg"
                    : "/sidebarUsersIcon.svg"
                }
                label="Users"
                link="#/"
              />
            </div>
            )
          }
            {
              userData && userData.role !== 'admin' &&
              (
                <div onClick={activateBranding}>
              <SideBarLink
                class={
                  isBrandingLinkActive
                    ? `${style.dashboardLinkActive}`
                    : `${style.SideBarLinkStyle1}`
                }
                icon={isBrandingLinkActive ? "/branding.svg" : "/branding.svg"}
                label="Branding"
                link="#/"
              />
            </div>
              )
            }


            
            <div onClick={activateSettings}>
              <SideBarLink
                class={
                  isSettingsLinkActive
                    ? `${style.dashboardLinkActive}`
                    : `${style.SideBarLinkStyle1}`
                }
                icon={
                  isSettingsLinkActive
                    ? "/sidebarSettingsIconActive.svg"
                    : "/sidebarSettingsIcon.svg"
                }
                label="Settings"
                link="#/"
              />
            </div>



            {
              userData && userData.role === 'user' &&
              (
                <div onClick={activateSubscriptions}>
              <SideBarLink
                class={
                  isSubscriptionLinkActive
                    ? `${style.dashboardLinkActive}`
                    : `${style.SideBarLinkStyle1}`
                }
                icon={
                  isSubscriptionLinkActive
                    ? "/sidebarSubscriptionIconActive.svg"
                    : "/sidebarSubscriptionIcon.svg"
                }
                label="Subscription"
                link="#/"
              />
            </div>
              )
            }
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSideBar;
