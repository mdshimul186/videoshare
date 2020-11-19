/* eslint-disable react/prop-types */
import React from "react";
import styles from "./NewScriptBigEditor.module.css";
import { Editor } from "@tinymce/tinymce-react";

const NewScriptBigEditor = ({
	isRecording,
	transcript,
	reset,
	textFileData,
}) => {
	const handleNewScriptEditorChange = (e) => {
		console.log("Content was updated:", e.target.getContent());
		if (e.target.getContent() == "") {
			console.log("no value");
			reset();
		}
	};
	return (
		<div id="tiny" className={styles.newScriptTextEditor}>
			<Editor
				outputFormat="text"
				className={styles.newScriptTextEditorContent}
				initialValue={"<p class='newScriptTextEditorContent'>Body</p>"}
				value={transcript || textFileData}
				init={{
					formats: {
						// Changes the default format for h1 to have a class of heading
						p: { block: "p", classes: "" },
					},
					plugins: "lists, advlist, importcss",
					toolbar: "bold italic underline  |  bullist numlist  ",
					menubar: false,
					branding: false,
					min_width: 1022,
					max_width: 1022,
					min_height: 473,
					max_height: 473,
					autoresize_on_init: true,
					elementpath: false,
					content_css: "/tinymce.css",
				}}
				onChange={handleNewScriptEditorChange}
			/>
		</div>
	);
};

export default NewScriptBigEditor;
