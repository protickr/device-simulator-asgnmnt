import { useDraggable } from "@dnd-kit/core";
import React, { useId } from "react";

type DraggableDeviceItemProps = {
  data: object;
  itemCls: string;
  children: React.ReactNode;
  isActive: boolean;
};

function DraggableDeviceItem({
  children,
  itemCls,
  data,
  isActive,
}: DraggableDeviceItemProps) {
  console.log("🚀 ~ DraggableDeviceItem ~ isActive:", isActive);

  const id = useId();
  const { attributes, listeners, setNodeRef } = useDraggable({ id, data });

  return (
    <li
      className={`${itemCls ?? ""} ${isActive ? "active" : ""}`}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      {children}
    </li>
  );
}

export default DraggableDeviceItem;
