import FanAnimation from "./FanAnimation";
import FanControl, { type FanControlProps } from "./FanControl";
import styles from "./Fan.module.css";

interface FanProps {
  isOn: boolean;
  speed: number;
  allowedSettings: FanControlProps["allowedSettings"];
  setIsOn: (newValue: boolean) => void;
  setSpeed: (newValue: number) => void;
}

function Fan({ isOn, speed, allowedSettings, setIsOn, setSpeed }: FanProps) {
  return (
    <>
      <div className={styles["device-area"]}>
        <FanAnimation power={isOn} speed={speed}></FanAnimation>
      </div>
      <div className={styles["controls-area"]}>
        <FanControl
          isOn={isOn}
          setIsOn={setIsOn}
          speed={speed}
          setSpeed={setSpeed}
          allowedSettings={allowedSettings}
        ></FanControl>
      </div>
    </>
  );
}

export default Fan;
