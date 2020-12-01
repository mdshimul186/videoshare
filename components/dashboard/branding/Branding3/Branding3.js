import styles from "./Branding3.module.css";
import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useSelector, useDispatch } from "react-redux";
import { SpinnerComponent } from "react-element-spinner";
import { ChromePicker } from "react-color";
import hexRgb from "hex-rgb"

const Branding3 = () => {
  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);

  const [isPassModal, setPassModal] = useState(true);

  const [brandingId, setBrandingId] = useState("")

  const [showOpeningLogoColourPicker, setShowOpeningLogoColourPicker,] = useState(false);
  const [openingLogoColourPicker, setOpeningLogoColourPicker] = useState({
    hex: "#4a257d",
    rgb: "rgb(74,37,125)"
  });

  const [showClosingLogoColourPicker, setShowClosingLogoColourPicker,] = useState(false);
  const [closingLogoColourPicker, setClosingLogoColourPicker] = useState({
    hex: "#ffc107",
    rgb: "rgb(255,193,7)"
  });


  const [showNameColourPicker, setShowNameColourPicker] = useState(false);
  const [nameColourPicker, setNameColourPicker] = useState({
    hex: "#ffc107",
    rgb: "rgb(255,193,7)"
  });

  const [showNameBackgroundColourPicker, setShowNameBackgroundColourPicker] = useState(false);
  const [nameBackgroundColourPicker, setNameBackgroundColourPicker] = useState({
    hex: "#ffc107",
    rgb: "rgb(255,193,7)"
  });

  const [showRoleColourPicker, setShowRoleColourPicker] = useState(false);
  const [roleColourPicker, setRoleColourPicker] = useState({
    hex: "#ffc107",
    rgb: "rgb(255,193,7)"
  });

  const [showRoleBackgroundColourPicker, setShowRoleBackgroundColourPicker] = useState(false);
  const [roleBackgroundColourPicker, setRoleBackgroundColourPicker] = useState({
    hex: "#ffc107",
    rgb: "rgb(255,193,7)"
  });

  const [selectedOpeningLogo, setSelectedOpeningLogo] = useState("")
  const [openingLogoUrl, setOpeningLogoUrl] = useState("")
  const [selectedClosingLogo, setSelectedClosingLogo] = useState("")
  const [closingLogoUrl, setClosingLogoUrl] = useState("")

  const [font, setFont] = useState("font1")


  useEffect(() => {
    if (auth && auth.userData && auth.userData.branding) {
      setBrandingId(auth.userData.branding.branding3)

    }
  }, [auth.userData])


  useEffect(() => {
    if (brandingId) {
      setLoading(true)
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/branding/getbrandinginfo/${brandingId}`)
        .then(res => {
          let { branding } = res.data
          console.log(branding);
          setOpeningLogoUrl(branding.firstLogoURL)
          setClosingLogoUrl(branding.secondLogoURL)

          setOpeningLogoColourPicker({
            ...openingLogoColourPicker,
            hex: branding.firstBackgroundHEX,
            rgb: branding.firstBackgroundRGB,
          });

          setClosingLogoColourPicker({
            ...closingLogoColourPicker,
            hex: branding.secondBackgroundHEX,
            rgb: branding.secondBackgroundRGB,
          });

          setNameColourPicker({
            ...nameColourPicker,
            hex: branding.textNameHEX,
            rgb: branding.textNameRGB,
          });

          setNameBackgroundColourPicker({
            ...nameBackgroundColourPicker,
            hex: branding.textNameBackgroundHEX,
            rgb: branding.textNameBackgroundRGB,
          });

          setRoleColourPicker({
            ...roleColourPicker,
            hex: branding.textRoleHEX,
            rgb: branding.textRoleRGB,
          });

          setRoleBackgroundColourPicker({
            ...roleBackgroundColourPicker,
            hex: branding.textRoleBackgroundHEX,
            rgb: branding.textRoleBackgroundRGB,
          });

          setFont(branding.fontName)
          setLoading(false)
        })
        .catch(err => {
          setLoading(false)
          alert("something went wrong")
        })
    }
  }, [brandingId])



  const handleSaveBranding = () => {
    setLoading(true)
    let formData = new FormData()
    formData.append("firstLogo", selectedOpeningLogo)
    formData.append("secondLogo", selectedClosingLogo)
    formData.append("firstBackgroundHEX", openingLogoColourPicker.hex)
    formData.append("firstBackgroundRGB", openingLogoColourPicker.rgb)

    formData.append("secondBackgroundHEX", closingLogoColourPicker.hex)
    formData.append("secondBackgroundRGB", closingLogoColourPicker.rgb)

    formData.append("textNameHEX", nameColourPicker.hex)
    formData.append("textNameRGB", nameColourPicker.rgb)

    formData.append("textNameBackgroundHEX", nameBackgroundColourPicker.hex)
    formData.append("textNameBackgroundRGB", nameBackgroundColourPicker.rgb)


    formData.append("textRoleHEX", roleColourPicker.hex)
    formData.append("textRoleRGB", roleColourPicker.rgb)

    formData.append("textRoleBackgroundHEX", roleBackgroundColourPicker.hex)
    formData.append("textRoleBackgroundRGB", roleBackgroundColourPicker.rgb)

    formData.append("fontName", font)
    formData.append("brandingName", "branding3")

    axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/branding/editbranding/${brandingId}`, formData)
      .then(branding => {
        setLoading(false)
        alert("saved successfully")
      })
      .catch(err => {
        err && err.response && alert(err.response.data.error)
      })


  }

  return (
    <div className={styles.brandingContainer}>
      <SpinnerComponent loading={isLoading} position="global" />

      <p className={styles.brandingText}>Branding 3</p>
      <div className={styles.content}>
        <div className={styles.row1}>
          {/* 1st brand box */}


          {/* --------------opening logo ---------------- */}

          <div className={styles.logoItemContainer}>
            <div className={styles.logoInfo}>
              <div className={styles.logoTitle}>OPENING LOGO</div>
              <input onChange={(e) => setSelectedOpeningLogo(e.target.files[0])} type="file" accept='image/*' id='openinglogo' hidden></input>
              <label htmlFor='openinglogo' className={styles.uploadButton}>UPLOAD</label>
            </div>
            <div
              style={{ backgroundColor: openingLogoColourPicker.hex }}
              className={styles.logoContainer}
            >
              <img className={styles.logo} src={selectedOpeningLogo ? URL.createObjectURL(selectedOpeningLogo) : openingLogoUrl}></img>
            </div>
            <div>
              <p className={styles.backgroundTitle}>Background Colour</p>
            </div>
            <div
              style={{ backgroundColor: openingLogoColourPicker.hex }}
              className={styles.changeColourContainer}
            >
              <p className={styles.hex}>
                {openingLogoColourPicker.hex.toUpperCase()}
              </p>
              <p className={styles.rgb}>
                {openingLogoColourPicker.rgb}
              </p>
              <button
                onClick={() => setShowOpeningLogoColourPicker(!showOpeningLogoColourPicker)}
                className={styles.plus}
              >
                +
              </button>
              {showOpeningLogoColourPicker && (
                <div
                  className={styles.colourPicker}
                  id="colorPicker"
                >
                  <span onClick={() => setShowOpeningLogoColourPicker(false)} className={styles.cross}>X</span>
                  <ChromePicker
                    color={openingLogoColourPicker.hex}
                    onChange={(e) => {

                      setOpeningLogoColourPicker({
                        ...openingLogoColourPicker,
                        hex: e.hex,
                        rgb: hexRgb(e.hex, { format: "css" }),
                      });
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* --------------ends opening logo ---------------- */}

          {/* 2nd brand box */}
          {/* --------------closing logo ---------------- */}

          <div className={styles.logoItemContainer}>
            <div className={styles.logoInfo}>
              <div className={styles.logoTitle}>CLOSING LOGO</div>
              <input onChange={(e) => setSelectedClosingLogo(e.target.files[0])} type="file" accept='image/*' id='closinglogo' hidden></input>
              <label htmlFor='closinglogo' className={styles.uploadButton}>UPLOAD</label>
            </div>
            <div
              style={{ backgroundColor: closingLogoColourPicker.hex }}
              className={styles.logoContainer}
            >
              <img className={styles.logo} src={selectedClosingLogo ? URL.createObjectURL(selectedClosingLogo) : closingLogoUrl}></img>
            </div>
            <div>
              <p className={styles.backgroundTitle}>Background Colour</p>
            </div>
            <div
              style={{ backgroundColor: closingLogoColourPicker.hex }}
              className={styles.changeColourContainer}
            >
              <p className={styles.hex}>
                {closingLogoColourPicker.hex.toUpperCase()}
              </p>
              <p className={styles.rgb}>
                {closingLogoColourPicker.rgb}
              </p>
              <button
                onClick={() =>
                  setShowClosingLogoColourPicker(!showClosingLogoColourPicker)
                }
                className={styles.plus}
              >
                +
              </button>
              {showClosingLogoColourPicker && (
                <div
                  className={styles.colourPicker}
                  id="colorPicker"
                >
                  <span onClick={() => setShowClosingLogoColourPicker(false)} className={styles.cross}>X</span>
                  <ChromePicker
                    color={closingLogoColourPicker.hex}
                    onChange={(e) => {
                      setClosingLogoColourPicker({
                        ...closingLogoColourPicker,
                        hex: e.hex,
                        rgb: hexRgb(e.hex, { format: "css" }),
                      });
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          {/* --------------ends closing logo ---------------- */}


          {/* 3rd brand box */}
          {/* --------------shoulder logo ---------------- */}

          <div className={styles.logoItemContainer}>
            <div className={styles.logoInfo}>
              <div className={styles.logoTitle}>SHOULDER LOGO</div>
              <button className={styles.uploadButton}>UPLOAD</button>
            </div>
            <div className={styles.logoContainer}>
              {/* <p className={styles.logo}>VEVAMEDIA</p> */}
            </div>
          </div>
          {/* --------------ends shoulder logo ---------------- */}
        </div>
      </div>
      <div className={styles.divider}></div>

      {/* next row */}


      <div className={styles.row2}>

        {/* --------------starts background colour and name colour ---------------- */}

        <div className={styles.logoItemContainer}>
          <div>
            <p className={styles.backgroundTitle}>NAME COLOUR</p>
          </div>
          <div
            style={{ backgroundColor: nameColourPicker.hex }}
            className={styles.changeColourContainer}
          >
            <p
              style={{
                fontWeight: "600",
                fontSize: "14px",
                fontFamily: "Mulish",
              }}
              className={styles.hex}
            >
              {nameColourPicker.hex}
            </p>
            <p
              style={{
                fontWeight: "600",
                fontSize: "14px",
                fontFamily: "Mulish",
              }}
              className={styles.rgb}
            >
              {nameColourPicker.rgb}
            </p>
            <button onClick={() => setShowNameColourPicker(!showNameColourPicker)} className={styles.plus}>+</button>


            {showNameColourPicker && (
              <div
                className={styles.colourPicker}
                id="colorPicker"
              >
                <span onClick={() => setShowNameColourPicker(false)} className={styles.cross}>X</span>
                <ChromePicker
                  color={nameColourPicker.hex}
                  onChange={(e) => {
                    setNameColourPicker({
                      ...nameColourPicker,
                      hex: e.hex,
                      rgb: hexRgb(e.hex, { format: "css" }),
                    });
                  }}
                />
              </div>
            )}


          </div>
          <div>
            <p className={styles.backgroundTitle}>NAME BACKGROUND COLOUR</p>
          </div>
          <div style={{ backgroundColor: nameBackgroundColourPicker.hex }} className={styles.changeColourContainer}>
            <p className={styles.hex}>{nameBackgroundColourPicker.hex}</p>
            <p className={styles.rgb}>{nameBackgroundColourPicker.rgb}</p>
            <button onClick={() => setShowNameBackgroundColourPicker(true)} className={styles.plus}>+</button>
            {showNameBackgroundColourPicker && (
              <div
                className={styles.colourPicker}
                id="colorPicker"
              >
                <span onClick={() => setShowNameBackgroundColourPicker(false)} className={styles.cross}>X</span>
                <ChromePicker
                  color={nameBackgroundColourPicker.hex}
                  onChange={(e) => {
                    setNameBackgroundColourPicker({
                      ...nameBackgroundColourPicker,
                      hex: e.hex,
                      rgb: hexRgb(e.hex, { format: "css" }),
                    });
                  }}
                />
              </div>
            )}
          </div>
        </div>


        {/* --------------ends starts background colour and name colour ---------------- */}


        {/* --------------starts role colour and rolebackground colour ---------------- */}
        <div className={styles.logoItemContainer}>
          <div>
            <p className={styles.backgroundTitle}>ROLE COLOUR</p>
          </div>
          <div style={{ background: roleColourPicker.hex }} className={styles.changeColourContainer}>
            <p className={styles.hex}>{roleColourPicker.hex}</p>
            <p className={styles.rgb}>{roleColourPicker.rgb}</p>
            <button onClick={() => setShowRoleColourPicker(true)} className={styles.plus}>+</button>
            {showRoleColourPicker && (
              <div
                className={styles.colourPicker}
                id="colorPicker"
              >
                <span onClick={() => setShowRoleColourPicker(false)} className={styles.cross}>X</span>
                <ChromePicker
                  color={roleColourPicker.hex}
                  onChange={(e) => {
                    setRoleColourPicker({
                      ...roleColourPicker,
                      hex: e.hex,
                      rgb: hexRgb(e.hex, { format: "css" }),
                    });
                  }}
                />
              </div>
            )}
          </div>
          <div>
            <p className={styles.backgroundTitle}>ROLE BACKGROUND COLOUR</p>
          </div>
          <div style={{ background: roleBackgroundColourPicker.hex }} className={styles.changeColourContainer}>
            <p className={styles.hex}>{roleBackgroundColourPicker.hex}</p>
            <p className={styles.rgb}>{roleBackgroundColourPicker.rgb}</p>
            <button onClick={() => setShowRoleBackgroundColourPicker(true)} className={styles.plus}>+</button>
            {showRoleBackgroundColourPicker && (
              <div
                className={styles.colourPicker}
                id="colorPicker"
              >
                <span onClick={() => setShowRoleBackgroundColourPicker(false)} className={styles.cross}>X</span>
                <ChromePicker
                  color={roleBackgroundColourPicker.hex}
                  onChange={(e) => {
                    setRoleBackgroundColourPicker({
                      ...roleBackgroundColourPicker,
                      hex: e.hex,
                      rgb: hexRgb(e.hex, { format: "css" }),
                    });
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* --------------ends  role colour and rolebackground colour ---------------- */}

        <div className={styles.logoItemContainer}>
          <div>
            <p className={styles.backgroundTitle}>Font</p>
          </div>
          <div className={styles.inputContainer}>
            <select onChange={(e) => setFont(e.target.value)} value={font} className={styles.selectFont}>
              <option value="font1">Font 1</option>
              <option value="font2">Font 2</option>
            </select>
          </div>
          <div>
            <p className={styles.backgroundTitle}></p>
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.preview}>Preview</button>
            <button onClick={() => handleSaveBranding()} className={styles.save}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Branding3;
