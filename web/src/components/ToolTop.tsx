import styles from "./ToolTip.module.css";

function Tooltip({ children = "Drag items from here" }) {
  return <div className={styles["drag-tooltip"]}>{children}</div>;
}

export default Tooltip;
