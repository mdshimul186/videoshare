import React, { useState, useEffect } from "react";
import MainSideBar from "../components/sidebar/MainSidebar/MainSidebar";
import DashboardSettings from "../components/dashboard/dashboardSettings/DashboardSettings/DashboardSettings";
import DashboardMain from "../components/dashboard/main/DashboardMain";
import DashboardRecord from "../components/dashboard/record/DashboardRecord";
import DashboardScripts from "../components/dashboard/dashboardScripts/DashboardScripts";
import Users from "../components/dashboard/users/Users";
import Branding from "../components/dashboard/branding/brandingHome/Branding";
import DashboardVideos from "../components/dashboard/videos/DashboardVideos";
import DashboardSubscription from "../components/dashboard/dashboardSubscription/DashboardSubscription/DashboardSubscription";
import style from "../styleModules/dashboard.module.css";
import Head from "next/head";
import withAuth from "../components/auth/withAuth";
import { useSelector, useDispatch } from "react-redux";
import { SpinnerComponent } from "react-element-spinner";

const Dashboard = (props) => {
  const [isLoading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const handleAuthChange = (data) => {
    dispatch({ type: "INSERT_USER_DATA", payload: data });
    dispatch({ type: "TOGGLE_LOGIN_STATE" });
  };

  useEffect(() => {
    setLoading(true);
    handleAuthChange(props.userData);
    return setLoading(false);
  }, [props.userData]);

  const [isDashboardLinkActive, setDashboardLinkActive] = useState(true);
  const [isRecordLinkActive, setRecordLinkActive] = useState(false);
  const [isScriptLinkActive, setScriptLinkActive] = useState(false);
  const [isVideosLinkActive, setVideosLinkActive] = useState(false);
  const [isUsersLinkActive, setUsersLinkActive] = useState(false);
  const [isBrandingLinkActive, setBrandingLinkActive] = useState(false);
  const [isSettingsLinkActive, setSettingsLinkActive] = useState(false);
  const [isSubscriptionLinkActive, setSubscriptionLinkActive] = useState(false);
  const [isAccount, setAccount] = useState(true);
  const [isBranding, setBranding] = useState(false);
  const [isScript, setScript] = useState(false);
  const [isLandingPage, setLandingPage] = useState(false);

  const activateDashboard = () => {
    setDashboardLinkActive(true);
    setRecordLinkActive(false);
    setScriptLinkActive(false);
    setVideosLinkActive(false);
    setSettingsLinkActive(false);
    setSubscriptionLinkActive(false);
    setUsersLinkActive(false);
    setBrandingLinkActive(false);
  };
  const activateRecord = () => {
    setDashboardLinkActive(false);
    setRecordLinkActive(true);
    setScriptLinkActive(false);
    setVideosLinkActive(false);
    setSettingsLinkActive(false);
    setSubscriptionLinkActive(false);
    setUsersLinkActive(false);
    setBrandingLinkActive(false);
  };
  const activateScript = () => {
    setDashboardLinkActive(false);
    setRecordLinkActive(false);
    setScriptLinkActive(true);
    setVideosLinkActive(false);
    setSettingsLinkActive(false);
    setSubscriptionLinkActive(false);
    setUsersLinkActive(false);
    setBrandingLinkActive(false);
  };
  const activateVideos = () => {
    setDashboardLinkActive(false);
    setRecordLinkActive(false);
    setScriptLinkActive(false);
    setVideosLinkActive(true);
    setSettingsLinkActive(false);
    setSubscriptionLinkActive(false);
    setUsersLinkActive(false);
    setBrandingLinkActive(false);
  };
  const activateUsers = () => {
    setDashboardLinkActive(false);
    setRecordLinkActive(false);
    setScriptLinkActive(false);
    setVideosLinkActive(false);
    setUsersLinkActive(true);
    setSettingsLinkActive(false);
    setSubscriptionLinkActive(false);
    setBrandingLinkActive(false);
  };
  const activateBranding = () => {
    setDashboardLinkActive(false);
    setRecordLinkActive(false);
    setScriptLinkActive(false);
    setVideosLinkActive(false);
    setUsersLinkActive(false);
    setSettingsLinkActive(false);
    setSubscriptionLinkActive(false);
    setBrandingLinkActive(true);
  };

  const activateSettings = () => {
    setDashboardLinkActive(false);
    setRecordLinkActive(false);
    setScriptLinkActive(false);
    setVideosLinkActive(false);
    setSettingsLinkActive(true);
    setSubscriptionLinkActive(false);
    setUsersLinkActive(false);
    setBrandingLinkActive(false);
  };
  const activateSubscriptions = () => {
    setDashboardLinkActive(false);
    setRecordLinkActive(false);
    setScriptLinkActive(false);
    setVideosLinkActive(false);
    setSettingsLinkActive(false);
    setSubscriptionLinkActive(true);
    setUsersLinkActive(false);
    setBrandingLinkActive(false);
  };
  const settingsActivateAccount = () => {
    setAccount(true);
    setBranding(false);
    setScript(false);
    setLandingPage(false);
  };
  const settingsBrandingAccount = () => {
    setAccount(false);
    setBranding(true);
    setScript(false);
    setLandingPage(false);
  };
  const settingsScriptAccount = () => {
    setAccount(false);
    setBranding(false);
    setScript(true);
    setLandingPage(false);
  };
  const settingsLandingAccount = () => {
    setAccount(false);
    setBranding(false);
    setScript(false);
    setLandingPage(true);
  };
  return (
    <div className={style.dashboardContainer}>
      <Head>
        <script src="./tinymce.min.js"></script>
        <title>Dashboard</title>
      </Head>
      <SpinnerComponent loading={isLoading} position="global" />

      <MainSideBar
        isDashboardLinkActive={isDashboardLinkActive}
        isRecordLinkActive={isRecordLinkActive}
        isScriptLinkActive={isScriptLinkActive}
        isSettingsLinkActive={isSettingsLinkActive}
        isSubscriptionLinkActive={isSubscriptionLinkActive}
        isVideosLinkActive={isVideosLinkActive}
        isUsersLinkActive={isUsersLinkActive}
        isBrandingLinkActive={isBrandingLinkActive}
        activateDashboard={activateDashboard}
        activateRecord={activateRecord}
        activateScript={activateScript}
        activateVideos={activateVideos}
        activateUsers={activateUsers}
        activateBranding={activateBranding}
        activateSettings={activateSettings}
        activateSubscriptions={activateSubscriptions}
      />
      {/* SETTINGS COMPONENT GOES HERE */}
      {isSettingsLinkActive ? (
        <DashboardSettings
          isAccount={isAccount}
          isBranding={isBranding}
          isLandingPage={isLandingPage}
          isScript={isScript}
          settingsActivateAccount={settingsActivateAccount}
          settingsBrandingAccount={settingsBrandingAccount}
          settingsScriptAccount={settingsScriptAccount}
          settingsLandingAccount={settingsLandingAccount}
        />
      ) : (
        ""
      )}
      {/* DASHBOARD COMPONENT GOES HERE */}
      {isDashboardLinkActive ? <DashboardMain /> : ""}
      {/* RECORD COMPONENT GOES HERE */}
      {isRecordLinkActive ? <DashboardRecord /> : ""}
      {/* SCRIPT COMPONENT GOES HERE */}
      {isScriptLinkActive ? <DashboardScripts /> : ""}
      {/* VIDEOS COMPONENT GOES HERE */}
      {isVideosLinkActive ? <DashboardVideos /> : ""}
      {/* Users COMPONENT GOES HERE */}
      {isBrandingLinkActive ? <Branding /> : ""}
      {isUsersLinkActive ? <Users /> : ""}
      {/* SUBSCRIPTION COMPONENT GOES HERE */}
      {isSubscriptionLinkActive ? <DashboardSubscription /> : ""}
    </div>
  );
};
export default withAuth(Dashboard);
