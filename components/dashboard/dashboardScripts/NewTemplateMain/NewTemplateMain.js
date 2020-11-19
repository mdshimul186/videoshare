/* eslint-disable react/prop-types */
import React from "react";
import styles from "./NewTemplateMain.module.css";
import Select from "react-select";
import { Editor } from "@tinymce/tinymce-react";
import Header from "../../dashboardHeader/Header";

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
  return (
    <div className={styles.newScript}>
      <div className={styles.newTemplateScriptMain}>
        <div className={`flex-row ${styles.newTemplateTitleGroup}`}>
          <p className={styles.newScriptTitle}>New template</p>
          <Select
            onChange={handleSelectValue}
            components={{ DropdownIndicator }}
            className="react-select-container"
            classNamePrefix="react-select"
            styles={customStyles}
            isSearchable={false}
            options={newScriptOptions}
            value={selectedOption}
            defaultValue={selectedOption}
          />
        </div>
        <div className={`flex-row ${styles.newScriptGroup}`}>
          <div className={styles.scriptTitleInputGroup}>
            <p className={styles.newTemplateText}>Template Name</p>
            <input
              className={styles.newTemplateInput}
              placeholder="Sales Meeting"
            ></input>
          </div>
          <div className={styles.recordDuration}>
            {/* set state inside here */}
            <p className={styles.scriptRecordDurationText}>00:00:00</p>
          </div>
        </div>
        <div className={`flex-row ${styles.NewTemplateOpeningSaveWrapper}`}>
          <p className={styles.newTemplateOpening}>Opening</p>
          <p className={styles.newTemplateDraft}>Save as Draft</p>
        </div>
        <div className={styles.templateEditors}>
          {/* FIRST EDITOR FOR OPENING */}
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
              onChange={handleNewTemplateOpeningChange}
            />
          </div>
          {/* SECOND EDITOR FOR MIDDLE */}
          <p className={styles.newTemplateMiddle}>Middle</p>
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
          </div>
          {/* THIRD EDITOR FOR CALL TO ACTION */}
          <p className={styles.newTemplateCallToAction}>Call to action</p>
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
          </div>
        </div>
      </div>
      <button className={styles.newTemplateRecordVideo}>Record Video</button>
    </div>
  );
};
export default NewTemplateMain;
