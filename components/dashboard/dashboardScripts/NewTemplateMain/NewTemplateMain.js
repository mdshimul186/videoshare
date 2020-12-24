/* eslint-disable react/prop-types */
import React, { useState ,useEffect} from "react";
import styles from "./NewTemplateMain.module.css";
import Select from "react-select";
import { Editor } from "@tinymce/tinymce-react";
import Header from "../../dashboardHeader/Header";
import axios from 'axios'
import regeneratorRuntime from "regenerator-runtime";
import { SpinnerComponent } from "react-element-spinner";
import { useDispatch,useSelector } from 'react-redux'



const NewTemplateMain = ({
  handleSelectValue,
  DropdownIndicator,
  customStyles,
  newScriptOptions,
  selectedOption,
  setSelectedComponent,
  selectedScript
}) => {

  const [options, setOptions] = useState([])


	const { scriptData } = useSelector(state => state.scripts)


  const [title, setTitle] = useState("")
  const [opening, setOpening] = useState("")
  const [middle, setMiddle] = useState("")
  const [end, setEnd] = useState("")

  const [id, setId] = useState(null)
  const [templateId, setTemplateId] = useState(null)

  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    if(selectedScript && selectedScript.category === 'template'){
      setId(selectedScript._id)
      setTemplateId(selectedScript.template[0]._id)
      setTitle(selectedScript.title)
      setOpening(selectedScript.template[0].options[0].value)
      setMiddle(selectedScript.template[0].options[1].value)
      setEnd(selectedScript.template[0].options[2].value)
    }

  }, [selectedScript])

  const handleSave = (type) => {
    setLoading(true)
    let options = [
      {
        title: "opening",
        position: 1,
        value: opening,
        duration: 0
      },
      {
        title: "middle",
        position: 2,
        value: middle,
        duration: 0
      },
      {
        title: "end",
        position: 3,
        value: end,
        duration: 0
      }
    ]
    let data = {
      title,
      options: options,
      status: type
    }

    if(id && templateId){
      axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/script/edittemplate/${id}/${templateId}`, data)
      .then(res => {
       
        setId(null)
        setTemplateId(null)
        setTitle("")
        setMiddle("")
        setOpening("")
        setEnd("")
        setLoading(false)
        dispatch({
          type: "ADD_EDITED_SCRIPT",
          payload: res.data.script
        })
      })
      .catch(err => {
     
        setLoading(false)
      })
    }else{
      axios.post(process.env.NEXT_PUBLIC_API_URL + "/script/createtemplate", data)
      .then(res => {
      
        setId(null)
        setTemplateId(null)
        setTitle("")
        setMiddle("")
        setOpening("")
        setEnd("")
        setLoading(false)
        dispatch({
          type: "ADD_NEW_SCRIPT",
          payload: res.data.script
        })
      })
      .catch(err => {
   
        setLoading(false)
      })
    }

   
  }



  useEffect(() => {
    if(scriptData){
      let temp = [...scriptData]
      let filtered = temp.filter(data=>data.category === 'template')
      setOptions(filtered)
    }
  }, [scriptData])

  const handleSelect=(id)=>{
    if(id === 'default'){
      setId(null)
      setTemplateId(null)
      setTitle("")
      setMiddle("")
      setOpening("")
      setEnd("")
    }else{
      let temp = [...options]
      let index = temp.findIndex(data=>data._id === id)
      let selectedTemp = temp[index]
      setTitle(selectedTemp.title)
      setOpening(selectedTemp.template[0].options[0].value)
      setMiddle(selectedTemp.template[0].options[1].value)
      setEnd(selectedTemp.template[0].options[2].value)
      setId(null)
      setTemplateId(null)
    }
    
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
            <p style={{ marginBottom: "10px" }} className={styles.newTemplateText}>Template Name</p>
            <input
              className={styles.newTemplateInput}
              placeholder="Sales Meeting"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            ></input>
           
          </div>
          <div className={styles.importTemp}>
              {/* <Select placeholder="import template" options={options} /> */}
              <select className={styles.selectScript} onChange={(e) => handleSelect(e.target.value)}>
								<option value='default'>Import template</option>
									{
										options.map((op, index) => {
											return (
												<option value={op._id} key={index}>{op.title}</option>
											)
										})
									}

								</select>
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
         

          <div className={styles.summaryPointsInputGroup}>
            <p className={styles.summaryPointText}>OPENING</p>
            <textarea
              className={styles.templateInput}
              placeholder="Body"
              onChange={(e) => setOpening(e.target.value)}
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
              onChange={(e) => setMiddle(e.target.value)}
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
              onChange={(e) => setEnd(e.target.value)}
              value={end}
            ></textarea>
          </div>
        </div>
      </div>
      <div className={styles.recordAndDraftWrapper}>
        <p onClick={() => handleSave("draft")} className={styles.saveAsDraft}>Save as draft</p>
        <button onClick={() => handleSave("saved")} className={styles.newScriptSave}>Save</button>
      </div>
    </div>
  );
};
export default NewTemplateMain;
