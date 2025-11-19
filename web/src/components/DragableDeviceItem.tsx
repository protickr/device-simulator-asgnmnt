import { useDraggable } from "@dnd-kit/core";
import React, { useId } from "react";

type DraggableDeviceItemProps = {
  type: string;
  children: React.ReactNode;
  itemCls?: string;
  data?: object;
};

function DraggableDeviceItem({
  type,
  children,
  itemCls,
  data,
}: DraggableDeviceItemProps) {
  const id = useId();

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `${type}-${id}`,
    data: data,
  });

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
