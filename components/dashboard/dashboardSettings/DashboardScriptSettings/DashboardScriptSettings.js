import React, { useState,useEffect } from "react";
import TemplateList from "../TemplateList/TemplateList";
import style from "./DashboardScriptsSettings.module.css";
import {useDispatch,useSelector} from 'react-redux'
import axios from 'axios'
import { SpinnerComponent } from "react-element-spinner";
/**
 * @date 2020-09-09
 * @description this is the dashboard content when you click scripts on the account settings
 * this is a form where it processes a json object and then add a template based on the data
 * look at TemplateList
 * @returns {any}
 */

// let	Templates = [
// 	{ id: 1, title: "Sales Script", date: "23/06/2020" },
// 	{ id: 2, title: "Welcome Video", date: "23/06/2020" },
// 	{ id: 3, title: "Q1 Newsletter", date: "23/06/2020" },
// 	{ id: 4, title: "Message To Staff", date: "23/06/2020" },
// ]

function DashboardScriptSettings() {

	const [templates, setTemplates] = useState([])
	

	const [title,setTitle]= useState("")
	const [opening,setOpening] = useState("")
	const [middle,setMiddle] = useState("")
	const [end,setEnd]= useState("")
  
	const [isLoading, setLoading] = useState(false);
	const dispatch = useDispatch()
	const {scriptData} = useSelector(state=>state.scripts)


	const [isTitleClickd, setIsTitleClickd] = useState(false)
	const [isOpeningClicked, setisOpeningClicked] = useState(false)
	const [isMiddleClicked, setisMiddleClicked] = useState(false)
	const [isCallToActionClicked, setisCallToActionClicked] = useState(false)

	useEffect(()=>{
		let newtemplate = []
		axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/script/getmyscript")
      .then((response) => {
        const { data } = response;
		console.log(data.script);
		if(data.script.length > 0){
			data.script.map(s=>{
				if(s.category === 'template'){
					newtemplate.push(s)
				}
			})
		}
		setTemplates(newtemplate)
        // props.dashboardFetchScript(data.script);
        // props.changeTotalScripts(data.script.length);
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setLoading(false)
        return 400;
      });
	},[])
	
	const handleSave=(type)=>{
		setLoading(true)
		let options = [
		  {
			title:"opening",
			position:1,
			value:opening,
			duration:0
		  },
		  {
			title:"middle",
			position:2,
			value:middle,
			duration:0
		  },
		  {
			title:"end",
			position:3,
			value:end,
			duration:0
		  }
		]
		let data ={
		  title,
		  options:options,
		  status:type
		}
	
		axios.post(process.env.NEXT_PUBLIC_API_URL+"/script/createtemplate",data)
		.then(res=>{
		  console.log(res.data.script)
		  setTitle("")
		  setMiddle("")
		  setOpening("")
		  setEnd("")
		  setLoading(false)
		  dispatch({
			type:"ADD_NEW_SCRIPT",
			payload:res.data.script
		  })
		  setTemplates([res.data.script,...templates])
		})
		.catch(err=>{
		  console.log(err)
		  setLoading(false)
		})
	  }
	
	
	return (
		<div className={style.DashboardSettingsContainer}>
		<SpinnerComponent loading={isLoading} position="global" />
				<div className={style.dashboardScripts}>
					<div className="flex-row">
						<div className={`flex-column ${style.marginRight34}`}>
							<p className={style.DashboardScriptsText1}>Script Templates</p>
							<div className={style.ScriptInputGroup}>
								<p className={isTitleClickd ?style.ScriptTextLabelActive: style.ScriptTextLabel}>TEMPLATE NAME</p>
								<input
									className={isTitleClickd ?style.ScriptTextInputActive : style.ScriptTextInput}
									placeholder="Newsletter Report"
									onChange={(e)=>setTitle(e.target.value)}
									onClick={()=>setIsTitleClickd(true)}
									onBlur={()=>setIsTitleClickd(false)}
									value={title}
								
								/>
							</div>
							<div className={`${style.ScriptInputGroup} ${style.marginTop24}`}>
								<p className={isOpeningClicked || isMiddleClicked || isCallToActionClicked ?style.ScriptTextLabelActive: style.ScriptTextLabel}>SUBJECT TITLE</p>
								<input
									className={isOpeningClicked ?style.ScriptTextInputActive : style.ScriptTextInput}
									placeholder="Introduction"
									onChange={(e)=>setOpening(e.target.value)}
									onClick={()=>setisOpeningClicked(true)}
									onBlur={()=>setisOpeningClicked(false)}
									value={opening}
								/>
								<input
									className={`${isMiddleClicked ?style.ScriptTextInputActive : style.ScriptTextInput} ${style.marginTop5}`}
									placeholder="Middle"
									onChange={(e)=>setMiddle(e.target.value)}
									onClick={()=>setisMiddleClicked(true)}
									onBlur={()=>setisMiddleClicked(false)}
									value={middle}
								/>
								<input
									className={`${isCallToActionClicked ?style.ScriptTextInputActive : style.ScriptTextInput} ${style.marginTop5}`}
									placeholder="Call to action"
									onChange={(e)=>setEnd(e.target.value)}
									onClick={()=>setisCallToActionClicked(true)}
									onBlur={()=>setisCallToActionClicked(false)}
									value={end}
								/>
							</div>
							{/* <button className={style.ScriptButton}>+</button> */}
							<button onClick={()=>handleSave("saved")} className={style.ScriptSaveButton}>Save</button>
						</div>
						<div className="flex-column">
							<p className={style.DashboardScriptsText}>
								Current Script Templates
							</p>
							<TemplateList templates={templates} />
						</div>
					</div>
				</div>
			</div>
	)
}

export default DashboardScriptSettings

