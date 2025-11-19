import styles from "./ToggleButton.module.css";

type ToggleButtonProps = {
  value: boolean;
  onChange: (newValue: boolean) => void;
};

function ToggleButton({ value, onChange }: ToggleButtonProps) {
  return (
    <label className={styles.toggleSwitch}>
      <input
        type="checkbox"
        checked={value}
        onChange={() => onChange(!value)}
        className={styles.input}
      />

      <span className={styles.slider}></span>
    </label>
  );
}

export default ToggleButton;
