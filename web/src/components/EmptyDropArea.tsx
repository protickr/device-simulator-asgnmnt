import type React from "react";
import styles from "./EmptyDropArea.module.css";

function EmptyDropArea({ children }: { children?: React.ReactNode }) {
  return <div className={styles["empty-drop-area"]}>{children}</div>;
}

export default EmptyDropArea;
