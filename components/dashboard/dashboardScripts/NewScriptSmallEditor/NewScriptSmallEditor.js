/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import styles from "./NewScriptSmallEditor.module.css";
import { Editor } from "@tinymce/tinymce-react";

const NewScriptSmallEditor = ({
	isRecording,
	transcript,
	reset,
	textFileData,
}) => {
	const [willMoveTranscript, setMoveTranscript] = useState(false);
	const [transcriptData, setTranscriptData] = useState(null);
	const handleNewScriptEditorChange = (e) => {
		if (e.target.getContent() == "") {
			console.log("no value");
			reset();
		}
		console.log("Content was updated:", e.target.getContent());
	};
	useEffect(() => {
		if (isRecording == false) {
			console.log(transcript);
			setMoveTranscript(true);
			setTranscriptData(transcript);
			if (transcript === null || transcript === "") {
				setTranscriptData(textFileData);
			}
		}
	}, [isRecording, transcript]);
	return (
		<div id="tiny" className={styles.newScriptTextEditor}>
			<Editor
				outputFormat="text"
				className={styles.newScriptTextEditorContent}
				initialValue={
					willMoveTranscript
						? transcriptData
						: "<p class='newScriptTextEditorContent'>Body</p>"
				}
				value={transcriptData}
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
					min_height: 270,
					max_height: 270,
					autoresize_on_init: true,
					elementpath: false,
					content_css: "/tinymce.css",
				}}
				onChange={handleNewScriptEditorChange}
			/>
		</div>
	);
};

export default NewScriptSmallEditor;
