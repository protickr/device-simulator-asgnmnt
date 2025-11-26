import styles from "./FanControl.module.css";
import ToggleButton from "./ToggleButton";
import type { PresetDetails } from "../schema";

export type FanControlProps = {
  isOn: boolean;
  setIsOn: (newValue: boolean) => void;
  speed: number;
  setSpeed: (newValue: number) => void;
  allowedSettings: PresetDetails["device"]["allowedSettings"];
};

function FanControl({
  isOn,
  setIsOn,
  speed,
  setSpeed,
  allowedSettings,
}: FanControlProps) {
  const { min: minSpeed = 0, max: maxSpeed = 100 } = allowedSettings.intensity;

  return (
    <div className={styles.fanControl}>
      <div className={styles.power}>
        <div>
          <span className={styles.label}>Power</span>
        </div>
        <ToggleButton value={isOn} onChange={setIsOn} />
      </div>

      <div className={styles.speed}>
        <div className={styles.speedInfo}>
          <span className={styles.label}>Speed</span>
          <div className={styles.speedValue}>
            <span className={styles.label}>{speed}%</span>
          </div>
        </div>

        <input
          type="range"
          name="intensity"
          id="intensity"
          min={+minSpeed}
          max={+maxSpeed}
          step={1}
          className={styles.speedRange}
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
        />
      </div>
    </div>
  );
}

export default FanControl;
