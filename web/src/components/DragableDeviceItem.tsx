import { useDraggable } from "@dnd-kit/core";
import React, { useId } from "react";

type DraggableDeviceItemProps = {
  type: string;
  onClick?: (event: React.MouseEvent<HTMLLIElement>) => void;
  children: React.ReactNode;
};

function DraggableDeviceItem({
  type,
  onClick,
  children,
}: DraggableDeviceItemProps) {
  const id = useId();

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `${type}-${id}`,
  });

  return (
    <li
      className="list-item"
      onClick={onClick}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      {children}
    </li>
  );
}

export default DraggableDeviceItem;
