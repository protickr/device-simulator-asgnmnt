import { useDraggable } from "@dnd-kit/core";
import React, { useId } from "react";

type DraggableDeviceItemProps = {
  data: object;
  itemCls: string;
  children: React.ReactNode;
};

function DraggableDeviceItem({
  children,
  itemCls,
  data,
}: DraggableDeviceItemProps) {
  const id = useId();
  const { attributes, listeners, setNodeRef } = useDraggable({ id, data });

  return (
    <li
      className={itemCls ?? ""}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      {children}
    </li>
  );
}

export default DraggableDeviceItem;
