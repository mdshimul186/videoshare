import React from "react";
import styles from "./DashboardSettings.module.css";
import DashboardAccountSettings from "../DashboardAccountSettings/DashboardAccountSettings";
import DashboardBrandingSettings from "../DashboardBrandingSettings/DashboardBrandingSettings";
import DashboardScriptSettings from "../DashboardScriptSettings/DashboardScriptSettings";
import DashboardLandingSettings from "../DashboardLandingSettings/DashboardLandingSettings";
import Header from "../../dashboardHeader/Header";
/**
 * @description this is the settings content button
 * @date 2020-09-09
 * @param {any} settingsButtons contains state of every button
 * @param {any} settingsActivateAccount a tab of settings that will show when clicked
 * @param {any} settingsBrandingAccount a tab of settings that will show when clicked
 * @param {any} settingsScriptAccount a tab of settings that will show when clicked
 * @param {any} settingsLandingAccount a tab of settings that will show when clicked
 * @returns {any}
 */
const SettingsContentButton = ({
	settingsActivateAccount,
	settingsBrandingAccount,
	settingsScriptAccount,
	settingsLandingAccount,
	isAccount,
	isBranding,
	isScript,
	isLandingPage,
}) => {
	return (
		<div className={styles.dashboardButtonsWrapper}>
			<div
				onClick={() => {
					settingsActivateAccount();
				}}
				className={
					isAccount
						? `${styles.DashboardContentButtonActive}`
						: `${styles.DashboardContentButton}`
				}
			>
				<a href="#/">ACCOUNT</a>
			</div>

			<div
				onClick={() => {
					settingsBrandingAccount();
				}}
				className={
					isBranding
						? `${styles.DashboardContentButtonActive}`
						: `${styles.DashboardContentButton}`
				}
			>
				<a href="#/">BRANDING</a>
			</div>

			<div
				onClick={() => {
					settingsScriptAccount();
				}}
				className={
					isScript
						? `${styles.DashboardContentButtonActive}`
						: `${styles.DashboardContentButton}`
				}
			>
				<a href="#/">SCRIPT TEMPLATES</a>
			</div>

			<div
				onClick={() => {
					settingsLandingAccount();
				}}
				className={
					isLandingPage
						? `${styles.DashboardContentButtonActive}`
						: `${styles.DashboardContentButton}`
				}
			>
				<a href="#/">LANDING PAGES</a>
			</div>
		</div>
	);
};

/**
 * @description this is the main settings content that adjust accordingly depending on what state the settingsButtons are
 * @param {any} {settingsButtons
 * @param {any} settingsActivateAccount
 * @param {any} settingsBrandingAccount
 * @param {any} settingsScriptAccount
 * @param {any} settingsLandingAccount
 * @param {any} }
 * @returns {any}
 */
const DashboardSettings = ({
	settingsButtons,
	settingsActivateAccount,
	settingsBrandingAccount,
	settingsScriptAccount,
	settingsLandingAccount,
	isAccount,
	isBranding,
	isScript,
	isLandingPage,
}) => {
	return (
		<div>
			{isAccount ? (
				<div className={styles.dashboardContent} id="dashboardSettings">
					<Header />
					<SettingsContentButton
						settingsButtons={settingsButtons}
						settingsActivateAccount={settingsActivateAccount}
						settingsBrandingAccount={settingsBrandingAccount}
						settingsScriptAccount={settingsScriptAccount}
						settingsLandingAccount={settingsLandingAccount}
						isAccount={isAccount}
						isBranding={isBranding}
						isScript={isScript}
						isLandingPage={isLandingPage}
					/>
					<DashboardAccountSettings />
				</div>
			) : (
				""
			)}
			{isBranding ? (
				<div className={styles.dashboardBrandingContent} id="dashboardSettings">
					<Header />
					<SettingsContentButton
						settingsButtons={settingsButtons}
						settingsActivateAccount={settingsActivateAccount}
						settingsBrandingAccount={settingsBrandingAccount}
						settingsScriptAccount={settingsScriptAccount}
						settingsLandingAccount={settingsLandingAccount}
						isAccount={isAccount}
						isBranding={isBranding}
						isScript={isScript}
						isLandingPage={isLandingPage}
					/>
					<DashboardBrandingSettings />
				</div>
			) : (
				""
			)}
			{isScript ? (
				<div className={styles.dashboardScriptContent} id="dashboardSettings">
					<Header />
					<SettingsContentButton
						settingsButtons={settingsButtons}
						settingsActivateAccount={settingsActivateAccount}
						settingsBrandingAccount={settingsBrandingAccount}
						settingsScriptAccount={settingsScriptAccount}
						settingsLandingAccount={settingsLandingAccount}
						isAccount={isAccount}
						isBranding={isBranding}
						isScript={isScript}
						isLandingPage={isLandingPage}
					/>
					<DashboardScriptSettings />
				</div>
			) : (
				""
			)}
			{isLandingPage ? (
				<div className={styles.dashboardLandingContent} id="dashboardSettings">
					<Header />
					<SettingsContentButton
						settingsButtons={settingsButtons}
						settingsActivateAccount={settingsActivateAccount}
						settingsBrandingAccount={settingsBrandingAccount}
						settingsScriptAccount={settingsScriptAccount}
						settingsLandingAccount={settingsLandingAccount}
						isAccount={isAccount}
						isBranding={isBranding}
						isScript={isScript}
						isLandingPage={isLandingPage}
					/>
					<DashboardLandingSettings />
				</div>
			) : (
				""
			)}
		</div>
	);
};

export default DashboardSettings;
