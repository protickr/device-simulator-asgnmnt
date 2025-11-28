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
    <div ref={setNodeRef} className={styles["device-drop-zone"]}>
      {children}
    </div>
  );
}

export default DeviceDropZone;
