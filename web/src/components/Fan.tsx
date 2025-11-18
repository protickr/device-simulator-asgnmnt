import styles from "./Fan.module.css";

function Fan({ power = true, speed = 100 }) {
  // take in props to control fan's on/off state and speed
  console.log("🚀 ~ Fan ~  power = true, speed = 100:", power, speed);

  return (
    <div className={`${styles["fan-container"]}`}>
      <div className={`${styles["blade"]} ${styles["blade-1"]}`}></div>
      <div className={`${styles["blade"]} ${styles["blade-2"]}`}></div>
      <div className={`${styles["blade"]} ${styles["blade-3"]}`}></div>
      <div className={`${styles["blade"]} ${styles["blade-4"]}`}></div>
      <div className={styles.motor}></div>
    </div>
  );
}

export default Fan;
