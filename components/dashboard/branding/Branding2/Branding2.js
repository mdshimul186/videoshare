import styles from "./Branding2.module.css";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SpinnerComponent } from "react-element-spinner";
import { ChromePicker } from "react-color";

const Branding2 = () => {
  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();

  const [isPassModal, setPassModal] = useState(true);
  const [
    showOpeningLogoColourPicker,
    setShowOpeningLogoColourPicker,
  ] = useState(false);
  const [openingLogoColourPicker, setOpeningLogoColourPicker] = useState({
    hex: "#4a257d",
    rgb: { r: "74", g: "37", b: "125", a: "1" },
  });

  const [
    showClosingLogoColourPicker,
    setShowClosingLogoColourPicker,
  ] = useState(false);
  const [closingLogoColourPicker, setClosingLogoColourPicker] = useState({
    hex: "#ffc107",
    rgb: { r: "255", g: "193", b: "7", a: "1" },
  });

  return (
    <div className={styles.brandingContainer}>
      <SpinnerComponent loading={false} position="global" />

      <p className={styles.brandingText}>Branding 2</p>
      <div className={styles.content}>
        <div className={styles.row1}>
          {/* 1st brand box */}
          <div className={styles.logoItemContainer}>
            <div className={styles.logoInfo}>
              <div className={styles.logoTitle}>OPENING LOGO</div>
              <button className={styles.uploadButton}>UPLOAD</button>
            </div>
            <div
              style={{ backgroundColor: openingLogoColourPicker.hex }}
              className={styles.logoContainer}
            >
              <p className={styles.logo}>VEVAMEDIA</p>
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
                {openingLogoColourPicker.rgb &&
                  `RGBA(${openingLogoColourPicker.rgb.r},${openingLogoColourPicker.rgb.g},${openingLogoColourPicker.rgb.b})`}
              </p>
              <button
                onClick={() =>
                  setShowOpeningLogoColourPicker(!showOpeningLogoColourPicker)
                }
                className={styles.plus}
              >
                +
              </button>
              {showOpeningLogoColourPicker && (
                <div
                  onBlur={() => setShowOpeningLogoColourPicker(false)}
                  className={styles.colourPicker}
                  id="colorPicker"
                >
                  <ChromePicker
                    color={openingLogoColourPicker.hex}
                    onChange={(e) => {
                      setOpeningLogoColourPicker({
                        ...openingLogoColourPicker,
                        hex: e.hex,
                        rgb: e.rgb,
                      });
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* 2nd brand box */}
          <div className={styles.logoItemContainer}>
            <div className={styles.logoInfo}>
              <div className={styles.logoTitle}>CLOSING LOGO</div>
              <button className={styles.uploadButton}>UPLOAD</button>
            </div>
            <div
              style={{ backgroundColor: closingLogoColourPicker.hex }}
              className={styles.logoContainer}
            >
              <p className={styles.logo}>VEVAMEDIA</p>
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
                {closingLogoColourPicker.rgb &&
                  `RGBA(${closingLogoColourPicker.rgb.r},${closingLogoColourPicker.rgb.g},${closingLogoColourPicker.rgb.b})`}
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
                  onBlur={() => setShowClosingLogoColourPicker(false)}
                  className={styles.colourPicker}
                  id="colorPicker"
                >
                  <ChromePicker
                    color={closingLogoColourPicker.hex}
                    onChange={(e) => {
                      setClosingLogoColourPicker({
                        ...closingLogoColourPicker,
                        hex: e.hex,
                        rgb: e.rgb,
                      });
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          {/* 3rd brand box */}
          <div className={styles.logoItemContainer}>
            <div className={styles.logoInfo}>
              <div className={styles.logoTitle}>SHOULDER LOGO</div>
              <button className={styles.uploadButton}>UPLOAD</button>
            </div>
            <div className={styles.logoContainer}>
              <p className={styles.logo}>VEVAMEDIA</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.row2}>
        <div className={styles.logoItemContainer}>
          <div>
            <p className={styles.backgroundTitle}>NAME COLOUR</p>
          </div>
          <div
            style={{ backgroundColor: "white" }}
            className={styles.changeColourContainer}
          >
            <p
              style={{
                color: "#4B506D",
                fontWeight: "600",
                fontSize: "14px",
                fontFamily: "Mulish",
              }}
              className={styles.hex}
            >
              #1EYUFYT
            </p>
            <p
              style={{
                color: "#4B506D",
                fontWeight: "600",
                fontSize: "14px",
                fontFamily: "Mulish",
              }}
              className={styles.rgb}
            >
              RGB(1,123,4)
            </p>
            <button className={styles.plus}>+</button>
          </div>
          <div>
            <p className={styles.backgroundTitle}>NAME BACKGROUND COLOUR</p>
          </div>
          <div className={styles.changeColourContainer}>
            <p className={styles.hex}>#1EYUFYT</p>
            <p className={styles.rgb}>RGB(1,123,4)</p>
            <button className={styles.plus}>+</button>
          </div>
        </div>
        <div className={styles.logoItemContainer}>
          <div>
            <p className={styles.backgroundTitle}>ROLE COLOUR</p>
          </div>
          <div className={styles.changeColourContainer}>
            <p className={styles.hex}>#1EYUFYT</p>
            <p className={styles.rgb}>RGB(1,123,4)</p>
            <button className={styles.plus}>+</button>
          </div>
          <div>
            <p className={styles.backgroundTitle}>ROLE BACKGROUND COLOUR</p>
          </div>
          <div className={styles.changeColourContainer}>
            <p className={styles.hex}>#1EYUFYT</p>
            <p className={styles.rgb}>RGB(1,123,4)</p>
            <button className={styles.plus}>+</button>
          </div>
        </div>
        <div className={styles.logoItemContainer}>
          <div>
            <p className={styles.backgroundTitle}>Font</p>
          </div>
          <div className={styles.inputContainer}>
            <select className={styles.selectFont} value="font1">
              <option className={styles.option} value="font1">
                Font 1
              </option>
              <option value="font2">Font 2</option>
            </select>
          </div>
          <div>
            <p className={styles.backgroundTitle}></p>
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.preview}>Preview</button>
            <button className={styles.save}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Branding2;
