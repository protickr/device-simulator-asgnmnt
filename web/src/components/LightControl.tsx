import styles from "./LightControl.module.css";
import ToggleButton from "./ToggleButton";
import type { PresetDetails } from "../schema";

export type LightControlProps = {
  isOn: boolean;
  setIsOn: (newValue: boolean) => void;
  brightness: number;
  setBrightness: (newValue: number) => void;
  color: string;
  setColor: (newValue: string) => void;
  allowedSettings: PresetDetails["device"]["allowedSettings"];
};

function LightControl({
  isOn,
  setIsOn,
  brightness,
  setBrightness,
  color,
  setColor,
  allowedSettings,
}: LightControlProps) {
  const { min: minBrightness = 0, max: maxBrightness = 100 } =
    allowedSettings.intensity;

  return (
    <div className={styles.lightControl}>
      <div className={styles.controlRow}>
        <span className={styles.label}>Power</span>
        <ToggleButton value={isOn} onChange={setIsOn} />
      </div>
      <hr className={styles.divider} />

      <div className={isOn ? "" : "inActive"}>
        <span className={styles.label}>Color temperature</span>
        <div className={`${styles.colorList}`}>
          {allowedSettings.color?.options.map((colorItem) => (
            <div
              key={colorItem}
              onClick={() => setColor(colorItem)}
              className={`${colorItem === color ? "selected" : ""} ${
                styles.colorItem
              }`}
              style={{ backgroundColor: colorItem }}
            ></div>
          ))}
        </div>
      </div>
      <hr className={styles.divider} />

      <div className={`${styles.brightness} ${isOn ? "" : "inActive"}`}>
        <div className={styles.brightnessInfo}>
          <span className={styles.label}>Brightness</span>
          <div className={styles.brightnessValue}>
            <span className={styles.label}>{brightness}%</span>
          </div>
        </div>

        <input
          type="range"
          name="brightness"
          id="brightness"
          min={+minBrightness}
          max={+maxBrightness}
          step={1}
          className={styles.brightnessRange}
          value={brightness}
          onChange={(e) => setBrightness(Number(e.target.value))}
          disabled={!isOn}
        />
      </div>
    </div>
  );
}

export default LightControl;
