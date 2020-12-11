/* eslint-disable react/prop-types */
import React,{useState} from "react";
import styles from "./NewTemplateMain.module.css";
import Select from "react-select";
import { Editor } from "@tinymce/tinymce-react";
import Header from "../../dashboardHeader/Header";
import axios from 'axios'
import regeneratorRuntime from "regenerator-runtime";
import { SpinnerComponent } from "react-element-spinner";
import {useDispatch} from 'react-redux'

const handleNewTemplateOpeningChange = (e) => {
  console.log("Content was updated:", e.target.getContent());
};
const handleNewTemplateMiddleChange = (e) => {
  console.log("Content was updated:", e.target.getContent());
};
const handleNewTemplateCallToActionChange = (e) => {
  console.log("Content was updated:", e.target.getContent());
};

const NewTemplateMain = ({
  handleSelectValue,
  DropdownIndicator,
  customStyles,
  newScriptOptions,
  selectedOption,
  setSelectedComponent,
}) => {


  const [title,setTitle]= useState("")
  const [opening,setOpening] = useState("")
  const [middle,setMiddle] = useState("")
  const [end,setEnd]= useState("")

  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch()



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
    })
    .catch(err=>{
      console.log(err)
      setLoading(false)
    })
  }





  return (
    <div >
    <SpinnerComponent loading={isLoading} position="global" />
      <div>
        <div className={`flex-row ${styles.newTemplateTitleGroup}`}>
          <p className={styles.newScriptTitle}>New template</p>
          {/* <Select
            onChange={handleSelectValue}
            components={{ DropdownIndicator }}
            className="react-select-container"
            classNamePrefix="react-select"
            styles={customStyles}
            isSearchable={false}
            options={newScriptOptions}
            value={selectedOption}
            defaultValue={selectedOption}
          /> */}
        </div>
        <div className={`flex-row ${styles.newScriptGroup}`}>
          <div className={styles.scriptTitleInputGroup}>
            <p style={{marginBottom:"10px"}} className={styles.newTemplateText}>Template Name</p>
            <input
              className={styles.newTemplateInput}
              placeholder="Sales Meeting"
              onChange={(e)=>setTitle(e.target.value)}
              value={title}
            ></input>
          </div>
          {/* <div className={styles.recordDuration}>
             set state inside here 
            <p className={styles.scriptRecordDurationText}>00:00:00</p> 
          </div> */}
        </div>
        <div className={`flex-row ${styles.NewTemplateOpeningSaveWrapper}`}>
          {/* <p className={styles.newTemplateOpening}>opening</p>
          <p className={styles.newTemplateDraft}>Save as Draft</p> */}
        </div>
        <div className={styles.templateEditors}>
          {/* FIRST EDITOR FOR OPENING */}
          {/* <div id="tiny" className={styles.newTemplateTextEditor}>
            <Editor
              className={styles.newScriptTextEditorContent}
              initialValue="<p class='newScriptTextEditorContent'>Body</p>"
              init={{
                formats: {
                  // Changes the default format for h1 to have a class of heading
                  p: { block: "p", classes: "" },
                },
                plugins: "lists, advlist, importcss",
                toolbar: "bold italic underline  |  bullist numlist  ",
                menubar: false,
                branding: false,
                min_width: 769,
                max_width: 769,
                min_height: 149,
                max_height: 149,
                autoresize_on_init: false,
                elementpath: false,
                content_css: "/tinymce.css",
              }}
              onChange={handleNewTemplateOpeningChange}
            />
          </div> */}
          {/* SECOND EDITOR FOR MIDDLE */}
          {/* <p className={styles.newTemplateMiddle}>Middle</p>
          <div id="tiny" className={styles.newTemplateTextEditor}>
            <Editor
              className={styles.newScriptTextEditorContent}
              initialValue="<p class='newScriptTextEditorContent'>Body</p>"
              init={{
                formats: {
                  // Changes the default format for h1 to have a class of heading
                  p: { block: "p", classes: "" },
                },
                plugins: "lists, advlist, importcss",
                toolbar: "bold italic underline  |  bullist numlist  ",
                menubar: false,
                branding: false,
                min_width: 769,
                max_width: 769,
                min_height: 149,
                max_height: 149,
                autoresize_on_init: false,
                elementpath: false,
                content_css: "/tinymce.css",
              }}
              onChange={handleNewTemplateMiddleChange}
            />
          </div> */}
          {/* THIRD EDITOR FOR CALL TO ACTION */}
          {/* <p className={styles.newTemplateCallToAction}>Call to action</p>
          <div id="tiny" className={styles.newTemplateTextEditor}>
            <Editor
              className="newScriptTextEditorContent"
              initialValue="<p class='newScriptTextEditorContent'>Body</p>"
              init={{
                formats: {
                  // Changes the default format for h1 to have a class of heading
                  p: { block: "p", classes: "" },
                },
                plugins: "lists, advlist, importcss",
                toolbar: "bold italic underline  |  bullist numlist  ",
                menubar: false,
                branding: false,
                min_width: 769,
                max_width: 769,
                min_height: 149,
                max_height: 149,
                autoresize_on_init: false,
                elementpath: false,
                content_css: "/tinymce.css",
              }}
              onChange={handleNewTemplateCallToActionChange}
            />
          </div> */}











          <div className={styles.summaryPointsInputGroup}>
								<p className={styles.summaryPointText}>OPENING</p>
								<textarea
									className={styles.templateInput}
									placeholder="Body"
                  onChange={(e)=>setOpening(e.target.value)}
                  value={opening}
								></textarea>
							</div>
							<div
								className={`${styles.summaryPointsInputGroup} ${styles.summaryInputMargin}`}
							>
								<p className={styles.summaryPointText}>MIDDLE</p>
								<textarea
									className={styles.templateInput}
									placeholder="Body"
                  onChange={(e)=>setMiddle(e.target.value)}
                  value={middle}
								></textarea>
						</div>
							<div
								className={`${styles.summaryPointsInputGroup} ${styles.summaryInputMargin}`}
							>
								<p className={styles.summaryPointText}>END</p>
								<textarea
									className={styles.templateInput}
									placeholder="Body"
                  onChange={(e)=>setEnd(e.target.value)}
                  value={end}
								></textarea>
						</div>
        </div>
      </div>
      <div className={styles.recordAndDraftWrapper}>
        <p onClick={()=>handleSave("draft")} className={styles.saveAsDraft}>Save as draft</p>
        <button onClick={()=>handleSave("saved")} className={styles.newScriptSave}>Save</button>
      </div>
    </div>
  );
};
export default NewTemplateMain;
