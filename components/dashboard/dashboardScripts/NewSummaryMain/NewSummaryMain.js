/* eslint-disable react/prop-types */
import React, { useState } from "react";
import styles from "./NewSummaryMain.module.css";
import Select from "react-select";
import VideoPreviewModal from "../../../modals/VideoPreviewModal/VideoPreviewModal";
import ThemesModal from "../../../modals/ThemesModal/ThemesModal";
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { SpinnerComponent } from "react-element-spinner";


const NewSummaryMain = ({
	handleSelectValue,
	DropdownIndicator,
	customStyles,
	newScriptOptions,
	selectedOption,
}) => {
	const [vpmModalIsOpen, setVpmModalIsOpen] = React.useState(false);
	function vpmOpenModal() {
		setVpmModalIsOpen(true);
	}

	function vpmCloseModal() {
		setVpmModalIsOpen(false);
	}
	const [themeModalIsOpen, setThemeModalIsOpen] = useState(false);
	const themeOpenModal = () => {
		setThemeModalIsOpen(true);
	};

	const themeCloseModal = () => {
		setThemeModalIsOpen(false);
	};


	const [title, setTitle] = useState("")
	const [summary1, setSummary1] = useState("")
	const [summary2, setSummary2] = useState("")

	const [isLoading, setLoading] = useState(false);
	const dispatch = useDispatch()





	const handleSave = (type) => {
		setLoading(true)
		let options = [
			{
				title: "summary1",
				position: 1,
				value: summary1,
				duration: 0
			},
			{
				title: "summary2",
				position: 2,
				value: summary2,
				duration: 0
			}
		]


		let data = {
			title,
			options: options,
			status: type
		}

		axios.post(process.env.NEXT_PUBLIC_API_URL + "/script/createsummary", data)
			.then(res => {
				console.log(res.data.script)
				setTitle("")
				setSummary1("")
				setSummary2("")
				setLoading(false)
				dispatch({
					type: "ADD_NEW_SCRIPT",
					payload: res.data.script
				})
			})
			.catch(err => {
				console.log(err)
				setLoading(false)
			})
	}

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				width: "100%",
			}}
		>
			<SpinnerComponent loading={isLoading} position="global" />
			<div >
				<div>
					<div className={`flex-row ${styles.newSummaryTitleGroup}`}>
						<p className={styles.newScriptTitle}>New summary</p>
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
					<div className={styles.newSummaryContent}>
						<div className="flex-row">
							<div style={{ marginBottom: "20px" }} className={styles.newSummaryInputGroup}>
								<p style={{ marginBottom: "10px" }} className={styles.newSummaryName}>Summary Name</p>
								<input
									className={styles.newSummaryInput}
									placeholder="Sales Meeting"
									onChange={(e) => setTitle(e.target.value)}
									value={title}
								></input>
							</div>
							{/* <div className={styles.newSummaryDuration}>
								
								<p className={styles.scriptRecordDurationText}>00:00:00</p>
							</div> */}
							{/* <p className={styles.newSummaryDraft}>Save as Draft</p> */}
						</div>
						<div className={styles.summaryPoints}>
							<div className={styles.summaryPointsInputGroup}>
								<p className={styles.summaryPointText}>Summary 1</p>
								<textarea
									className={styles.summaryPointInput}
									placeholder="Body"
									onChange={(e) => setSummary1(e.target.value)}
									value={summary1}
								></textarea>
							</div>
							<div
								className={`${styles.summaryPointsInputGroup} ${styles.summaryInputMargin}`}
							>
								<p className={styles.summaryPointText}>Summary 2</p>
								<textarea
									className={styles.summaryPointInput}
									placeholder="Body"
									onChange={(e) => setSummary2(e.target.value)}
									value={summary2}
								></textarea>
							</div>
							{/* <div
								className={`${styles.summaryPointsInputGroup} ${styles.summaryInputMargin}`}
							>
								<p className={styles.summaryPointText}>Point 3</p>
								<input
									className={styles.summaryPointInput}
									placeholder="Body"
								></input>
							</div> */}
							<div className={styles.recordAndDraftWrapper}>
							<p onClick={() => handleSave("draft")} className={styles.saveAsDraft}>Save as draft</p>
							<button onClick={() => handleSave("saved")} className={styles.newScriptSave}>Save</button>
						</div>
						</div>
						
					</div>
				</div>

			</div>
			{/* <div className={styles.newScriptRight}>
				<VideoPreviewModal
					vpmModalIsOpen={vpmModalIsOpen}
					vpmCloseModal={vpmCloseModal}
					vpmParentElement={"Scripts"}
				/>
				<ThemesModal
					themeModalIsOpen={themeModalIsOpen}
					themeCloseModal={themeCloseModal}
					themeParentElement={"Scripts"}
				/>
				<div className={styles.newScriptDivider1} />
				<div className={styles.newScriptDivider2} />
				<button className={styles.newScriptImportBTN}>Import</button>
				<div className={styles.newScriptBrandings}>
					<p className={styles.newScriptBrandingText}>Branding</p>
					<div className="flex-row">
						<button className={styles.newScriptIntro}>
							<img
								className={styles.newScriptActiveIcon}
								src="/active.svg"
								alt="active"
							/>
							<p className={styles.newScriptSideIntroText}>Intro</p>
						</button>
						<button className={styles.newScriptOutro}>
							<p className={styles.newScriptSideOutroText}>Outro</p>
							<img
								className={styles.newScriptInactiveIcon}
								src="/inactive.svg"
								alt="inactive"
							/>
						</button>
					</div>
					<button className={styles.newScriptWatermark}>
						<p className={styles.newScriptSideWatermarkText}>Watermark</p>
						<img
							className={styles.newScriptInactiveIcon}
							src="/inactive.svg"
							alt="inactive"
						/>
					</button>
				</div>
				
				<div className={styles.newScriptTitles}>
					<p className={styles.newScriptTitleLabel}>Titles</p>
					<button className={styles.newScriptLowerThirdBtn}>
						<img
							className={styles.newScriptActiveIcon}
							src="/active.svg"
							alt="active"
						/>
						<p className={styles.newScriptLowerThird}>Lower Third</p>
					</button>
					<input className={styles.newScriptNameInput} placeholder="Name" />
					<input className={styles.newScriptAgeInput} placeholder="Role" />
				</div>
				<div className={styles.newScriptTheme}>
					<p className={styles.newScriptThemeText}>Theme</p>
					<button onClick={themeOpenModal} className={styles.newScriptThemeBTN}>
						Default
					</button>
				</div>
				<div className={styles.newScriptLandingPage}>
					<p className={styles.newScriptLandingPageText}>Landing Page</p>
					<button className={styles.newScriptLandingPageBTN}>
						<img
							className={styles.newScriptActiveIcon}
							src="/active.svg"
							alt="active"
						/>
						<p className={styles.newScriptLandingYes}>Yes</p>
					</button>
				</div>
				<div className={styles.newScriptPreview}>
					<p className={styles.newScriptPreviewText}>Preview</p>
					<img
						onClick={vpmOpenModal}
						className={styles.newScriptPreviewVideo}
						src="scriptVideoPreview.svg"
						alt="newScriptPreviewVideo"
					/>
				</div>
			</div> */}
		</div>
	);
};
export default NewSummaryMain;
