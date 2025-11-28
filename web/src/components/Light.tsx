import { useMemo, type CSSProperties } from "react";
import type { PresetDetails } from "../schema";

import styles from "./Light.module.css";
import LightControl from "./LightControl";
export type LightControlProps = {
  isOn: boolean;
  setIsOn: (newValue: boolean) => void;
  speed: number;
  setSpeed: (newValue: number) => void;
  allowedSettings: PresetDetails["device"]["allowedSettings"];
};

interface LightProps {
  isOn: boolean;
  brightness: number; // 0 - 100
  color: string; // HEX values
  setIsOn: (newValue: boolean) => void;
  setColor: (newValue: string) => void;
  setBrightness: (newValue: number) => void;
  allowedSettings: LightControlProps["allowedSettings"];
}

function Light({
  isOn,
  color,
  brightness,
  setColor,
  setIsOn,
  setBrightness,
  allowedSettings,
}: LightProps) {
  // only executes when any of these variable changes
  const dynamicStyles = useMemo(() => {
    const rgbValue = normalizeColorToRGB(color);
    const opacity = isOn ? brightness / 100 : 0;

    return {
      "--bulb-rgb": rgbValue,
      "--bulb-brightness": opacity,
    } as CSSProperties;
  }, [color, brightness, isOn]);

  return (
    <>
      <div className={styles["device-area"]}>
        <div
          className={`${styles["light-container"]} ${
            isOn ? styles["power-on"] : styles["power-off"]
          }`}
          style={dynamicStyles} // color and opacity
        >
          <div className={styles["light-stump"]}>
            <div className={styles["light-stump-tip"]}></div>
            <div className={styles["light-stump-mid"]}>
              <div className={styles["light-stump-mid-bar"]}></div>
              <div className={styles["light-stump-mid-bar"]}></div>
              <div className={styles["light-stump-mid-bar"]}></div>
              <div className={styles["light-stump-mid-bar"]}></div>
            </div>
          </div>
          <div
            className={`${styles["light-bulb"]} ${
              isOn ? styles["power-on"] : styles["power-off"]
            }`}
          >
            <div className={`${styles["inner-bar"]}`}></div>
            <div className={`${styles["inner-square"]}`}></div>
          </div>
        </div>
      </div>

      <div className={styles["controls-area"]}>
        <LightControl
          isOn={isOn}
          setIsOn={setIsOn}
          brightness={brightness}
          setBrightness={setBrightness}
          color={color}
          setColor={setColor}
          allowedSettings={allowedSettings}
        />
      </div>
    </>
  );
}

function normalizeColorToRGB(colorString: string = "#FFEECC") {
  if (colorString.startsWith("#")) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const hex = colorString.replace(shorthandRegex, function (m, r, g, b) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return r + r + g + g + b + b;
    });

    const res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return (
      res &&
      `${parseInt(res[1], 16)}, ${parseInt(res[2], 16)}, ${parseInt(
        res[3],
        16
      )}`
    );
  }

  if (colorString.includes(",")) {
    // already rgb, return
    return colorString;
  }
}

export default Light;
