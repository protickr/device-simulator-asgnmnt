import { useDroppable } from "@dnd-kit/core";
import styles from "./DeviceDropZone.module.css";

type DeviceDropZoneProps = {
  children: React.ReactNode;
};

function DeviceDropZone({ children }: DeviceDropZoneProps) {
  const { setNodeRef } = useDroppable({
    id: "drop-area",
  });

  return (
    <div className={styles["drop-area"]} id="drop-area" ref={setNodeRef}>
      {children}
    </div>
  );
}

export default DeviceDropZone;
