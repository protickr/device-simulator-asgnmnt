import styles from "./FanControl.module.css";
import ToggleButton from "./ToggleButton";

type FanControlProps = {
  isOn: boolean;
  setIsOn: (newValue: boolean) => void;
  speed: number;
  setSpeed: (newValue: number) => void;
};

function FanControl({ isOn, setIsOn, speed, setSpeed }: FanControlProps) {
  return (
    <div className={styles.fanControl}>
      <div className={styles.power}>
        <div>
          <span className={styles.label}>Power</span>
        </div>
        {/* <button> power</button> */}
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
          name="speed"
          id="speed"
          min={0}
          max={100}
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
