import React, { useState } from "react";
import TemplateList from "../TemplateList/TemplateList";
import style from "./DashboardScriptsSettings.module.css";
/**
 * @date 2020-09-09
 * @description this is the dashboard content when you click scripts on the account settings
 * this is a form where it processes a json object and then add a template based on the data
 * look at TemplateList
 * @returns {any}
 */

let	Templates = [
	{ id: 1, title: "Sales Script", date: "23/06/2020" },
	{ id: 2, title: "Welcome Video", date: "23/06/2020" },
	{ id: 3, title: "Q1 Newsletter", date: "23/06/2020" },
	{ id: 4, title: "Message To Staff", date: "23/06/2020" },
]

function DashboardScriptSettings() {

	const [NewsletterText, setNewsletterText] = useState('')
	const [introuctionText, setIntrouctionText] = useState('')
	const [MiddleText, setMiddleText] = useState('')
	const [callToActionText, setCallToActionText] = useState('')


	const [isNewsletterClicked, setisNewsletterClicked] = useState(false)
	const [isIntroductionClicked, setisIntroductionClicked] = useState(false)
	const [isMiddleClicked, setisMiddleClicked] = useState(false)
	const [isCallToActionClicked, setisCallToActionClicked] = useState(false)
	
	
	return (
		<div className={style.DashboardSettingsContainer}>
				<div className={style.dashboardScripts}>
					<div className="flex-row">
						<div className={`flex-column ${style.marginRight34}`}>
							<p className={style.DashboardScriptsText1}>Script Templates</p>
							<div className={style.ScriptInputGroup}>
								<p className={isNewsletterClicked ?style.ScriptTextLabelActive: style.ScriptTextLabel}>TEMPLATE NAME</p>
								<input
									className={isNewsletterClicked ?style.ScriptTextInputActive : style.ScriptTextInput}
									placeholder="Newsletter Report"
									onChange={(e)=>setNewsletterText(e.target.value)}
									onClick={()=>setisNewsletterClicked(true)}
									onBlur={()=>setisNewsletterClicked(false)}
								
								/>
							</div>
							<div className={`${style.ScriptInputGroup} ${style.marginTop24}`}>
								<p className={isIntroductionClicked || isMiddleClicked || isCallToActionClicked ?style.ScriptTextLabelActive: style.ScriptTextLabel}>SUBJECT TITLE</p>
								<input
									className={isIntroductionClicked ?style.ScriptTextInputActive : style.ScriptTextInput}
									placeholder="Introduction"
									onChange={(e)=>setIntrouctionText(e.target.value)}
									onClick={()=>setisIntroductionClicked(true)}
									onBlur={()=>setisIntroductionClicked(false)}
								/>
								<input
									className={`${isMiddleClicked ?style.ScriptTextInputActive : style.ScriptTextInput} ${style.marginTop5}`}
									placeholder="Middle"
									onChange={(e)=>setMiddleText(e.target.value)}
									onClick={()=>setisMiddleClicked(true)}
									onBlur={()=>setisMiddleClicked(false)}
								/>
								<input
									className={`${isCallToActionClicked ?style.ScriptTextInputActive : style.ScriptTextInput} ${style.marginTop5}`}
									placeholder="Call to action"
									onChange={(e)=>setCallToActionText(e.target.value)}
									onClick={()=>setisCallToActionClicked(true)}
									onBlur={()=>setisCallToActionClicked(false)}
								/>
							</div>
							<button className={style.ScriptButton}>+</button>
							<button className={style.ScriptSaveButton}>Save</button>
						</div>
						<div className="flex-column">
							<p className={style.DashboardScriptsText}>
								Current Script Templates
							</p>
							<TemplateList templates={Templates} />
						</div>
					</div>
				</div>
			</div>
	)
}

export default DashboardScriptSettings

